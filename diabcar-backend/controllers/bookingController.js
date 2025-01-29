const { validationResult } = require("express-validator");
const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = (req, res) => {
  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { user_id, car_id, start_date, end_date, total_price } = req.body;

  // Ensure start_date is before end_date
  if (new Date(start_date) >= new Date(end_date)) {
    return res.status(400).json({
      success: false,
      message: "Start date must be before the end date.",
    });
  }

  // Create the booking
  Booking.create(user_id, car_id, start_date, end_date, total_price, "pending", (err) => {
    if (err) {
      console.error("Error creating booking:", err.message);
      return res.status(500).json({ success: false, message: "Failed to create booking." });
    }
    res.status(201).json({
      success: true,
      message: "Booking created successfully!",
    });
  });
};

// Get all bookings
exports.getBookings = (req, res) => {
  Booking.getAll((err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err.message);
      return res.status(500).json({ success: false, message: "Failed to fetch bookings." });
    }
    res.json({
      success: true,
      bookings: results,
    });
  });
};

/**
 * Get all bookings for a specific user
 * You must implement Booking.getByUserId(userId, callback) in your Booking model.
 */
exports.getBookingsForUser = (req, res) => {
  const { userId } = req.params;

  // Basic check for a valid userId
  if (!userId || isNaN(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "User ID must be a valid number." });
  }

  Booking.getByUserId(userId, (err, results) => {
    if (err) {
      console.error("Error fetching user bookings:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch user bookings." });
    }
    res.json({
      success: true,
      bookings: results,
    });
  });
};

// Update a booking by ID
exports.updateBooking = (req, res) => {
  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id } = req.params;
  const { start_date, end_date, total_price, status } = req.body;

  // Ensure start_date is before end_date if both are provided
  if (start_date && end_date && new Date(start_date) >= new Date(end_date)) {
    return res.status(400).json({
      success: false,
      message: "Start date must be before the end date.",
    });
  }

  const updatedBooking = { start_date, end_date, total_price, status };

  Booking.updateById(id, updatedBooking, (err) => {
    if (err) {
      console.error("Error updating booking:", err.message);
      return res.status(500).json({ success: false, message: "Failed to update booking." });
    }
    res.json({
      success: true,
      message: "Booking updated successfully!",
    });
  });
};

// Delete a booking by ID
exports.deleteBooking = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Booking ID must be a valid number." });
  }

  Booking.deleteById(id, (err) => {
    if (err) {
      console.error("Error deleting booking:", err.message);
      return res.status(500).json({ success: false, message: "Failed to delete booking." });
    }
    res.json({
      success: true,
      message: "Booking deleted successfully!",
    });
  });
};
