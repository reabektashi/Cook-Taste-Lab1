// routes/favorites.routes.js
import { Router } from "express";
import pool from "../config/db.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/favorites", auth, async (req, res) => {
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

router.post("/favorites", auth, async (req, res) => {
  const { recipeId, recipe } = req.body || {};
  if (!recipeId) return res.status(400).json({ error: "recipeId_required" });

  try {
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

router.delete("/favorites/:id", auth, async (req, res) => {
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

export default router;