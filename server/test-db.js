require("dotenv").config();

const mysql = require("mysql2/promise");

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ Database Connected Successfully");

    const [rows] = await connection.query("SELECT 1");
    console.log(rows);

    await connection.end();
  } catch (err) {
    console.error("❌ Database Connection Failed");
    console.error(err);
  }
}

testConnection();