const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
const envPath = path.join(__dirname, `../env/${process.env.NODE_ENV}.env`);
dotenv.config({ path: envPath });

// Create MySQL connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = db;
