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
app.use(express.json()); // <-- important!

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ✅ Create reusable transporter for Gmail
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true", // false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 📨 Subscription endpoint
app.post("/api/subscribe", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    console.log("Incoming email:", email);

    // Validation
    if (!emailRe.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    // ✅ Save to DB (if not already exists)
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (!existing) {
      await prisma.subscriber.create({ data: { email } });
    }

    // ✅ Send email notification
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: "New Newsletter Subscriber 🎉",
      text: `New subscriber: ${email}`,
    });

    console.log("✅ Email sent successfully.");
    res.json({ ok: true, message: "Subscription successful" });
  } catch (err) {
    console.error("❌ Error during subscription:", err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`✅ API running at http://localhost:${PORT}`));
