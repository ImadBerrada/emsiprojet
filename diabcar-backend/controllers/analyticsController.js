const db = require("../config/db"); // Database connection

// Get metrics for the dashboard
exports.getMetrics = async (req, res) => {
  try {
    const [totalSales, totalCosts, totalOrders] = await Promise.all([
      new Promise((resolve, reject) => {
        db.query("SELECT SUM(total_price) AS totalSales FROM bookings WHERE status = 'completed'", (err, results) => {
          if (err) reject(err);
          else resolve(results[0].totalSales || 0);
        });
      }),
      new Promise((resolve, reject) => {
        db.query("SELECT SUM(price_per_day) AS totalCosts FROM cars", (err, results) => {
          if (err) reject(err);
          else resolve(results[0].totalCosts || 0);
        });
      }),
      new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS totalOrders FROM bookings", (err, results) => {
          if (err) reject(err);
          else resolve(results[0].totalOrders);
        });
      }),
    ]);

    res.status(200).json({
      totalSales,
      totalCosts,
      totalOrders,
    });
  } catch (error) {
    console.error("Error fetching metrics:", error.message);
    res.status(500).json({ message: "Failed to fetch metrics." });
  }
};

// Get sales overview (Line Chart)
exports.getSalesOverview = async (req, res) => {
  try {
    db.query(
      "SELECT DATE(created_at) AS date, SUM(total_price) AS sales FROM bookings WHERE status = 'completed' GROUP BY DATE(created_at)",
      (err, results) => {
        if (err) {
          console.error("Error fetching sales overview:", err.message);
          res.status(500).json({ message: "Failed to fetch sales overview." });
        } else {
          const labels = results.map((row) => row.date);
          const data = results.map((row) => row.sales);
          res.status(200).json({
            labels,
            datasets: [
              {
                label: "Sales",
                data,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
              },
            ],
          });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching sales overview:", error.message);
    res.status(500).json({ message: "Failed to fetch sales overview." });
  }
};

// Get sales by country (Bar Chart)
exports.getSalesByCountry = async (req, res) => {
  try {
    db.query(
      "SELECT location AS country, SUM(total_price) AS sales FROM bookings JOIN cars ON bookings.car_id = cars.id GROUP BY location",
      (err, results) => {
        if (err) {
          console.error("Error fetching sales by country:", err.message);
          res.status(500).json({ message: "Failed to fetch sales by country." });
        } else {
          const labels = results.map((row) => row.country);
          const data = results.map((row) => row.sales);
          res.status(200).json({
            labels,
            datasets: [
              {
                label: "Sales by Country",
                data,
                backgroundColor: ["#3b82f6", "#fbbf24", "#10b981", "#ef4444", "#6366f1"],
              },
            ],
          });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching sales by country:", error.message);
    res.status(500).json({ message: "Failed to fetch sales by country." });
  }
};

// Get top categories (Pie Chart)
exports.getTopCategories = async (req, res) => {
  try {
    db.query(
      "SELECT fuel_type AS category, COUNT(*) AS count FROM bookings JOIN cars ON bookings.car_id = cars.id GROUP BY fuel_type",
      (err, results) => {
        if (err) {
          console.error("Error fetching top categories:", err.message);
          res.status(500).json({ message: "Failed to fetch top categories." });
        } else {
          const labels = results.map((row) => row.category);
          const data = results.map((row) => row.count);
          res.status(200).json({
            labels,
            datasets: [
              {
                data,
                backgroundColor: ["#3b82f6", "#10b981", "#f87171"],
              },
            ],
          });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching top categories:", error.message);
    res.status(500).json({ message: "Failed to fetch top categories." });
  }
};

// Get recent orders
exports.getRecentOrders = async (req, res) => {
  try {
    db.query(
      "SELECT bookings.id, users.name AS customer, bookings.status, bookings.total_price AS total FROM bookings JOIN users ON bookings.user_id = users.id ORDER BY bookings.created_at DESC LIMIT 10",
      (err, results) => {
        if (err) {
          console.error("Error fetching recent orders:", err.message);
          res.status(500).json({ message: "Failed to fetch recent orders." });
        } else {
          res.status(200).json({
            orders: results,
          });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching recent orders:", error.message);
    res.status(500).json({ message: "Failed to fetch recent orders." });
  }
};
