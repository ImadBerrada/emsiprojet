import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import driveImage from "../assets/drive.png"; // Correct image path

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    setErrorMessage("");
    setLoading(true);

    try {
      // Adjust the endpoint if needed
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (response.data.success) {
        // Save the entire user object
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Save userId (helps ProfilePage fetch user details, etc.)
        localStorage.setItem("userId", response.data.user.id);

        // Check if the user is an admin
        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        } else {
          // Redirect all other users to /profile
          navigate("/profile");
        }
      } else {
        setErrorMessage(response.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome back!</h1>
          <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
              <Link
                to="/forgot-password"
                className="absolute right-2 top-3 text-sm text-green-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

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

            {/* Remember Me */}
            <label className="flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-500 rounded"
              />
              <span>Remember me</span>
            </label>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition text-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 text-center text-gray-500">or</div>

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

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-500 hover:underline">
              Sign Up
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

export default LoginPage;
