const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async function (req, res, next) {
  try {
    // Query the dashboard_metrics table using pg-promise
    const data = await db.any("SELECT * FROM dashboard_metrics");

    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
