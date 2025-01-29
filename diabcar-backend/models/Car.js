const db = require("../config/db");

const Car = {
  // Create a new car entry
  create: (name, model, year, price, fuel, transmission, location, seats, availability, image_url, callback) => {
    const sql = `
      INSERT INTO cars 
      (name, model, year, price_per_day, fuel_type, transmission, location, seats, availability, image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, model, year, price, fuel, transmission, location, seats, availability, image_url], callback);
  },

  // Retrieve all cars
  getAll: (callback) => {
    const sql = "SELECT * FROM cars";
    db.query(sql, callback);
  },

  // Retrieve a specific car by ID
  getById: (id, callback) => {
    const sql = "SELECT * FROM cars WHERE id = ?";
    db.query(sql, [id], callback);
  },

  // Update a car's details
  updateById: (id, updatedCar, callback) => {
    const sql = `
      UPDATE cars 
      SET name = ?, model = ?, year = ?, price_per_day = ?, fuel_type = ?, 
          transmission = ?, location = ?, seats = ?, availability = ?, image_url = ?
      WHERE id = ?
    `;
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
      image_url,
    } = updatedCar;

    db.query(
      sql,
      [name, model, year, price, fuel, transmission, location, seats, availability, image_url, id],
      callback
    );
  },

  // Update only the availability of a car
  updateAvailability: (id, availability, callback) => {
    const sql = "UPDATE cars SET availability = ? WHERE id = ?";
    db.query(sql, [availability, id], callback);
  },

  // Delete a car by ID
  deleteById: (id, callback) => {
    const sql = "DELETE FROM cars WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Car;
