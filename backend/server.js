// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------- Mailer (Gmail App Password or other SMTP) ----------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,                               // e.g. smtp.gmail.com
  port: Number(process.env.SMTP_PORT || 587),               // 587 for STARTTLS
  secure: String(process.env.SMTP_SECURE || "false") === "true", // false for 587
  auth: {
    user: process.env.SMTP_USER,                            // your Gmail
    pass: process.env.SMTP_PASS,                            // 16-char app password
  },
});

// Optional: check SMTP on boot (logs warning if misconfigured)
transporter
  .verify()
  .then(() => console.log("📫 SMTP ready"))
  .catch((err) => console.warn("⚠️ SMTP not ready:", err?.message));

// -------------------------- Routes ---------------------------

// Create/Upsert subscriber + send emails
app.post("/api/subscribe", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!emailRe.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    // Upsert so it’s idempotent (no duplicates)
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // Respond immediately so the UI is snappy
    res.json({ ok: true });

    // ---- Send emails in the background (don’t block response) ----
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

    const tasks = [];

    // 1) Notify site owner (you)
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

    // 2) Welcome email to subscriber
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
      results.forEach((r) => {
        if (r.status === "rejected") console.error("Email send failed:", r.reason);
      });
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    if (!res.headersSent) res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ------------------------ Start server -----------------------
const server = app.listen(PORT, () =>
  console.log(`✅ API running at http://localhost:${PORT}`)
);

// Helpful port-in-use message
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} already in use. Try: npx kill-port ${PORT}`);
    process.exit(1);
  } else {
    console.error(err);
  }
});
