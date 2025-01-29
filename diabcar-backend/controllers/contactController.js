const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");

// Submit a contact form message
exports.submitMessage = (req, res) => {
  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, email, message } = req.body;

  // Save the contact message to the database
  Contact.create(name, email, message, (err) => {
    if (err) {
      console.error("Error submitting contact message:", err.message);

      // Handle specific database errors
      if (err.code === "ER_BAD_NULL_ERROR") {
        return res.status(400).json({
          success: false,
          message: "One or more fields are missing or invalid.",
        });
      }

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "This message has already been submitted.",
        });
      }

      // General database/server error
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      });
    }

    // Success response
    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!",
    });
  });
};