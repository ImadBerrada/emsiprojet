import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const AdminCarManagementPage = () => {
  const [cars, setCars] = useState([]); // Car list
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [showAddCarForm, setShowAddCarForm] = useState(false); // Add car form visibility
  const [editCarId, setEditCarId] = useState(null); // Car ID being edited
  const [newCar, setNewCar] = useState({
    name: "",
    model: "",
    year: "",
    price: "",
    fuel: "",
    transmission: "",
    location: "",
    seats: "",
    availability: true,
    image: "",
  });

  const baseURL = "http://localhost:5000"; // Backend base URL

  // Fetch all cars from the backend
  const fetchCars = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${baseURL}/api/cars`);
      setCars(response.data.cars);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to load car data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewCar({ ...newCar, image: files[0] }); // Handle file input
    } else if (name === "availability") {
      setNewCar({ ...newCar, availability: value === "true" }); // Convert to boolean
    } else {
      setNewCar({ ...newCar, [name]: value });
    }
  };

  // Add or Edit Car
  const handleAddOrEditCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newCar).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      if (editCarId) {
        await axios.put(`${baseURL}/api/cars/${editCarId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditCarId(null);
      } else {
        await axios.post(`${baseURL}/api/cars`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setShowAddCarForm(false);
      setNewCar({
        name: "",
        model: "",
        year: "",
        price: "",
        fuel: "",
        transmission: "",
        location: "",
        seats: "",
        availability: true,
        image: "",
      });
      fetchCars(); // Refresh car list
    } catch (err) {
      console.error("Error saving car:", err.message);
      setError("Failed to save car. Please try again.");
    }
  };

  // Delete a car
  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.error("Error deleting car:", err.message);
      setError("Failed to delete car. Please try again.");
    }
  };

  // Edit Car
  const handleEditCar = (car) => {
    setEditCarId(car.id);
    setNewCar({
      name: car.name,
      model: car.model,
      year: car.year,
      price: car.price,
      fuel: car.fuel,
      transmission: car.transmission,
      location: car.location,
      seats: car.seats,
      availability: car.availability,
      image: null, // Keep image handling separate
    });
    setShowAddCarForm(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#6D1C30]">Car Management</h1>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            onClick={() => {
              setShowAddCarForm(true);
              setEditCarId(null);
              setNewCar({
                name: "",
                model: "",
                year: "",
                price: "",
                fuel: "",
                transmission: "",
                location: "",
                seats: "",
                availability: true,
                image: "",
              });
            }}
          >
            + Add New Car
          </button>
        </div>

        {/* Add or Edit Car Form */}
        {showAddCarForm && (
          <form
            onSubmit={handleAddOrEditCar}
            className="bg-white p-6 shadow-lg rounded-lg mb-6"
            encType="multipart/form-data"
          >
            <h2 className="text-2xl font-bold mb-4">
              {editCarId ? "Edit Car" : "Add New Car"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Car Name" onChange={handleInputChange} value={newCar.name} required className="p-2 border rounded" />
              <input type="text" name="model" placeholder="Model" onChange={handleInputChange} value={newCar.model} required className="p-2 border rounded" />
              <input type="number" name="year" placeholder="Year" onChange={handleInputChange} value={newCar.year} required className="p-2 border rounded" />
              <input type="number" name="price" placeholder="Price" onChange={handleInputChange} value={newCar.price} required className="p-2 border rounded" />
              <input type="text" name="location" placeholder="Location" onChange={handleInputChange} value={newCar.location} required className="p-2 border rounded" />
              <select name="transmission" onChange={handleInputChange} value={newCar.transmission} required className="p-2 border rounded">
                <option value="" disabled>Select Transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
              <select name="fuel" onChange={handleInputChange} value={newCar.fuel} required className="p-2 border rounded">
                <option value="" disabled>Select Fuel Type</option>
                <option value="diesel">Diesel</option>
                <option value="petrol">Petrol</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <select name="seats" onChange={handleInputChange} value={newCar.seats} required className="p-2 border rounded">
                <option value="" disabled>Select Seats</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <select name="availability" onChange={handleInputChange} value={newCar.availability} className="p-2 border rounded" required>
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </select>
              <input type="file" name="image" accept="image/*" onChange={handleInputChange} className="p-2 border rounded" />
            </div>
            <div className="mt-4">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                {editCarId ? "Save Changes" : "Add Car"}
              </button>
              <button type="button" onClick={() => setShowAddCarForm(false)} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Loading/Error */}
        {loading && <p className="text-center">Loading car data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Car Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover"
                onError={(e) => (e.target.src = "https://via.placeholder.com/300x200")}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p>{car.model}</p>
                <p>{car.location}</p>
                <div className="mt-2 flex justify-between">
                  <button onClick={() => handleEditCar(car)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteCar(car.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminCarManagementPage;
