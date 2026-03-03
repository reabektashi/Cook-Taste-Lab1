// routes/auth.routes.js
import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { auth as authMw } from "../middleware/auth.js";
import { signAccessToken, createRefreshToken } from "../utils/tokens.js";
import {
  saveRefreshToken,
  deleteUserRefreshTokens,
  findValidRefreshToken,
} from "../utils/refreshTokens.js";

const router = Router();

// /api/me
router.get("/me", authMw, (req, res) => {
  res.json({ user: req.user });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "missing_fields" });

  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hash]
    );

    const user = { id: result.insertId, email, user_role: "user" };

    const accessToken = signAccessToken(user);

    const refreshToken = createRefreshToken();
    await deleteUserRefreshTokens(user.id);
    await saveRefreshToken(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token: accessToken, user });
  } catch (err) {
    console.error("register error:", err);
    res.status(400).json({ error: "email_exists" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const u = rows[0];
    if (!u) return res.status(401).json({ error: "invalid_credentials" });

    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ error: "invalid_credentials" });

    const userPayload = { id: u.id, email: u.email, user_role: u.user_role };

    const accessToken = signAccessToken(userPayload);

    const refreshToken = createRefreshToken();
    await deleteUserRefreshTokens(u.id);
    await saveRefreshToken(u.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      token: accessToken,
      user: { id: u.id, email: u.email, user_role: u.user_role },
    });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const { userId } = req.body || {};

  if (!refreshToken) return res.status(401).json({ error: "no_refresh_token" });
  if (!userId) return res.status(400).json({ error: "missing_userId" });

  try {
    const record = await findValidRefreshToken(userId, refreshToken);
    if (!record) return res.status(401).json({ error: "invalid_refresh_token" });

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
    const u = rows[0];
    if (!u) return res.status(401).json({ error: "user_not_found" });

    const userPayload = { id: u.id, email: u.email, user_role: u.user_role };
    const newAccessToken = signAccessToken(userPayload);

    const newRefreshToken = createRefreshToken();
    await deleteUserRefreshTokens(u.id);
    await saveRefreshToken(u.id, newRefreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token: newAccessToken });
  } catch (err) {
    console.error("POST /api/refresh error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

router.post("/logout", async (req, res) => {
  const { userId } = req.body || {};

  try {
    if (userId) {
      await deleteUserRefreshTokens(userId);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("POST /api/logout error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;