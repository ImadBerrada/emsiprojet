import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCars: 0,
    activeUsers: 0,
    carsRented: 0,
  });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch statistics for admin dashboard
        const statsResponse = await axios.get(
          "http://localhost:5000/api/admin/dashboard"
        );

        setDashboardData({
          totalCars: statsResponse.data.totalCars,
          activeUsers: statsResponse.data.activeUsers,
          carsRented: statsResponse.data.carsRented,
        });

        // Fetch cars for the dashboard
        const carsResponse = await axios.get("http://localhost:5000/api/cars");
        setCars(carsResponse.data.cars);
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Buttons */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 mr-2">
              Add New Car
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
              View All Users
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Cars",
              value: dashboardData.totalCars,
              bg: "bg-gray-800",
            },
            {
              label: "Active Users",
              value: dashboardData.activeUsers,
              bg: "bg-gray-700",
            },
            {
              label: "Cars Rented",
              value: dashboardData.carsRented,
              bg: "bg-gray-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} text-white p-4 rounded-lg shadow`}
            >
              <h2 className="text-lg">{stat.label}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Car Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
  src={car.image || "https://via.placeholder.com/150"} // Utilise le champ `image` retourné par le backend
  alt={car.name}
  className="h-40 w-full object-cover"
  onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Ajoutez un fallback si l'image ne charge pas
/>

              <div className="p-4 bg-[#6D1C30] text-white">
                <h2 className="text-lg font-bold">{car.name}</h2>
                <p className="text-sm">{car.description || car.model}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-semibold">{car.price_per_day} DH/Day</p>
                  <button className="text-sm bg-green-500 px-3 py-1 rounded hover:bg-green-600">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
