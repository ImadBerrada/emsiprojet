import React from 'react';
import citroenImage from '../assets/image 60.png'; // Import Citroën image

const CarCard = ({ car }) => {
  // Fallback to default image if no image is provided
  const carImage = car.image || citroenImage;

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-white transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
      {/* Car Image */}
      <div className="bg-gray-100 p-4 flex justify-center items-center">
        <img
          src={carImage} // Use the car image or fallback to default
          alt={car.name || 'Car Image'}
          className="w-full h-auto object-contain max-h-44 rounded-t-2xl"
        />
      </div>

      {/* Car Details */}
      <div className="bg-[#722637] text-white p-6">
        <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
        <p className="text-sm mb-4">{car.location}</p>
        <ul className="space-y-1 text-sm">
          <li className="flex items-center">
            <span className="mr-2">📅</span> Year: {car.year}
          </li>
          <li className="flex items-center">
            <span className="mr-2">⚙️</span> Transmission: {car.transmission}
          </li>
          <li className="flex items-center">
            <span className="mr-2">⛽</span> Fuel: {car.fuel}
          </li>
          <li className="flex items-center">
            <span className="mr-2">💺</span> Seats: {car.seats}
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center bg-white p-4 border-t border-gray-200">
        <span className="text-lg font-bold text-gray-800">{car.price} DH/Day</span>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;