// routes/recipes.routes.js
import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

router.get("/recipes/search", async (req, res) => {
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

router.get("/recipes", async (req, res) => {
  const tag = (req.query.tag || "").trim();
  try {
    if (!tag) {
      const [rows] = await pool.query("SELECT * FROM recipes ORDER BY created_at DESC");
      return res.json({ recipes: rows });
    }

    const [rows] = await pool.query(
      `SELECT * FROM recipes WHERE tag = ? ORDER BY id`,
      [tag]
    );
    res.json({ recipes: rows });
  } catch (err) {
    console.error("GET /api/recipes error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;