import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// === setup paths ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === initialize app ===
const app = express();
const PORT = process.env.PORT || 4000;

// === middlewares (MUST be before routes) ===
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // ✅ very important
app.use(morgan("dev"));

// === prepare data storage (simple JSON file) ===
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "subscribers.json");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]");

// === email validation ===
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// === routes ===
app.post("/api/subscribe", (req, res) => {
  console.log("Incoming body:", req.body); // debug

  const { email } = req.body;
  if (!emailRe.test(email)) {
    console.log("❌ Invalid email received:", email);
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }

  // Save locally (for testing)
  const list = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  if (!list.includes(email)) list.push(email);
  fs.writeFileSync(dataFile, JSON.stringify(list, null, 2));

  console.log("✅ Subscribed:", email);
  return res.json({ ok: true });
});

// simple test route
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// === start server ===
app.listen(PORT)
  .on("listening", () => console.log(`✅ API running at http://localhost:${PORT}`))
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use. Try:`);
      console.error(`   npx kill-port ${PORT}`);
      process.exit(1);
    } else {
      console.error("❌ Server error:", err);
    }
  });
