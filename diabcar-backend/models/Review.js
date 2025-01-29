const db = require("../config/db");

const Review = {
  create: (user_id, car_id, rating, comment, callback) => {
    const sql = "INSERT INTO reviews (user_id, car_id, rating, comment) VALUES (?, ?, ?, ?)";
    db.query(sql, [user_id, car_id, rating, comment], callback);
  },

  getAllApproved: (callback) => {
    const sql = "SELECT r.*, u.name AS user_name, c.name AS car_name FROM reviews r JOIN users u ON r.user_id = u.id JOIN cars c ON r.car_id = c.id WHERE r.status = 'approved'";
    db.query(sql, callback);
  },

  approve: (id, callback) => {
    const sql = "UPDATE reviews SET status = 'approved' WHERE id = ?";
    db.query(sql, [id], callback);
  },

  deleteById: (id, callback) => {
    const sql = "DELETE FROM reviews WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = Review;
