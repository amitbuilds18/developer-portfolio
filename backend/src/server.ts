import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool, initDB } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// 1. Health check route
app.get("/api/health", async (req: Request, res: Response) => {
  let dbStatus = "disconnected";
  try {
    const result = await pool.query("SELECT NOW()");
    if (result.rows.length > 0) dbStatus = "connected";
  } catch (err) {
    dbStatus = "error";
  }

  res.json({
    status: "ok",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// 2. Contact submission route - Inserts into Neon PostgreSQL
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required fields.",
      });
    }

    // Insert message into Neon PostgreSQL
    const insertQuery = `
      INSERT INTO messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, created_at;
    `;
    const values = [name.trim(), email.trim(), (subject || "General Inquiry").trim(), message.trim()];

    const result = await pool.query(insertQuery, values);
    const savedMessage = result.rows[0];

    console.log(`📩 New message received from ${savedMessage.name} (${savedMessage.email})`);

    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been stored successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to save message. Please try again later.",
    });
  }
});

// 3. View received messages (Protected / Admin view)
app.get("/api/messages", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 50;");
    return res.json({
      success: true,
      count: result.rowCount,
      messages: result.rows,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch messages.",
    });
  }
});

// Start server and initialize database tables
const server = app.listen(PORT, async () => {
  console.log(`🚀 Portfolio backend running on http://localhost:${PORT}`);
  await initDB();
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n⚠️ Port ${PORT} is already in use by another process.`);
    console.error(`💡 Solution: Run "npx kill-port ${PORT}" to free it, or start on another port: "PORT=5001 npm start"\n`);
  } else {
    console.error("Server error:", err);
  }
});
