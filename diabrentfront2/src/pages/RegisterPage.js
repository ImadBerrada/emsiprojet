import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import driveImage from "../assets/drive.png"; // Correct image path

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "", // Match backend's phone_number field
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const payload = { ...formData, role: "customer" }; // Add 'role' as 'customer' by default
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", // Adjust URL to your backend endpoint
        payload
      );

      if (response.data.success) {
        setSuccessMessage("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 2000);
      } else {
        setErrorMessage(response.data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left Section - Registration Form */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Get Started Now</h1>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
              {errorMessage}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />

            {/* Mobile Number */}
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />

            {/* Agreement */}
            <label className="flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-500 rounded"
                required
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-green-500 hover:underline">
                  terms & policy
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition text-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 text-center text-gray-500">Or</div>

          {/* Sign In with Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.google.com/images/icons/product/googlelogo-32.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </button>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-600">
            Have an account?{" "}
            <Link to="/login" className="text-green-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        className="hidden lg:block flex-1 bg-cover bg-center relative rounded-tl-[80px] rounded-bl-[80px]"
        style={{
          backgroundImage: `url(${driveImage})`,
        }}
      >
        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black opacity-30 rounded-tl-[80px] rounded-bl-[80px]"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
