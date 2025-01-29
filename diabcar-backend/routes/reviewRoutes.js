const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const Review = require("../models/Review");

// Middleware for validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// Create a new review
router.post(
  "/",
  [
    body("user_id").isInt().withMessage("User ID must be an integer."),
    body("car_id").isInt().withMessage("Car ID must be an integer."),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be an integer between 1 and 5."),
    body("comment").trim().notEmpty().withMessage("Comment is required."),
  ],
  validate,
  (req, res) => {
    const { user_id, car_id, rating, comment } = req.body;

    // Create the review
    Review.create(user_id, car_id, rating, comment, (err) => {
      if (err) {
        console.error("Error creating review:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Failed to create review." });
      }
      res.status(201).json({
        success: true,
        message: "Review submitted successfully! Pending admin approval.",
      });
    });
  }
);

// Get all approved reviews
router.get("/", (req, res) => {
  Review.getAllApproved((err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch reviews." });
    }
    res.json({
      success: true,
      reviews: results,
    });
  });
});

// Approve a review (Admin only)
router.put(
  "/:id/approve",
  [param("id").isInt().withMessage("Review ID must be an integer.")],
  validate,
  (req, res) => {
    const { id } = req.params;

    Review.approve(id, (err) => {
      if (err) {
        console.error("Error approving review:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Failed to approve review." });
      }
      res.json({
        success: true,
        message: "Review approved successfully!",
      });
    });
  }
);

// Delete a review
router.delete(
  "/:id",
  [param("id").isInt().withMessage("Review ID must be an integer.")],
  validate,
  (req, res) => {
    const { id } = req.params;

    Review.deleteById(id, (err) => {
      if (err) {
        console.error("Error deleting review:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Failed to delete review." });
      }
      res.json({
        success: true,
        message: "Review deleted successfully!",
      });
    });
  }
);

module.exports = router;
