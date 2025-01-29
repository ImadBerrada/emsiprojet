import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    created_at: "",
    rentals: 0, // If you store rental count separately, adapt accordingly
  });

  const navigate = useNavigate();

  // 1) On mount, fetch the user data by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId"); // e.g. "123"
        if (!userId) {
          // If no user ID in storage, redirect to login or handle accordingly
          return navigate("/login");
        }

        // GET /api/users/:id
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        if (res.data.user) {
          const fetchedUser = res.data.user;
          setUser({
            id: fetchedUser.id,
            name: fetchedUser.name,
            email: fetchedUser.email,
            phone_number: fetchedUser.phone_number,
            created_at: fetchedUser.created_at,
            rentals: 12, // Hard-coded or fetch from a separate endpoint if needed
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // Possibly redirect to an error page or show a message
      }
    };
    fetchUser();
  }, [navigate]);

  // 2) Handle saving updates
  const handleSave = async () => {
    try {
      // PUT /api/users/:id
      await axios.put(`http://localhost:5000/api/users/${user.id}`, {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update profile. Check console for details.");
    }
  };

  // 3) Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmed) return;

    try {
      // DELETE /api/users/:id
      await axios.delete(`http://localhost:5000/api/users/${user.id}`);
      alert("Account deleted successfully!");
      // Clear local storage or tokens
      localStorage.removeItem("userId");
      // Redirect to homepage or login
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete account. Check console for details.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">My Profile Page</h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl">
                <span role="img" aria-label="User Icon">
                  👤
                </span>
              </div>
              <p className="mt-4 text-gray-700 font-semibold">{user.name}</p>
            </div>
            <div className="flex-1 md:ml-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <input
                  type="text"
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`border rounded-lg p-2 w-full ${
                    isEditing ? "border-green-500" : "border-gray-300"
                  }`}
                />
                {/* Email */}
                <input
                  type="email"
                  placeholder="Email address"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`border rounded-lg p-2 w-full ${
                    isEditing ? "border-green-500" : "border-gray-300"
                  }`}
                />
                {/* Phone Number */}
                <input
                  type="text"
                  placeholder="Phone number"
                  value={user.phone_number}
                  onChange={(e) =>
                    setUser({ ...user, phone_number: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`border rounded-lg p-2 w-full ${
                    isEditing ? "border-green-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div className="flex mt-4">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600 transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8">
            <div className="flex justify-around">
              <div>
                <p className="text-gray-600">Join Date</p>
                <p className="text-gray-800 font-bold">
                  {user.created_at ? user.created_at.substring(0, 10) : ""}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Number of Rentals</p>
                <p className="text-gray-800 font-bold">{user.rentals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
          >
            Delete my account
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
