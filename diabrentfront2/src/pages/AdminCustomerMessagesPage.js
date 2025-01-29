import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaTrash, FaEdit, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const AdminCustomerMessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/users';

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(baseURL); // Fetch users
        setUsers(response.data.users || []); // Assuming the backend returns an array of users
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtered users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`); // Assuming the backend supports DELETE /api/users/:id
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#933D4E]"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Loading State */}
        {loading && <p className="text-gray-500 text-center">Loading users...</p>}

        {/* Table */}
        {!loading && filteredUsers.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Created</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 border-b">
                    <td className="p-4 flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="p-4 flex space-x-4 text-gray-600">
                      <button className="hover:text-blue-500">
                        <FaEnvelope />
                      </button>
                      <button className="hover:text-green-500">
                        <FaEdit />
                      </button>
                      <button
                        className="hover:text-red-500"
                        onClick={() => handleDelete(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4">
              <span className="text-gray-600 text-sm">
                Showing {filteredUsers.length} of {users.length}
              </span>
              {/* Add pagination logic if required */}
            </div>
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

export default AdminCustomerMessagesPage;
