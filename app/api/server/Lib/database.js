// lib/database.js
require("dotenv").config(); // Load environment variables from .env file
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Call connectPostgreSQL to establish the connection
connectPostgreSQL();

async function connectPostgreSQL() {
  try {
    await pool.connect();
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}

// Export the pool and connectPostgreSQL function
module.exports = { pool, connectPostgreSQL };

