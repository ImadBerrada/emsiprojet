import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const AdminCarManagementPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch the cars from the backend (mocked for now)
    const fetchCars = async () => {
      const mockCars = [
        {
          id: 1,
          name: 'MG 3',
          model: '1.5 L Confort Plus BVA',
          location: 'Casablanca, Morocco',
          year: 2024,
          transmission: 'Automatic',
          fuelType: 'Diesel',
          seatingCapacity: 5,
          pricePerDay: 350,
          image: 'https://via.placeholder.com/150',
        },
      ];
      setCars(mockCars);
    };
    fetchCars();
  }, []);

  const handleAddCar = () => {
    console.log('Add car functionality to be implemented');
  };

  const handleEditCar = (id) => {
    console.log(`Edit car with ID: ${id}`);
  };

  const handleDeleteCar = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    console.log(`Delete car with ID: ${id}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Car Management</h1>

        {/* Top Buttons */}
        <div className="flex justify-end space-x-4 mb-4">
          <button
            onClick={handleAddCar}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Car
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            All Cars
          </button>
        </div>

        {/* Filter Section */}
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-center text-lg font-bold mb-4">Filter by:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="filter" value="carType" />
              <span>Car Type</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="filter" value="model" />
              <span>Model</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="filter" value="seatingCapacity" />
              <span>Seating Capacity</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="filter" value="fuelType" />
              <span>Fuel Type</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="filter" value="year" />
              <span>Year</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="filter" value="priceRange" />
              <span>Price Range</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="filter" value="transmission" />
              <span>Transmission</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="filter" value="specialFeatures" />
              <span>Special Features</span>
            </label>
          </div>
        </div>

        {/* Cars List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="border rounded-lg shadow-lg p-4 flex flex-col justify-between"
            >
              <img
                src={car.image}
                alt={car.name}
                className="rounded-lg mb-4 h-40 w-full object-cover"
              />
              <div className="mb-4">
                <h2 className="text-lg font-bold">{car.name}</h2>
                <p className="text-sm text-gray-600">{car.model}</p>
                <p className="text-sm text-gray-600">{car.location}</p>
                <p className="text-sm text-gray-600">Year: {car.year}</p>
                <p className="text-sm text-gray-600">Transmission: {car.transmission}</p>
                <p className="text-sm text-gray-600">Fuel Type: {car.fuelType}</p>
                <p className="text-sm text-gray-600">Seats: {car.seatingCapacity}</p>
                <p className="text-lg font-bold">{car.pricePerDay} DH/Day</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCar(car.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCarManagementPage;
