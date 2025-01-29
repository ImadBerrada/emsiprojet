const db = require("../config/db");

const User = {
  create: (name, email, phone_number, password, role, callback) => {
    const sql = "INSERT INTO users (name, email, phone_number, password, role) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, phone_number, password, role], callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT id, name, email, phone_number, role, created_at FROM users";
    db.query(sql, callback);
  },

  deleteById: (id, callback) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = User;
