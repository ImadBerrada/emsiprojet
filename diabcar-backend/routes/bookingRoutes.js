const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const Booking = require("../models/Booking");

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

/**
 * Helper: convert an ISO date string into "YYYY-MM-DD".
 * Example: "2025-01-17T23:00:00.000Z" => "2025-01-17"
 */
function toDateOnly(isoString) {
  if (!isoString) return null;
  // Make sure it's a valid date object
  const dateObj = new Date(isoString);
  if (isNaN(dateObj.getTime())) {
    return null; // Not a valid date
  }
  // Return the YYYY-MM-DD portion
  return dateObj.toISOString().split("T")[0];
}

/**
 * Create a new booking
 * POST /bookings
 */
router.post(
  "/",
  [
    body("user_id").isInt().withMessage("User ID must be an integer."),
    body("car_id").isInt().withMessage("Car ID must be an integer."),
    body("start_date").isISO8601().withMessage("Start date must be a valid date."),
    body("end_date").isISO8601().withMessage("End date must be a valid date."),
    body("total_price")
      .isFloat({ gt: 0 })
      .withMessage("Total price must be a positive number."),
  ],
  handleValidationErrors,
  (req, res) => {
    const { user_id, car_id, total_price } = req.body;
    let { start_date, end_date } = req.body;

    // Convert to actual Date objects to verify start < end
    const startObj = new Date(start_date);
    const endObj = new Date(end_date);

    if (startObj >= endObj) {
      return res.status(400).json({
        success: false,
        message: "Start date must be before the end date.",
      });
    }

    // Now strip away the time part, storing only YYYY-MM-DD
    start_date = toDateOnly(start_date);
    end_date = toDateOnly(end_date);

    // Create the booking in the database
    Booking.create(user_id, car_id, start_date, end_date, total_price, "pending", (err) => {
      if (err) {
        console.error("Error creating booking:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Failed to create booking." });
      }
      res.status(201).json({
        success: true,
        message: "Booking created successfully!",
      });
    });
  }
);

/**
 * Get all bookings
 * GET /bookings
 */
router.get("/", (req, res) => {
  Booking.getAll((err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch bookings." });
    }
    res.json({ success: true, bookings: results });
  });
});

/**
 * Get all bookings for a specific user
 * GET /bookings/user/:userId
 */
router.get(
  "/user/:userId",
  [param("userId").isInt().withMessage("User ID must be an integer.")],
  handleValidationErrors,
  (req, res) => {
    const { userId } = req.params;

    // NOTE: Implement getByUserId(userId, callback) in your Booking model
    Booking.getByUserId(userId, (err, results) => {
      if (err) {
        console.error("Error fetching user bookings:", err.message);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch user bookings.",
        });
      }
      res.json({ success: true, bookings: results });
    });
  }
);

/**
 * Update a booking
 * PUT /bookings/:id
 */
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("Booking ID must be an integer."),
    body("start_date").optional().isISO8601().withMessage("Start date must be a valid date."),
    body("end_date").optional().isISO8601().withMessage("End date must be a valid date."),
    body("total_price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Total price must be a positive number."),
    body("status")
      .optional()
      .isIn(["pending", "ongoing", "completed", "cancelled"])
      .withMessage("Status must be one of: pending, ongoing, completed, cancelled."),
  ],
  handleValidationErrors,
  (req, res) => {
    const { id } = req.params;
    let { start_date, end_date, total_price, status } = req.body;

    // If both start_date and end_date are provided, ensure start < end
    if (start_date && end_date) {
      const startObj = new Date(start_date);
      const endObj = new Date(end_date);
      if (startObj >= endObj) {
        return res.status(400).json({
          success: false,
          message: "Start date must be before the end date.",
        });
      }
      // Convert them to YYYY-MM-DD
      start_date = toDateOnly(start_date);
      end_date = toDateOnly(end_date);
    } else {
      // If only one is provided, still convert it
      if (start_date) start_date = toDateOnly(start_date);
      if (end_date) end_date = toDateOnly(end_date);
    }

    const updatedBooking = { start_date, end_date, total_price, status };

    Booking.updateById(id, updatedBooking, (err) => {
      if (err) {
        console.error("Error updating booking:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Failed to update booking." });
      }
      res.json({ success: true, message: "Booking updated successfully!" });
    });
  }
);

/**
 * Delete a booking
 * DELETE /bookings/:id
 */
router.delete(
  "/:id",
  [param("id").isInt().withMessage("Booking ID must be an integer.")],
  handleValidationErrors,
  (req, res) => {
    const { id } = req.params;

    Booking.deleteById(id, (err) => {
      if (err) {
        console.error("Error deleting booking:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Failed to delete booking." });
      }
      res.json({ success: true, message: "Booking deleted successfully!" });
    });
  }
);

module.exports = router;
