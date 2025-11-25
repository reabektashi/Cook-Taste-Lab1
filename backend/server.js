// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";   // 👈 NEW
import crypto from "crypto";  

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5400;

// ---------- Middleware ---------


app.use(
  cors({
    origin: true,          
    credentials: true,     
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ---------- MySQL Pool ----------
/**
 * You can use either:
 * - DATABASE_URL (mysql://user:pass@host:port/dbname)
 * - or individual MYSQL_* vars.
 */
// ---------- MySQL Pool ----------
let pool;

if (process.env.DATABASE_URL) {
  // përdor connection string-un direkt
  pool = await mysql.createPool(process.env.DATABASE_URL);
} else {
  // fallback në variablat individuale
  pool = await mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  });
}

// ---------- Helpers ----------
// ---------- Helpers ----------
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ACCESS_TOKEN_EXP = "15m";    // short-lived access token
const REFRESH_TOKEN_DAYS = 7;      // refresh token lifetime in days

// create access token (JWT)
function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });
}

// middleware to protect routes with access token
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

// create random refresh token string
function createRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

// save hashed refresh token into DB
async function saveRefreshToken(userId, refreshToken) {
  const hash = await bcrypt.hash(refreshToken, 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_DAYS);

  await pool.query(
    "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
    [userId, hash, expiresAt]
  );
}

// delete all refresh tokens for a user (logout or rotation)
async function deleteUserRefreshTokens(userId) {
  await pool.query("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
}

// check if the provided refresh token is valid for that user
async function findValidRefreshToken(userId, refreshToken) {
  const [rows] = await pool.query(
    "SELECT * FROM refresh_tokens WHERE user_id = ? AND expires_at > NOW()",
    [userId]
  );

  for (const row of rows) {
    const ok = await bcrypt.compare(refreshToken, row.token_hash);
    if (ok) return row;
  }
  return null;
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

    // 1) short-lived access token
    const accessToken = signAccessToken(user);

    // 2) long-lived refresh token (cookie)
    const refreshToken = createRefreshToken();
    await deleteUserRefreshTokens(user.id);       // remove old ones (just in case)
    await saveRefreshToken(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set to true when you deploy with HTTPS
      maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
    });

    // keep response shape similar: token + user
    res.json({ token: accessToken, user });
  } catch (err) {
    console.error("register error:", err);
    res.status(400).json({ error: "email_exists" });
  }
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const u = rows[0];
    if (!u) return res.status(401).json({ error: "invalid_credentials" });

    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ error: "invalid_credentials" });

    const userPayload = { id: u.id, email: u.email, user_role: u.user_role };

    // 1) short-lived access token
    const accessToken = signAccessToken(userPayload);

    // 2) refresh token in DB + cookie
    const refreshToken = createRefreshToken();
    await deleteUserRefreshTokens(u.id);
    await saveRefreshToken(u.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
    });

    res.json({
      token: accessToken,
      user: { id: u.id, email: u.email, user_role: u.user_role },
    });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ error: "server_error" });
  }
});
// Issue new access token using refresh token cookie
app.post("/api/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const { userId } = req.body || {};

  if (!refreshToken) return res.status(401).json({ error: "no_refresh_token" });
  if (!userId) return res.status(400).json({ error: "missing_userId" });

  try {
    const record = await findValidRefreshToken(userId, refreshToken);
    if (!record) return res.status(401).json({ error: "invalid_refresh_token" });

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
    const u = rows[0];
    if (!u) return res.status(401).json({ error: "user_not_found" });

    const userPayload = { id: u.id, email: u.email, user_role: u.user_role };
    const newAccessToken = signAccessToken(userPayload);

    // rotate refresh token
    const newRefreshToken = createRefreshToken();
    await deleteUserRefreshTokens(u.id);
    await saveRefreshToken(u.id, newRefreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
    });

    res.json({ token: newAccessToken });
  } catch (err) {
    console.error("POST /api/refresh error:", err);
    res.status(500).json({ error: "server_error" });
  }
});
// Logout: clear refresh tokens and cookie
app.post("/api/logout", async (req, res) => {
  const { userId } = req.body || {};

  try {
    if (userId) {
      await deleteUserRefreshTokens(userId);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("POST /api/logout error:", err);
    res.status(500).json({ error: "server_error" });
  }
});


// ===================== FAVORITES API ===================== //

// Get current user's favorite recipes
app.get("/api/favorites", auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT r.*
       FROM favorites f
       JOIN recipes r ON r.id = f.recipe_id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [req.user.id]
    );
    res.json({ favorites: rows });
  } catch (err) {
    console.error("GET /api/favorites error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

// Add a favorite for current user
app.post("/api/favorites", auth, async (req, res) => {
  const { recipeId, recipe } = req.body || {};
  if (!recipeId) return res.status(400).json({ error: "recipeId_required" });

  try {
    // Optional: upsert recipe in recipes table
    if (recipe) {
      const { title, tag, time, img, href, rating } = recipe;
      await pool.query(
        `INSERT INTO recipes (id, title, tag, time_label, img, href, rating)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           title=VALUES(title),
           tag=VALUES(tag),
           time_label=VALUES(time_label),
           img=VALUES(img),
           href=VALUES(href),
           rating=VALUES(rating)`,
        [recipeId, title, tag, time, img, href, rating]
      );
    }

    await pool.query(
      "INSERT IGNORE INTO favorites (user_id, recipe_id) VALUES (?, ?)",
      [req.user.id, recipeId]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("POST /api/favorites error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

// Remove a favorite
app.delete("/api/favorites/:id", auth, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?",
      [req.user.id, req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/favorites error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

app.get("/api/recipes/search", async (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  if (!q) return res.json({ recipes: [] });

  try {
    const [rows] = await pool.query(
      `SELECT * FROM recipes
       WHERE LOWER(title) LIKE CONCAT('%', ?, '%')
          OR LOWER(tag) LIKE CONCAT('%', ?, '%')
          OR LOWER(description) LIKE CONCAT('%', ?, '%')`,
      [q, q, q]
    );
    res.json({ recipes: rows });
  } catch (err) {
    console.error("GET /api/recipes/search error:", err);
    res.status(500).json({ error: "server_error" });
  }
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
//Breakfast-Categories Table
app.get("/api/category-items", async (req, res) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({ error: "category_required" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT id,
              category,
              card_id,
              tag,
              title,
              time_label,
              img_url,
              href,
              favorites
       FROM category_items
       WHERE category = ?
       ORDER BY id`,
      [category]
    );



    res.json({ items: rows });
  } catch (err) {
    console.error("GET /api/category-items error:", err);
    res.status(500).json({ error: "server_error" });
  }
});



// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});
