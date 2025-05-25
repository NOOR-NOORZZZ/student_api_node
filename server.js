const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envPath = path.join(__dirname, `env/${process.env.NODE_ENV}.env`);

if (dotenv.config({ path: envPath }).error) {
    console.error("Error loading .env file.");
    process.exit(1);
}
console.log(".env file loaded successfully.");

// Database connection
const db = require("./config/db");
db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
    console.log("Database connected successfully.");
    connection.release();

    // Initialize Express app
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api", require("./src/routes/studentRoutes"));

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});
