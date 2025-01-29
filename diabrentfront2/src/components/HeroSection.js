import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import heroImage from '../assets/hero-image.png'; // Replace with the actual image path
import SearchForm from './SearchForm'; // Import the SearchForm component

const HeroSection = () => {
  return (
    <section className="relative h-[700px] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
      {/* Wave Shape at the Top */}
      <div className="absolute top-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ transform: 'rotate(0deg)' }}
        >
          <path
            fill="#8B0000" // Brown color
            fillOpacity="0.9" // Adjust transparency
            d="M0,64L48,106.7C96,149,192,235,288,240C384,245,480,171,576,138.7C672,107,768,117,864,122.7C960,128,1056,128,1152,122.7C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-16 text-white">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Looking for the Perfect Car? Find <br />
          the Best Car for Your Journey.
        </h1>
        <ul className="mb-6 space-y-2 text-lg">
          <li>Affordable rates</li>
          <li>Premium services</li>
          <li>24/7 Roadside assistance</li>
        </ul>
        {/* Navigate to Available Cars */}
        <Link
          to="/available-cars"
          className="flex items-center px-6 py-3 bg-white text-black font-medium rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          <span className="mr-2">🚗</span> View Available Cars
        </Link>
      </div>

      {/* Search Form */}
      <div className="absolute bottom-[-80px] w-full px-6">
        <SearchForm />
      </div>
    </section>
  );
};

export default HeroSection;
