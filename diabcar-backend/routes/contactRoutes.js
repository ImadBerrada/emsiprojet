const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Validation rules for the contact form
const validateContactForm = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("A valid email is required."),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long."),
];

// Route: Submit a contact form message
router.post("/", validateContactForm, contactController.submitMessage);

module.exports = router;
