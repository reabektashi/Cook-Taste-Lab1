// routes/admin.routes.js
import { Router } from "express";
import pool from "../config/db.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/admin/overview", auth, requireRole("admin"), async (req, res) => {
  try {
    const period = String(req.query.period || "7days");
    const days =
      period === "14days" ? 14 :
      period === "30days" ? 30 :
      period === "365days" ? 365 :
      7;

    const [[recipesTotal]] = await pool.query(`SELECT COUNT(*) AS total FROM recipes`);
    const [[categoriesTotal]] = await pool.query(`SELECT COUNT(DISTINCT category) AS total FROM category_items`);
    const [[drinksTotal]] = await pool.query(
      `SELECT COUNT(*) AS total FROM recipes WHERE href LIKE '/drinks/%'`
    );
    const [[usersTotal]] = await pool.query(`SELECT COUNT(*) AS total FROM users`);
    const [[subsTotal]] = await pool.query(`SELECT COUNT(*) AS total FROM subscribers`);

    const [recipesDaily] = await pool.query(
      `
      SELECT DATE(created_at) AS d, COUNT(*) AS total
      FROM recipes
      WHERE created_at >= NOW() - INTERVAL ? DAY
      GROUP BY DATE(created_at)
      ORDER BY d
      `,
      [days]
    );

    const [usersDaily] = await pool.query(
      `
      SELECT DATE(created_at) AS d, COUNT(*) AS total
      FROM users
      WHERE created_at >= NOW() - INTERVAL ? DAY
      GROUP BY DATE(created_at)
      ORDER BY d
      `,
      [days]
    );

    const [subsDaily] = await pool.query(
      `
      SELECT DATE(created_at) AS d, COUNT(*) AS total
      FROM subscribers
      WHERE created_at >= NOW() - INTERVAL ? DAY
      GROUP BY DATE(created_at)
      ORDER BY d
      `,
      [days]
    );

    res.json({
      totals: {
        recipes: Number(recipesTotal.total) || 0,
        categories: Number(categoriesTotal.total) || 0,
        drinks: Number(drinksTotal.total) || 0,
        users: Number(usersTotal.total) || 0,
        subscribers: Number(subsTotal.total) || 0,
      },
      daily: {
        recipes: recipesDaily,
        users: usersDaily,
        subscribers: subsDaily,
      },
      days,
    });
  } catch (err) {
    console.error("GET /api/admin/overview error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.get("/admin/reports", auth, requireRole("admin"), async (req, res) => {
  try {
    const days = Math.max(1, Math.min(365, Number(req.query.days || 7)));

    const [topRecipes] = await pool.query(
      `
      SELECT
        r.id,
        r.title,
        r.tag AS category,
        COALESCE(r.rating, 0) AS rating,
        COUNT(DISTINCT f.user_id) AS favorites
      FROM recipes r
      LEFT JOIN favorites f ON f.recipe_id = r.id
      GROUP BY r.id, r.title, r.tag, r.rating
      ORDER BY favorites DESC, rating DESC, r.id DESC
      LIMIT 10
      `
    );

    const [recipesDaily] = await pool.query(
      `
      SELECT DATE(created_at) AS d, COUNT(*) AS total
      FROM recipes
      WHERE created_at >= NOW() - INTERVAL ? DAY
      GROUP BY DATE(created_at)
      ORDER BY d
      `,
      [days]
    );

    const [usersDaily] = await pool.query(
      `
      SELECT DATE(created_at) AS d, COUNT(*) AS total
      FROM users
      WHERE created_at >= NOW() - INTERVAL ? DAY
      GROUP BY DATE(created_at)
      ORDER BY d
      `,
      [days]
    );

    const [[subsTotal]] = await pool.query(`SELECT COUNT(*) AS total FROM subscribers`);

    const [topSegRows] = await pool.query(
      `
      SELECT r.tag, COUNT(*) AS total
      FROM favorites f
      JOIN recipes r ON r.id = f.recipe_id
      GROUP BY r.tag
      ORDER BY total DESC
      LIMIT 1
      `
    );

    res.json({
      topRecipes,
      activity: {
        recipes: recipesDaily,
        users: usersDaily,
      },
      newsletter: {
        totalSubscribers: Number(subsTotal.total) || 0,
        topSegment: topSegRows?.[0]?.tag || "—",
        openRate: 42,
      },
      days,
    });
  } catch (err) {
    console.error("GET /api/admin/reports error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;