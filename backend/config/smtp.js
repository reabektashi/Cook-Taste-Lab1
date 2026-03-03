// config/smtp.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
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

export default transporter;