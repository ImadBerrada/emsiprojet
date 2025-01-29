import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/network'; // Make sure this has getBookingsForUser(userId), cancelBooking, etc.

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]); // State for user's bookings
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        // 1. Check local storage for a logged-in user
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setError("You must be logged in to see your bookings.");
          setLoading(false);
          return;
        }

        // 2. Parse user object (assuming it has "id")
        const user = JSON.parse(storedUser);

        // 3. Call API method to get only that user's bookings
        const response = await API.getBookingsForUser(user.id);

        if (response.success) {
          setBookings(response.bookings);
        } else {
          throw new Error(response.message || "Failed to fetch bookings.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  /**
   * Show booking details placeholder (could be a modal or new page).
   */
  const handleBookingDetails = (bookingId) => {
    alert(`Booking Details for ID: ${bookingId} - Coming Soon!`);
  };

  /**
   * Handle canceling a booking.
   */
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await API.cancelBooking(bookingId);
      if (response.success) {
        alert("Booking cancelled successfully!");
        // Remove the cancelled booking from local state
        setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      } else {
        throw new Error(response.message || "Failed to cancel booking.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 pt-24">
        <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>

        {/* Loading Indicator */}
        {loading && <p className="text-center text-gray-500">Loading bookings...</p>}

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Booking List */}
        {!loading && !error && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden"
              >
                {/* 1) Car Image */}
                <div className="md:w-1/3">
                  <img
                    src={
                      booking.car_image
                        ? booking.car_image
                        : "https://via.placeholder.com/300x200"
                    }
                    alt={booking.car_name || "Car"}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* 2) Booking Details */}
                <div className="p-4 md:flex-1">
                  {/* Car name */}
                  <h2 className="text-xl font-bold mb-2">
                    {booking.car_name || "Car Name Unavailable"}
                  </h2>

                  {/* Booked By (User Name) */}
                  <p className="text-gray-600">
                    👤 Booked by: {booking.user_name || "Unknown"}
                  </p>

                  {/* Show car-specific details if your DB returns them */}
                  {booking.car_year && (
                    <p className="text-gray-600">📅 Year: {booking.car_year}</p>
                  )}
                  {booking.car_transmission && (
                    <p className="text-gray-600">
                      ⚙️ Transmission: {booking.car_transmission}
                    </p>
                  )}

                  {/* Price per day (from the "cars" table if joined) */}
                  <p className="text-gray-600">
                    💰 Price per Day: {booking.price_per_day || 0} MAD
                  </p>

                  {/* Booking Start & End Dates */}
                  <p className="text-gray-600">📅 Start Date: {booking.start_date}</p>
                  <p className="text-gray-600">📅 End Date: {booking.end_date}</p>

                  {/* Duration (if your DB or API returns it; else remove) */}
                  {booking.duration && (
                    <p className="text-gray-600">⏳ Duration: {booking.duration} days</p>
                  )}
                </div>

                {/* 3) Booking Actions / Status */}
                <div className="p-4 flex flex-col justify-between items-end md:w-1/4">
                  <span className="text-lg font-bold text-gray-800">
                    Total Cost: {booking.total_price || 0} MAD
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-white ${
                      booking.status === "confirmed"
                        ? "bg-green-500"
                        : booking.status === "cancelled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </span>

                  <div className="space-y-2 mt-4">
                    {/* Booking Details Button */}
                    <button
                      onClick={() => handleBookingDetails(booking.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      Details
                    </button>

                    {/* Cancel Booking Button (if it's "confirmed") */}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-gray-500">
              You have no bookings at this time.
            </p>
          )
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
