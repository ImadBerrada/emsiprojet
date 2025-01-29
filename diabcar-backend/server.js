const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const db = require("./config/db"); // Import the MySQL connection pool

// ====== Load Environment Variables ====== //
dotenv.config();

// ====== Initialize Express App ====== //
const app = express();
const PORT = process.env.PORT || 5000;

// ====== Middleware ====== //

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow requests from frontend
  })
);

// Parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., images, public assets)
app.use(express.static(path.join(__dirname, "public")));

// Serve uploaded images explicitly
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Session Middleware for stateful sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // Use a secure secret in production
    resave: false, // Avoid resaving unchanged sessions
    saveUninitialized: false, // Do not save empty sessions
    cookie: {
      httpOnly: true, // Prevent XSS attacks
      secure: process.env.NODE_ENV === "production", // Enable secure cookies only in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    },
  })
);

// ====== Database Connection Test ====== //
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Exit process if the database connection fails
  }
  console.log("✅ Database connected successfully!");
  connection.release(); // Release the connection back to the pool
});

// ====== Routes ====== //

// Import Route Files
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes"); // User management routes
const analyticsRoutes = require("./routes/analyticsRoutes"); // Analytics routes

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Backend Server is Running!");
});

// API Test Route for Frontend Connection
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "✅ Backend is connected successfully!",
  });
});

// Database Connection Test Route
app.get("/db-test", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Database connection failed:", err.message);
      return res.status(500).json({
        success: false,
        message: "❌ Database connection failed",
        error: err.message,
      });
    }
    connection.release(); // Release the connection
    res.json({
      success: true,
      message: "✅ Database connected successfully!",
    });
  });
});

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "✅ Backend Server is Healthy!",
  });
});

// Mount API Routes
app.use("/api/auth", authRoutes);       // Authentication routes
app.use("/api/cars", carRoutes);        // Car management routes
app.use("/api/bookings", bookingRoutes);// Booking management routes
app.use("/api/reviews", reviewRoutes);  // Review management routes
app.use("/api/contact", contactRoutes); // Contact form route
app.use("/api/admin", adminRoutes);     // Admin dashboard routes
app.use("/api/users", userRoutes);      // User management routes
app.use("/api/analytics", analyticsRoutes); // Analytics routes

// ====== 404 Handler ====== //
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "❌ Route not found",
  });
});

// ====== Global Error Handling Middleware ====== //
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack || err.message);
  res.status(500).json({
    success: false,
    message: "⚠️ Internal Server Error",
    error: err.message || "An unexpected error occurred",
  });
});

// ====== Start Server ====== //
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
