import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  FaCheckCircle, 
  FaEllipsisV, 
  FaSpinner, 
  FaCarSide,
  FaTrashAlt // <-- Trash icon
} from 'react-icons/fa';
import axios from 'axios';

/**
 * Helper to format an ISO string (e.g., "2025-01-17T23:00:00.000Z")
 * into a simpler date string "2025-01-17".
 */
function formatDate(isoString) {
  if (!isoString) return 'N/A';
  return isoString.split('T')[0]; // Takes everything before the 'T'
}

const AdminBookingManagementPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Adjust if you use a different .env variable
  const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

  /**
   * Fetch all bookings on mount
   */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseURL}/bookings`);
        setBookings(response.data.bookings || []);
        setError('');
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [baseURL]);

  /**
   * Handle admin changing a booking's status
   * @param {number} bookingId
   * @param {string} newStatus
   */
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`${baseURL}/bookings/${bookingId}`, { status: newStatus });
      // Update the local state to reflect the new status
      setBookings((prevBookings) =>
        prevBookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update booking status.');
    }
  };

  /**
   * Handle admin deleting a booking
   * @param {number} bookingId
   */
  const handleDeleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseURL}/bookings/${bookingId}`);
      // Remove the deleted booking from state
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Failed to delete booking.');
    }
  };

  return (
    <div className="flex bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 py-6 px-4 md:px-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 animate-pulse">
          Booking Management
        </h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          Manage and track your ongoing bookings with a dash of style!
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded mb-4 border border-red-200">
            {error}
          </p>
        )}

        {/* Loading Indicator */}
        {loading && (
          <p className="text-gray-600 text-center flex items-center gap-2 mb-4">
            <FaSpinner className="animate-spin text-2xl" />
            Loading bookings...
          </p>
        )}

        {/* Bookings Grid */}
        {!loading && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="relative p-6 border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow transform hover:scale-[1.02] duration-300"
              >
                {/* Cute decoration at the top-left corner (optional) */}
                <div className="absolute top-0 left-0 w-3 h-3 rounded-br-full bg-gradient-to-r from-pink-400 to-purple-400" />

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 tracking-wide">
                      {`Booking #${booking.id}`}
                    </h3>
                  </div>

                  {/* Animated Ellipsis */}
                  <div className="text-gray-400 hover:text-gray-600 cursor-pointer transition-transform duration-300 hover:rotate-90">
                    <FaEllipsisV />
                  </div>
                </div>

                {/* Car Details - fancy approach */}
                <div className="mt-2">
                  {booking.car ? (
                    typeof booking.car === 'object' ? (
                      <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCarSide className="text-blue-500 text-xl" />
                          <p className="text-sm font-semibold text-gray-700">
                            Car Details
                          </p>
                        </div>
                        <div className="ml-6 mt-1 text-sm text-gray-800 space-y-1">
                          <p>
                            <span className="font-semibold">Make:</span>{' '}
                            {booking.car.make || 'N/A'}
                          </p>
                          <p>
                            <span className="font-semibold">Model:</span>{' '}
                            {booking.car.model || 'N/A'}
                          </p>
                          <p>
                            <span className="font-semibold">Year:</span>{' '}
                            {booking.car.year || 'N/A'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // If booking.car is just a string
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FaCarSide className="text-blue-400" />
                        <span>{booking.car}</span>
                      </div>
                    )
                  ) : (
                    <p className="text-sm text-gray-500">No car data</p>
                  )}
                </div>

                {/* Display All Booking Details Dynamically */}
                <div className="mt-3 space-y-2">
                  {Object.entries(booking).map(([key, value]) => {
                    // Skip 'car' since we are displaying it in a structured way above
                    if (key === 'car') return null;

                    // If it's startDate or endDate, format the date
                    if (key === 'startDate' || key === 'endDate') {
                      return (
                        <p key={key} className="text-sm text-gray-700">
                          <span className="font-semibold text-gray-800 capitalize mr-1">
                            {key.replace(/_/g, ' ')}:
                          </span>
                          {value ? formatDate(value) : 'N/A'}
                        </p>
                      );
                    }

                    // Otherwise, show as-is
                    return (
                      <p key={key} className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-800 capitalize mr-1">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        {typeof value === 'object' && value !== null ? (
                          <pre className="bg-gray-100 p-2 rounded text-gray-800 text-xs overflow-x-auto mt-1">
                            {JSON.stringify(value, null, 2)}
                          </pre>
                        ) : (
                          value?.toString() || 'N/A'
                        )}
                      </p>
                    );
                  })}
                </div>

                {/* Status Indicator + Dropdown + Delete Button */}
                <div className="mt-4 flex items-center space-x-4">
                  {/* Status Indicator */}
                  {booking.status === 'completed' && (
                    <FaCheckCircle className="text-green-500 text-xl animate-bounce" />
                  )}
                  {booking.status === 'ongoing' && (
                    <FaSpinner className="text-yellow-500 text-xl animate-spin" />
                  )}
                  {booking.status === 'pending' && (
                    <FaEllipsisV className="text-gray-500 text-xl animate-pulse" />
                  )}
                  {booking.status === 'cancelled' && (
                    <span className="text-red-400 font-semibold text-md animate-pulse">
                      Cancelled
                    </span>
                  )}

                  {/* Status Dropdown */}
                  <select
                    className="border rounded-lg px-3 py-2 text-sm bg-gradient-to-r from-gray-50 to-gray-100 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-gray-600 text-center mt-8">
              No bookings found. Enjoy your day!
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default AdminBookingManagementPage;
