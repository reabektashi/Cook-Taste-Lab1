// routes/health.routes.js
import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

router.get("/health", async (_req, res) => {
  const [rows] = await pool.query("SELECT NOW() AS now");
  res.json({ ok: true, now: rows[0].now });
});

export default router;