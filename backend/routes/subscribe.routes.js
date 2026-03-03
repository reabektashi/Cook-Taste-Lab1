// routes/subscribe.routes.js
import { Router } from "express";
import pool from "../config/db.js";
import transporter from "../config/smtp.js";
import { emailRe } from "../utils/tokens.js";

const router = Router();

router.post("/subscribe", async (req, res) => {
  const email = (req.body?.email || "").trim().toLowerCase();
  if (!emailRe.test(email)) return res.status(400).json({ ok: false, error: "Invalid email" });

  try {
    await pool.query("INSERT IGNORE INTO subscribers (email) VALUES (?)", [email]);
    res.json({ ok: true });

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

export default router;