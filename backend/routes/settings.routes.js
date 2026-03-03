// routes/settings.routes.js
import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { auth, requireRole } from "../middleware/auth.js";
import { deleteUserRefreshTokens } from "../utils/refreshTokens.js";

const router = Router();

router.get("/settings", auth, requireRole("admin"), async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT site_name, owner_email, newsletter_from_email FROM site_settings WHERE id = 1"
    );
    const row = rows[0];
    if (!row) return res.status(404).json({ error: "settings_not_found" });

    res.json({
      siteName: row.site_name,
      ownerEmail: row.owner_email,
      newsletterFrom: row.newsletter_from_email,
    });
  } catch (err) {
    console.error("GET /api/settings error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.put("/settings", auth, requireRole("admin"), async (req, res) => {
  const { siteName, ownerEmail, newsletterFrom } = req.body || {};

  if (!siteName || !ownerEmail || !newsletterFrom) {
    return res.status(400).json({ error: "missing_fields" });
  }

  try {
    await pool.query(
      `UPDATE site_settings
       SET site_name = ?, owner_email = ?, newsletter_from_email = ?
       WHERE id = 1`,
      [siteName, ownerEmail, newsletterFrom]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/settings error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.put("/change-password", auth, requireRole("admin"), async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "missing_fields" });
  }
  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: "password_too_short" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
    const u = rows[0];
    if (!u) return res.status(404).json({ error: "user_not_found" });

    const ok = await bcrypt.compare(currentPassword, u.password_hash);
    if (!ok) return res.status(401).json({ error: "wrong_current_password" });

    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [hash, req.user.id]);

    await deleteUserRefreshTokens(req.user.id);

    res.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/change-password error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;