const { validationResult } = require("express-validator");
const Review = require("../models/Review");

// Create a new review
exports.createReview = (req, res) => {
  // Validate request inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { user_id, car_id, rating, comment } = req.body;

  // Ensure rating is within 1-5
  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5.",
    });
  }

  // Create the review
  Review.create(user_id, car_id, rating, comment, (err) => {
    if (err) {
      console.error("Error creating review:", err.message);

      // Handle specific database error if needed
      if (err.code === "ER_BAD_NULL_ERROR") {
        return res.status(400).json({
          success: false,
          message: "All fields are required and must be valid.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to submit review. Please try again later.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Review submitted successfully! Pending approval by admin.",
    });
  });
};

// Approve a review
exports.approveReview = (req, res) => {
  const { id } = req.params;

  // Validate review ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Review ID must be a valid number.",
    });
  }

  // Approve the review in the database
  Review.approve(id, (err) => {
    if (err) {
      console.error("Error approving review:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to approve review. Please try again later.",
      });
    }
    res.json({
      success: true,
      message: "Review approved successfully!",
    });
  });
};

// Fetch all approved reviews
exports.getApprovedReviews = (req, res) => {
  Review.getAllApproved((err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch reviews. Please try again later.",
      });
    }
    res.json({
      success: true,
      reviews: results,
    });
  });
};

// Delete a review
exports.deleteReview = (req, res) => {
  const { id } = req.params;

  // Validate review ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Review ID must be a valid number.",
    });
  }

  // Delete the review from the database
  Review.deleteById(id, (err) => {
    if (err) {
      console.error("Error deleting review:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to delete review. Please try again later.",
      });
    }
    res.json({
      success: true,
      message: "Review deleted successfully.",
    });
  });
};