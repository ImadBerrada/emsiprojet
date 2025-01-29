import React, { useState, useEffect } from "react";
import API from "../api/network"; // Import the API helper

const TestConnectionPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await API.testBackend(); // Call the test backend function
        if (response.data.success) {
          setMessage(response.data.message);
        } else {
          setError("Failed to connect to the backend.");
        }
      } catch (err) {
        setError("Error: Unable to connect to the backend.");
        console.error(err.message);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">
          Backend Connection Test
        </h1>
        {message && (
          <div className="p-4 mb-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ {message}
          </div>
        )}
        {error && (
          <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ {error}
          </div>
        )}
        <p className="text-sm text-gray-500 mt-4">
          This page checks if your frontend is successfully connected to the backend.
        </p>
      </div>
    </div>
  );
};

export default TestConnectionPage;
