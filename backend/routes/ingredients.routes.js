// routes/ingredients.routes.js
import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

router.get("/recipes/by-ingredients", async (req, res) => {
  const raw = (req.query.ingredients || "").trim();
  const list = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (!list.length) return res.json({ recipes: [] });

  try {
    const where = list.map(() => "JSON_CONTAINS(ingredients, ?)").join(" OR ");
    const params = list.map((ing) => JSON.stringify(ing));
    const [rows] = await pool.query(
      `SELECT id, title, tag, time_label, img, href, rating
       FROM recipes
       WHERE ingredients IS NOT NULL
         AND (${where})
       ORDER BY tag, CAST(id AS UNSIGNED), id`,
      params
    );

    res.json({ recipes: rows });
  } catch (err) {
    console.error("GET /api/recipes/by-ingredients error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.get("/ingredients", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT ingredients
       FROM recipes
       WHERE ingredients IS NOT NULL`
    );

    const set = new Set();

    for (const r of rows) {
      let arr = r.ingredients;

      if (typeof arr === "string") {
        try { arr = JSON.parse(arr); } catch { arr = null; }
      }

      if (Array.isArray(arr)) {
        arr.forEach((x) => {
          if (typeof x === "string" && x.trim()) set.add(x.trim().toLowerCase());
        });
      }
    }

    res.json({ ingredients: Array.from(set).sort() });
  } catch (err) {
    console.error("GET /api/ingredients error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;