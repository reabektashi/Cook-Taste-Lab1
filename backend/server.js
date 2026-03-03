// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import recipesRoutes from "./routes/recipes.routes.js";
import subscribeRoutes from "./routes/subscribe.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import categoryItemsRoutes from "./routes/categoryItems.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import ingredientsRoutes from "./routes/ingredients.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174;

// ---------- Middleware ---------
app.use(
  cors({
    origin: [
      "https://localhost:5173",
      "https://127.0.0.1:5173",
      "https://localhost:5175",     // ✅ add this
      "https://127.0.0.1:5175",     // ✅ add this
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ---------- Routes (same as before) ----------
app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", favoritesRoutes);
app.use("/api", recipesRoutes);
app.use("/api", subscribeRoutes);
app.use("/api", categoryItemsRoutes);
app.use("/api", adminRoutes);
app.use("/api", settingsRoutes);

//HTTPS SERVER (same placement logic as in your file)
https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "certs", "localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "certs", "localhost.pem")),
  },
  app
).listen(5174, () => {
  console.log("✅ Backend running at https://localhost:5174");
});

// INGREDIENTS PICKER (mounted after listen, same as your file order)
app.use("/api", ingredientsRoutes);