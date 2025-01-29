import axios from "axios";

// Base API URL (adjust if your server runs on another port or has a different path)
const BASE_URL = "http://localhost:5000/api";

// Create a reusable Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function for handling API errors
const handleRequestError = (error) => {
  console.error("API Request Error:", error.message);
  if (error.response) {
    // The server responded with an error status code
    throw new Error(error.response.data.message || "Something went wrong!");
  } else if (error.request) {
    // Request was made, but no response received
    throw new Error("No response from the server. Please try again later.");
  } else {
    // Something went wrong in setting up the request
    throw new Error("Error setting up the request. Please try again.");
  }
};

// Exported API methods
const API = {
  // -----------------------------
  //        TEST CONNECTION
  // -----------------------------
  testBackend: async () => {
    try {
      const response = await axiosInstance.get("/test");
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  // -----------------------------
  //           CARS
  // -----------------------------
  getCars: async () => {
    try {
      const response = await axiosInstance.get("/cars");
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  getCarById: async (id) => {
    try {
      const response = await axiosInstance.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  addCar: async (data) => {
    try {
      const response = await axiosInstance.post("/cars", data);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  updateCar: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/cars/${id}`, data);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  deleteCar: async (id) => {
    try {
      const response = await axiosInstance.delete(`/cars/${id}`);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  // Fetch Cars with Filters (e.g., search/sort)
  getFilteredCars: async (filters) => {
    try {
      const response = await axiosInstance.get("/cars", {
        params: filters, // e.g., { type: "SUV", sortBy: "price" }
      });
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  // -----------------------------
  //         BOOKINGS
  // -----------------------------
  createBooking: async (data) => {
    try {
      const response = await axiosInstance.post("/bookings", data);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  // Admin or Global view: get all bookings
  getAllBookings: async () => {
    try {
      const response = await axiosInstance.get("/bookings");
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  // Get all bookings for a specific user (My Bookings)
  getBookingsForUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  updateBooking: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/bookings/${id}`, data);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  // Cancel/Delete a Booking by ID
  cancelBooking: async (id) => {
    try {
      const response = await axiosInstance.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },
};

export default API;
