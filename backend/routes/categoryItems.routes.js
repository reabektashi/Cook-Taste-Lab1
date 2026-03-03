// routes/categoryItems.routes.js
import { Router } from "express";
import pool from "../config/db.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/category-items/counts", auth, requireRole("admin"), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT category, COUNT(*) AS total
      FROM category_items
      GROUP BY category
    `);

    const counts = {};
    rows.forEach((r) => (counts[r.category] = Number(r.total) || 0));

    res.json({ counts });
  } catch (err) {
    console.error("GET /api/category-items/counts error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.get("/category-items", async (req, res) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({ error: "category_required" });
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT
        ci.id,
        ci.category,
        ci.recipe_id,
        ci.tag,
        ci.title,
        ci.time_label,
        ci.img_url,
        ci.href,
        COUNT(DISTINCT f.user_id) AS favorites
      FROM category_items ci
      LEFT JOIN favorites f ON f.recipe_id = ci.recipe_id
      WHERE ci.category = ?
      GROUP BY
        ci.id, ci.category, ci.recipe_id, ci.tag, ci.title, ci.time_label, ci.img_url, ci.href
      ORDER BY ci.id
      `,
      [category]
    );

    res.json({ items: rows });
  } catch (err) {
    console.error("GET /api/category-items error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.post("/category-items", auth, requireRole("admin"), async (req, res) => {
  const { category, recipe_id, tag, title, time_label, img_url, href } = req.body || {};

  if (!category || !title) {
    return res.status(400).json({ error: "category_and_title_required" });
  }

  try {
    const [result] = await pool.query(
      `
      INSERT INTO category_items
        (category, recipe_id, tag, title, time_label, img_url, href)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        category,
        recipe_id || null,
        tag || null,
        title,
        time_label || null,
        img_url || null,
        href || null,
      ]
    );

    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("POST /api/category-items error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.put("/category-items/:id", auth, requireRole("admin"), async (req, res) => {
  const { id } = req.params;
  const { category, recipe_id, tag, title, time_label, img_url, href } = req.body || {};

  if (!category || !title) {
    return res.status(400).json({ error: "category_and_title_required" });
  }

  try {
    const [result] = await pool.query(
      `
      UPDATE category_items
      SET
        category = ?,
        recipe_id = ?,
        tag = ?,
        title = ?,
        time_label = ?,
        img_url = ?,
        href = ?
      WHERE id = ?
      `,
      [
        category,
        recipe_id || null,
        tag || null,
        title,
        time_label || null,
        img_url || null,
        href || null,
        id,
      ]
    );

    res.json({ ok: true, affected: result.affectedRows });
  } catch (err) {
    console.error("PUT /api/category-items/:id error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.delete("/category-items/:id", auth, requireRole("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM category_items WHERE id = ?", [id]);
    res.json({ ok: true, affected: result.affectedRows });
  } catch (err) {
    console.error("DELETE /api/category-items/:id error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;