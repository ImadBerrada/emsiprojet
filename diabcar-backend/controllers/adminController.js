const db = require("../config/db"); // Database connection

// Controller to fetch dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    // Queries to fetch dashboard stats
    const totalCars = await new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS count FROM cars", (err, results) => {
        if (err) reject(err);
        else resolve(results[0].count);
      });
    });

    const activeUsers = await new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS count FROM users", (err, results) => {
        if (err) reject(err);
        else resolve(results[0].count);
      });
    });

    const carsRented = await new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS count FROM bookings", (err, results) => {
        if (err) reject(err);
        else resolve(results[0].count);
      });
    });

    // Send the collected data
    res.status(200).json({
      success: true,
      totalCars,
      activeUsers,
      carsRented,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data.",
    });
  }
};