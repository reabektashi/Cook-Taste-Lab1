// utils/refreshTokens.js
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { REFRESH_TOKEN_DAYS } from "./tokens.js";

export async function saveRefreshToken(userId, refreshToken) {
  const hash = await bcrypt.hash(refreshToken, 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_DAYS);

  await pool.query(
    "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
    [userId, hash, expiresAt]
  );
}

export async function deleteUserRefreshTokens(userId) {
  await pool.query("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
}

export async function findValidRefreshToken(userId, refreshToken) {
  const [rows] = await pool.query(
    "SELECT * FROM refresh_tokens WHERE user_id = ? AND expires_at > NOW()",
    [userId]
  );

  for (const row of rows) {
    const ok = await bcrypt.compare(refreshToken, row.token_hash);
    if (ok) return row;
  }
  return null;
}