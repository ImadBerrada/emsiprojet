// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Middleware to validate numeric `id` format for MySQL
const validateUserId = (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    // Check if `id` is a valid numeric value
    return res
      .status(400)
      .json({ message: "Invalid user ID format. ID must be a numeric value." });
  }
  next();
};

// Route to fetch all users
router.get("/", userController.getUsers);

// NEW Route: fetch a single user by ID
router.get("/:id", validateUserId, userController.getUserById);

// NEW Route: update a user (name, email, phone, etc.)
router.put("/:id", validateUserId, userController.updateUser);

// Route to update user status
router.put("/:id/status", validateUserId, userController.updateUserStatus);

// Route to delete a user
router.delete("/:id", validateUserId, userController.deleteUser);

module.exports = router;
