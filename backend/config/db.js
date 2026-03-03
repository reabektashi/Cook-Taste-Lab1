// config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool;

if (process.env.DATABASE_URL) {
  pool = await mysql.createPool(process.env.DATABASE_URL);
} else {
  pool = await mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  });
}

export default pool;