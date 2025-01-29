import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/diab car logo 1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for Profile Dropdown
  const [user, setUser] = useState(null);

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Diab Car" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul
        className={`md:flex space-x-8 text-gray-700 font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-white shadow-md md:shadow-none ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li className="hover:text-black transition duration-200 px-4 py-2 md:px-0">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-black transition duration-200 px-4 py-2 md:px-0">
          <Link to="/available-cars">Available Cars</Link>
        </li>
        <li className="hover:text-black transition duration-200 px-4 py-2 md:px-0">
          <Link to="/contact-us">Contact Us</Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 hover:text-black transition duration-200"
        >
          ☰
        </button>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Currency Button */}
        <button className="flex items-center px-3 py-1 border rounded-lg text-gray-600 hover:text-black transition duration-200">
          <span className="mr-2">🌐</span> MAD
        </button>

        {/* Profile Dropdown */}
        {user ? (
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center text-gray-800 font-semibold hover:underline"
            >
              <span className="mr-2">👤</span>
              {user.name ? user.name : "My Profile"}
            </button>

            {/* Dropdown Curtain Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b">
                  <h3 className="text-gray-800 font-semibold">Profile Overview</h3>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li>
                      <Link to="/profile" className="block hover:text-gray-900">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/bookings" className="block hover:text-gray-900">
                        My Bookings
                      </Link>
                    </li>
                  </ul>
                </div>

                

                <div className="p-4 border-b">
                  <h3 className="text-gray-800 font-semibold">Customer Support</h3>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li>
                      <Link to="/help-center" className="block hover:text-gray-900">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact-support" className="block hover:text-gray-900">
                        Contact Support
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="p-4">
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-red-600 hover:text-red-800 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
