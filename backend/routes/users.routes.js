// routes/users.routes.js
import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

// GET /api/users?role=all|user|admin
router.get("/users", auth, requireRole("admin"), async (req, res) => {
  const role = String(req.query.role || "all").toLowerCase();

  try {
    let sql = "SELECT id, email, user_role, status, created_at FROM users";
    const params = [];

    if (role === "admin" || role === "user") {
      sql += " WHERE user_role = ?";
      params.push(role);
    }

    sql += " ORDER BY created_at DESC";

    const [rows] = await pool.query(sql, params);
    res.json({ users: rows });
  } catch (err) {
    console.error("GET /api/users error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

// POST /api/users  (ADD)
router.post("/users", auth, requireRole("admin"), async (req, res) => {
  const { email, password, user_role, status } = req.body || {};

  if (!email || !String(email).trim()) {
    return res.status(400).json({ error: "email_required" });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const role = user_role === "admin" ? "admin" : "user";
  const st = status === "inactive" ? "inactive" : "active";

  const rawPass =
    password && String(password).trim() ? String(password).trim() : "ChangeMe123!";

  try {
    const hash = await bcrypt.hash(rawPass, 10);

    const [result] = await pool.query(
      "INSERT INTO users (email, password_hash, user_role, status) VALUES (?, ?, ?, ?)",
      [cleanEmail, hash, role, st]
    );

    const [rows] = await pool.query(
      "SELECT id, email, user_role, status, created_at FROM users WHERE id = ? LIMIT 1",
      [result.insertId]
    );

    res.status(201).json({
      user: rows[0],
      note: password ? undefined : "Default password: ChangeMe123!",
    });
  } catch (err) {
    console.error("POST /api/users error:", err);

    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "email_exists" });
    }

    res.status(500).json({ error: "server_error" });
  }
});

// PUT /api/users/:id  (EDIT)
router.put("/users/:id", auth, requireRole("admin"), async (req, res) => {
  const id = Number(req.params.id);
  const { email, user_role, status } = req.body || {};

  if (!Number.isInteger(id)) return res.status(400).json({ error: "invalid_id" });
  if (!email || !String(email).trim()) return res.status(400).json({ error: "email_required" });

  const cleanEmail = String(email).trim().toLowerCase();
  const role = user_role === "admin" ? "admin" : "user";
  const st = status === "inactive" ? "inactive" : "active";

  try {
    const [result] = await pool.query(
      "UPDATE users SET email = ?, user_role = ?, status = ? WHERE id = ?",
      [cleanEmail, role, st, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "user_not_found" });
    }

    const [rows] = await pool.query(
      "SELECT id, email, user_role, status, created_at FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    res.json({ user: rows[0] });
  } catch (err) {
    console.error("PUT /api/users/:id error:", err);

    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "email_exists" });
    }

    res.status(500).json({ error: "server_error" });
  }
});

// DELETE /api/users/:id
router.delete("/users/:id", auth, requireRole("admin"), async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "invalid_id" });

  if (req.user?.id === id) {
    return res.status(400).json({ error: "cannot_delete_self" });
  }

  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "user_not_found" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/users/:id error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;