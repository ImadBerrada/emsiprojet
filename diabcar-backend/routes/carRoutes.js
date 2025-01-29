const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const carController = require("../controllers/carController");
const upload = require("../middlewares/uploadMiddleware"); // Multer middleware for image uploads

// ====== Middleware for Request Validation Errors ====== //
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// ====== Reusable Validation Arrays ====== //
const createCarValidation = [
  body("name").notEmpty().withMessage("Car name is required"),
  body("model").notEmpty().withMessage("Car model is required"),
  body("year")
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("Year must be a valid number between 1900 and the next year"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
  body("fuel")
    .isIn(["petrol", "diesel", "electric", "hybrid"])
    .withMessage("Fuel must be one of: petrol, diesel, electric, hybrid"),
  body("transmission")
    .isIn(["manual", "automatic"])
    .withMessage("Transmission must be 'manual' or 'automatic'"),
  body("location").notEmpty().withMessage("Location is required"),
  body("seats").isInt({ gt: 0 }).withMessage("Seats must be a positive integer"),
  body("availability").optional().isBoolean().withMessage("Availability must be a boolean"),
];

const updateCarValidation = [
  param("id").isInt().withMessage("Car ID must be an integer"),
  body("name").optional().notEmpty().withMessage("Car name cannot be empty"),
  body("model").optional().notEmpty().withMessage("Car model cannot be empty"),
  body("year")
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("Year must be a valid number between 1900 and the next year"),
  body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
  body("fuel")
    .optional()
    .isIn(["petrol", "diesel", "electric", "hybrid"])
    .withMessage("Fuel must be one of: petrol, diesel, electric, hybrid"),
  body("transmission")
    .optional()
    .isIn(["manual", "automatic"])
    .withMessage("Transmission must be 'manual' or 'automatic'"),
  body("location").optional().notEmpty().withMessage("Location cannot be empty"),
  body("seats").optional().isInt({ gt: 0 }).withMessage("Seats must be a positive integer"),
  body("availability").optional().isBoolean().withMessage("Availability must be a boolean"),
];

const idValidation = [
  param("id").isInt().withMessage("Car ID must be an integer"),
];

// ====== Routes ====== //

// Create a new car (with image upload)
router.post(
  "/",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ success: false, message: "File size exceeds the 5MB limit." });
        }
        return res
          .status(400)
          .json({ success: false, message: err.message || "File upload failed." });
      }
      next();
    });
  },
  createCarValidation,
  handleValidationErrors,
  carController.createCar
);

// Get all cars
router.get("/", carController.getCars);

// Get a single car by ID
router.get("/:id", idValidation, handleValidationErrors, carController.getCarById);

// Update a car (with optional image upload)
router.put(
  "/:id",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ success: false, message: "File size exceeds the 5MB limit." });
        }
        return res
          .status(400)
          .json({ success: false, message: err.message || "File upload failed." });
      }
      next();
    });
  },
  updateCarValidation,
  handleValidationErrors,
  carController.updateCar
);

// Delete a car
router.delete("/:id", idValidation, handleValidationErrors, carController.deleteCar);

module.exports = router;
