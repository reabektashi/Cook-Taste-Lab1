// utils/tokens.js
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ACCESS_TOKEN_EXP = "1h";
export const REFRESH_TOKEN_DAYS = 7;

// create access token (JWT)
export function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });
}

export function createRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}