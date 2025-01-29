import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; // Import icons

const SearchForm = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-lg flex flex-col md:grid md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
      {/* Pick-up Location */}
      <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 col-span-3 md:col-span-1">
        <FaMapMarkerAlt className="text-green-500 mr-2" />
        <input
          type="text"
          placeholder="Pick up location"
          className="w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Pick-up Date & Time */}
      <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 col-span-3 md:col-span-1">
        <FaCalendarAlt className="text-green-500 mr-2" />
        <input
          type="date"
          className="w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Return Date & Time */}
      <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 col-span-3 md:col-span-1">
        <FaCalendarAlt className="text-green-500 mr-2" />
        <input
          type="date"
          className="w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Find a Vehicle Button */}
      <div className="flex justify-center items-center col-span-3 md:col-span-1">
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-green-500 text-white font-medium rounded-md shadow-md hover:bg-green-600 transition duration-200"
        >
          <span className="mr-2">🔍</span> Find a Vehicle
        </button>
      </div>
    </div>
  );
};

export default SearchForm;