const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
require("dotenv").config(); // so process.env.JWT_SECRET works

// Register a new user AND immediately sign them in with JWT
exports.register = (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, phone_number, password, role } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Server error. Unable to hash password." });
    }

    // Store user with hashed password
    User.create(
      name,
      email,
      phone_number,
      hashedPassword,
      role || "customer",
      (createErr) => {
        if (createErr) {
          console.error("Error creating user:", createErr.message);

          // Check if email already exists (unique constraint violation)
          if (createErr.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ success: false, message: "Email already exists. Please use another email." });
          }

          return res
            .status(500)
            .json({ success: false, message: "Failed to register user" });
        }

        // Now that the user is created, fetch that user’s info to build a JWT
        // (Assuming your model has a method like `User.findByEmail(...)`)
        User.findByEmail(email, (findErr, newUser) => {
          if (findErr || !newUser) {
            console.error("Error finding newly created user:", findErr?.message);
            return res
              .status(500)
              .json({ success: false, message: "Failed to retrieve new user data" });
          }

          // Generate a JWT token so the user can stay logged in
          const token = jwt.sign(
            {
              userId: newUser.id,
              role: newUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // e.g., 1 hour, tweak as needed
          );

          return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            token, // The client can store this token in localStorage or an HttpOnly cookie
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
            },
          });
        });
      }
    );
  });
};
