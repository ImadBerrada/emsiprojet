const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");

// ====== User Registration Route ====== //
router.post(
  "/register",
  [
    // Input validation
    body("name").notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
    body("phone_number")
      .isMobilePhone()
      .withMessage("Valid phone number is required."),
    body("role")
      .optional()
      .isIn(["customer", "admin"])
      .withMessage("Role must be 'customer' or 'admin'."),
  ],
  (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, phone_number, role } = req.body;

    // Check if the user already exists
    User.findByEmail(email, (findErr, findResults) => {
      if (findErr) {
        console.error("Database error:", findErr.message);
        return res
          .status(500)
          .json({ success: false, message: "Database error. Please try again later." });
      }

      if (findResults.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Email is already registered." });
      }

      // Hash the password before storing
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error("Error hashing password:", hashErr.message);
          return res
            .status(500)
            .json({ success: false, message: "Server error. Unable to hash password." });
        }

        // Create the new user
        User.create(name, email, phone_number, hashedPassword, role || "customer", (createErr) => {
          if (createErr) {
            console.error("Error creating user:", createErr.message);
            return res
              .status(500)
              .json({ success: false, message: "Failed to register user." });
          }

          // Now fetch the newly created user to store in session (auto-login)
          User.findByEmail(email, (newErr, newUserResults) => {
            if (newErr) {
              console.error("Error retrieving new user:", newErr.message);
              return res
                .status(500)
                .json({ success: false, message: "Registration successful, but failed to retrieve user data." });
            }

            if (!newUserResults || newUserResults.length === 0) {
              return res
                .status(500)
                .json({ success: false, message: "User registered, but could not load user info." });
            }

            // Store user data in session
            const newUser = newUserResults[0];
            req.session.user = {
              id: newUser.id,
              role: newUser.role,
              email: newUser.email,
            };

            return res.status(201).json({
              success: true,
              message: "User registered successfully!",
              user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
              },
            });
          });
        });
      });
    });
  }
);

// ====== User Login Route ====== //
router.post(
  "/login",
  [
    // Input validation
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    User.findByEmail(email, (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Database error. Please try again later." });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found. Please check your email." });
      }

      const user = results[0];

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (compareErr, isMatch) => {
        if (compareErr) {
          console.error("Error comparing passwords:", compareErr.message);
          return res
            .status(500)
            .json({ success: false, message: "Server error. Please try again later." });
        }

        if (!isMatch) {
          return res
            .status(401)
            .json({ success: false, message: "Incorrect password. Please try again." });
        }

        // Store user data in session
        req.session.user = { id: user.id, role: user.role, email: user.email };
        res.status(200).json({
          success: true,
          message: "Logged in successfully!",
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        });
      });
    });
  }
);

// ====== User Logout Route ====== //
router.post("/logout", (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ success: false, message: "No active session to log out." });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to log out. Please try again." });
    }

    res.clearCookie("connect.sid"); // Clear the session cookie
    res.json({ success: true, message: "Logged out successfully." });
  });
});

module.exports = router;
