import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Initialize PostgreSQL pool with SSL enabled (Required by Neon)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * Initializes the database tables if they do not exist.
 */
export async function initDB() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("YOUR_PASSWORD")) {
    console.warn("⚠️  DATABASE_URL is not configured yet in backend/.env.");
    console.warn("👉 Please paste your Neon PostgreSQL connection string in backend/.env");
    return;
  }

  try {
    const client = await pool.connect();
    console.log("🐘 Connected to Neon PostgreSQL database successfully!");

    // Create messages table if it doesn't already exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(createTableQuery);
    console.log("✅ 'messages' table verified in Neon PostgreSQL.");
    client.release();
  } catch (error) {
    console.error("❌ Failed to connect to Neon PostgreSQL:", error);
  }
}
