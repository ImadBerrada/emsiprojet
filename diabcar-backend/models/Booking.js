const db = require("../config/db");

const Booking = {
  /**
   * Create a new booking
   * @param {number} user_id
   * @param {number} car_id
   * @param {string} start_date
   * @param {string} end_date
   * @param {number} total_price
   * @param {string} status
   * @param {Function} callback
   */
  create: (user_id, car_id, start_date, end_date, total_price, status, callback) => {
    const sql = `
      INSERT INTO bookings (user_id, car_id, start_date, end_date, total_price, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [user_id, car_id, start_date, end_date, total_price, status], callback);
  },

  /**
   * Get all bookings (includes joined user/car info)
   * @param {Function} callback
   */
  getAll: (callback) => {
    const sql = `
      SELECT b.*, u.name AS user_name, c.name AS car_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN cars c ON b.car_id = c.id
    `;
    db.query(sql, callback);
  },

  /**
   * Get a single booking by ID (includes joined user/car info)
   * @param {number} id
   * @param {Function} callback
   */
  getById: (id, callback) => {
    const sql = `
      SELECT b.*, u.name AS user_name, c.name AS car_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN cars c ON b.car_id = c.id
      WHERE b.id = ?
    `;
    db.query(sql, [id], callback);
  },

  /**
   * Get all bookings for a specific user (includes joined user/car info)
   * @param {number} userId
   * @param {Function} callback
   */
  getByUserId: (userId, callback) => {
    const sql = `
      SELECT b.*, u.name AS user_name, c.name AS car_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN cars c ON b.car_id = c.id
      WHERE b.user_id = ?
    `;
    db.query(sql, [userId], callback);
  },

  /**
   * Update a booking by ID (start_date, end_date, total_price, status)
   * @param {number} id
   * @param {object} updatedBooking
   * @param {Function} callback
   */
  updateById: (id, updatedBooking, callback) => {
    const { start_date, end_date, total_price, status } = updatedBooking;

    const sql = `
      UPDATE bookings
      SET start_date = ?, end_date = ?, total_price = ?, status = ?
      WHERE id = ?
    `;
    db.query(sql, [start_date, end_date, total_price, status, id], callback);
  },

  /**
   * Delete a booking by ID
   * @param {number} id
   * @param {Function} callback
   */
  deleteById: (id, callback) => {
    const sql = `
      DELETE FROM bookings
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  },

  /**
   * Update only the status of a booking by ID
   * @param {number} id
   * @param {string} status
   * @param {Function} callback
   */
  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE bookings
      SET status = ?
      WHERE id = ?
    `;
    db.query(sql, [status, id], callback);
  },
};

module.exports = Booking;
