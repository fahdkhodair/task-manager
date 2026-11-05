
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import sequelize from "./config/db.js";
import taskRoutes from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Global Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully!");

    await sequelize.sync({ alter: true });

    console.log("Database synchronized successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

export default app;
