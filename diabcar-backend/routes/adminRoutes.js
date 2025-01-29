const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/adminController");

// Route to fetch dashboard data
router.get("/dashboard", getDashboardData);

module.exports = router;
