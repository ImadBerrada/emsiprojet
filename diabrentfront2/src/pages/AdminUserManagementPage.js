import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");

  const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

  // Fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const response = await axios.get(`${baseURL}/users`); // Backend endpoint for fetching users
      setUsers(response.data.users || []); // Assuming the backend returns { users: [...] }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle API errors
  const handleError = (message, error) => {
    console.error(message, error);
    setActionError(message);
    setTimeout(() => setActionError(""), 3000); // Clear error after 3 seconds
  };

  // Update user status
  const updateUserStatus = async (userId, newStatus) => {
    setActionError("");
    setSuccessMessage("");
    try {
      await axios.put(`${baseURL}/users/${userId}/status`, { status: newStatus }); // Backend endpoint for updating status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
      setSuccessMessage(`User status updated to ${newStatus}.`);
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message
    } catch (err) {
      handleError("Failed to update user status. Please try again.", err);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    setActionError("");
    setSuccessMessage("");
    try {
      await axios.delete(`${baseURL}/users/${userId}`); // Backend endpoint for deleting a user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSuccessMessage("User deleted successfully.");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message
    } catch (err) {
      handleError("Failed to delete user. Please try again.", err);
    }
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#722637]"
          />
          <FaSearch className="absolute top-3 right-4 text-gray-400" />
        </div>

        {/* Success and Error Messages */}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {actionError && <p className="text-red-500 mb-4">{actionError}</p>}

        {/* Loading State */}
        {loading && <p className="text-center text-gray-500">Loading users...</p>}

        {/* User List */}
        {!loading && filteredUsers.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border-b hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">User ID: {user.id}</p>
                    <p className="text-sm text-gray-500">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-lg ${
                      user.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() =>
                      updateUserStatus(
                        user.id,
                        user.status === "approved" ? "pending" : "approved"
                      )
                    }
                  >
                    {user.status === "approved" ? "Revoke" : "Approve"}
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Users Found */}
        {!loading && filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagementPage;
