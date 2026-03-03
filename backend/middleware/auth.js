// middleware/auth.js
import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "no_token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "invalid_token" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.user?.user_role;
    if (!role) return res.status(401).json({ error: "unauthorized" });
    if (!roles.includes(role)) return res.status(403).json({ error: "forbidden" });
    next();
  };
}