import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Subscribe endpoint
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  console.log("Incoming email:", email);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }

  try {
    // Check if already exists
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return res.status(200).json({ ok: true, message: "Already subscribed" });
    }

    // Save new subscriber
    await prisma.subscriber.create({
      data: { email },
    });

    console.log("✅ Saved to database:", email);
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Error saving subscriber:", err);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`✅ API running at http://localhost:${PORT}`));
