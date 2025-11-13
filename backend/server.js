// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174;

// ---------- Middleware ----------
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

// ---------- MySQL Pool ----------
/**
 * You can use either:
 * - DATABASE_URL (mysql://user:pass@host:port/dbname)
 * - or individual MYSQL_* vars.
 */
const pool = await mysql.createPool(
  process.env.DATABASE_URL
    ? { uri: process.env.DATABASE_URL, waitForConnections: true, connectionLimit: 10 }
    : {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
      }
);

// ---------- Helpers ----------
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function signJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "no_token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "invalid_token" });
  }
}

// ---------- SMTP (optional) ----------
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  transporter
    .verify()
    .then(() => console.log("📫 SMTP ready"))
    .catch((err) => console.warn("⚠️ SMTP not ready:", err?.message));
} else {
  console.warn("ℹ️ SMTP env not set; subscribe will only store email.");
}

// ---------- Health ----------
app.get("/api/health", async (_req, res) => {
  const [rows] = await pool.query("SELECT NOW() AS now");
  res.json({ ok: true, now: rows[0].now });
});

// ---------- Auth ----------
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "missing_fields" });

  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hash]
    );
    const user = { id: result.insertId, email, user_role: "user" };
    const token = signJwt(user);
    res.json({ token, user });
  } catch (err) {
    console.error("register error:", err);
    res.status(400).json({ error: "email_exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  const u = rows[0];
  if (!u) return res.status(401).json({ error: "invalid_credentials" });

  const ok = await bcrypt.compare(password, u.password_hash);
  if (!ok) return res.status(401).json({ error: "invalid_credentials" });

  const token = signJwt({ id: u.id, email: u.email, user_role: u.user_role });
  res.json({ token, user: { id: u.id, email: u.email, user_role: u.user_role } });
});

// ---------- Favorites (DB-backed) ----------
app.get("/api/favorites", auth, async (req, res) => {
  const [rows] = await pool.query(
    `SELECT r.*
       FROM favorites f
       JOIN recipes r ON r.id = f.recipe_id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC`,
    [req.user.id]
  );
  res.json({ favorites: rows });
});

app.post("/api/favorites", auth, async (req, res) => {
  const { recipeId, recipe } = req.body || {};
  if (!recipeId) return res.status(400).json({ error: "recipeId_required" });

  // Optional: upsert the recipe details so favorites page can render cards
  if (recipe) {
    const { id, title, tag, time, img, href, rating, description, ingredients } = recipe;
    await pool.query(
      `INSERT INTO recipes (id, title, tag, time_label, img, href, rating, description, ingredients)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, CAST(? AS JSON))
       ON DUPLICATE KEY UPDATE
         title=VALUES(title),
         tag=VALUES(tag),
         time_label=VALUES(time_label),
         img=VALUES(img),
         href=VALUES(href),
         rating=VALUES(rating),
         description=VALUES(description),
         ingredients=VALUES(ingredients)`,
      [
        id || recipeId,
        title || "",
        tag || null,
        time || null,
        img || null,
        href || null,
        rating ?? null,
        description || null,
        JSON.stringify(ingredients || []),
      ]
    );
  }

  await pool.query(
    "INSERT IGNORE INTO favorites (user_id, recipe_id) VALUES (?, ?)",
    [req.user.id, recipeId]
  );
  res.status(201).json({ ok: true });
});

app.delete("/api/favorites/:id", auth, async (req, res) => {
  await pool.query("DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?", [
    req.user.id,
    req.params.id,
  ]);
  res.json({ ok: true });
});

// ---------- Search ----------
app.get("/api/recipes/search", async (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const [rows] = await pool.query("SELECT * FROM recipes");
  const filtered = rows.filter((r) =>
    `${r.title} ${r.description || ""}`.toLowerCase().includes(q)
  );
  res.json({ recipes: filtered });
});

// ---------- Subscribe (DB insert + optional email) ----------
app.post("/api/subscribe", async (req, res) => {
  const email = (req.body?.email || "").trim().toLowerCase();
  if (!emailRe.test(email)) return res.status(400).json({ ok: false, error: "Invalid email" });

  try {
    await pool.query("INSERT IGNORE INTO subscribers (email) VALUES (?)", [email]);
    res.json({ ok: true }); // respond fast

    // send emails (non-blocking)
    if (transporter) {
      const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
      const tasks = [];

      if (process.env.OWNER_EMAIL) {
        tasks.push(
          transporter.sendMail({
            to: process.env.OWNER_EMAIL,
            from,
            subject: "New Newsletter Subscriber 🎉",
            text: `New subscriber: ${email}`,
            html: `<p>New subscriber: <strong>${email}</strong></p>`,
          })
        );
      }

      tasks.push(
        transporter.sendMail({
          to: email,
          from,
          subject: "Welcome to Cook&Taste",
          text:
            "Thanks for subscribing! You'll get weekly recipes and tips. If this wasn't you, just ignore this email.",
          html: `
            <div style="font-family:system-ui,Segoe UI,Arial;line-height:1.5;padding:12px">
              <h2 style="margin:0 0 8px;">Welcome!</h2>
              <p>Thanks for subscribing. You'll get weekly recipes and tips.</p>
              <p style="margin-top:16px;color:#666;font-size:12px">
                If this wasn't you, just ignore this email.
              </p>
            </div>
          `,
        })
      );

      Promise.allSettled(tasks).then((results) => {
        results.forEach((r) => r.status === "rejected" && console.error("Email failed:", r.reason));
      });
    }
  } catch (err) {
    console.error("Subscribe error:", err);
    if (!res.headersSent) res.status(500).json({ ok: false, error: "Server error" });
  }
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});
