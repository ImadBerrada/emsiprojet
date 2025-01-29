const { validationResult } = require("express-validator");
const Car = require("../models/Car");
const fs = require("fs");
const path = require("path");

// ====== Middleware to Handle Validation Errors ====== //
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// ====== Controllers ====== //

// Create a new car
exports.createCar = (req, res) => {
  const {
    name,
    model,
    year,
    price,
    fuel,
    transmission,
    location,
    seats,
    availability,
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  Car.create(
    name,
    model,
    year,
    price,
    fuel,
    transmission,
    location,
    seats,
    availability || true,
    image,
    (err) => {
      if (err) {
        console.error("Error adding car:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Failed to add car" });
      }
      res.status(201).json({
        success: true,
        message: "Car added successfully!",
      });
    }
  );
};

// Get all cars
exports.getCars = (req, res) => {
  Car.getAll((err, results) => {
    if (err) {
      console.error("Error fetching cars:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch cars" });
    }

    const carsWithImageURL = results.map((car) => ({
      ...car,
      image: car.image_url ? `http://localhost:5000${car.image_url}` : null, // Utilise `image_url`
    }));
    

    res.json({
      success: true,
      message: "Cars fetched successfully!",
      cars: carsWithImageURL || [],
    });
  });
};


// Get a single car by ID
exports.getCarById = (req, res) => {
  const { id } = req.params;

  Car.getById(id, (err, results) => {
    if (err || !results || results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Car not found" });
    }

    const car = {
      ...results[0],
      image: results[0].image_url ? `http://localhost:5000${results[0].image_url}` : null,
    };

    res.json({
      success: true,
      message: "Car fetched successfully!",
      car,
    });
  });
};


// Update a car by ID
exports.updateCar = (req, res) => {
  const { id } = req.params;
  const {
    name,
    model,
    year,
    price,
    fuel,
    transmission,
    location,
    seats,
    availability,
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const updatedCar = {};
  if (name) updatedCar.name = name;
  if (model) updatedCar.model = model;
  if (year) updatedCar.year = year;
  if (price) updatedCar.price = price;
  if (fuel) updatedCar.fuel = fuel;
  if (transmission) updatedCar.transmission = transmission;
  if (location) updatedCar.location = location;
  if (seats) updatedCar.seats = seats;
  if (availability !== undefined) updatedCar.availability = availability;
  if (image) updatedCar.image = image;

  Car.updateById(id, updatedCar, (err) => {
    if (err) {
      console.error("Error updating car:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update car" });
    }

    res.json({
      success: true,
      message: "Car updated successfully!",
    });
  });
};

// Delete a car by ID
exports.deleteCar = (req, res) => {
  const { id } = req.params;

  Car.getById(id, (err, results) => {
    if (err || !results || results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Car not found" });
    }

    const car = results[0];
    Car.deleteById(id, (err) => {
      if (err) {
        console.error("Error deleting car:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Failed to delete car" });
      }

      // Delete the image file
      if (car.image) {
        const imagePath = path.join(__dirname, "../public", car.image);
        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting image file:", unlinkErr.message);
          }
        });
      }

      res.json({
        success: true,
        message: "Car deleted successfully!",
      });
    });
  });
};

// Update car availability
exports.updateAvailability = (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  if (availability === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Availability status is required." });
  }

  Car.updateAvailability(id, availability, (err) => {
    if (err) {
      console.error("Error updating availability:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update availability" });
    }

    res.json({
      success: true,
      message: "Car availability updated successfully!",
    });
  });
};

// Middleware to handle validation errors
exports.handleValidationErrors = handleValidationErrors;
