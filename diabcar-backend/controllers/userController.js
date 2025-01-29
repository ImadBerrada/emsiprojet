// controllers/userController.js
const db = require("../config/db");

// Fetch all users
exports.getUsers = (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to fetch users", error: err.message });
    }

    if (!results.length) {
      return res.status(404).json({ message: "No users found" });
    }

    console.log("Fetched users successfully:", results);
    res.status(200).json({ users: results });
  });
};

// NEW: Fetch a single user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to fetch user", error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Fetched user successfully:", results[0]);
    res.status(200).json({ user: results[0] });
  });
};

// NEW: Update user (name, email, phone_number, etc.)
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number } = req.body;

  if (!name && !email && !phone_number) {
    return res
      .status(400)
      .json({ message: "Nothing to update. Provide at least one field." });
  }

  // Dynamically build SET clause
  const fieldsToUpdate = [];
  const values = [];
  if (name) {
    fieldsToUpdate.push("name = ?");
    values.push(name);
  }
  if (email) {
    fieldsToUpdate.push("email = ?");
    values.push(email);
  }
  if (phone_number) {
    fieldsToUpdate.push("phone_number = ?");
    values.push(phone_number);
  }

  const setClause = fieldsToUpdate.join(", ");
  const query = `UPDATE users SET ${setClause} WHERE id = ?`;
  values.push(id);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error updating user:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to update user", error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`User updated successfully with ID ${id}`);
    res.status(200).json({ message: "User updated successfully" });
  });
};

// Update user status (existing)
exports.updateUserStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const validStatuses = ["approved", "pending"];
  if (!validStatuses.includes(status)) {
    return res
      .status(400)
      .json({ message: `Invalid status value. Allowed: ${validStatuses.join(", ")}` });
  }

  const query = "UPDATE users SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, results) => {
    if (err) {
      console.error("Error updating user status:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to update user status", error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`User status updated successfully for ID ${id} to ${status}`);
    res.status(200).json({ message: "User status updated successfully" });
  });
};

// Delete a user (existing)
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err.message);
      return res
        .status(500)
        .json({ message: "Failed to delete user", error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`User deleted successfully with ID ${id}`);
    res.status(200).json({ message: "User deleted successfully" });
  });
};
