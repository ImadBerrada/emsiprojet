import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import CountUp from 'react-countup';
import Modal from '../components/Modal';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsResponse, reviewsResponse] = await Promise.all([
          axios.get(`${baseURL}/cars`),
          axios.get(`${baseURL}/reviews`),
        ]);

        setCars(carsResponse.data.cars || []);
        setReviews(reviewsResponse.data.reviews || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  const stats = [
    { number: 20, suffix: '+', text: 'Locations Across Morocco' },
    { number: 500, suffix: '+', text: 'Cars Available' },
    { number: 10, suffix: '+', text: 'Vehicle Categories' },
    { number: 15000, suffix: '+', text: 'Happy Customers', separator: ',' },
    { number: 200, suffix: '+', text: 'Rentals Per Day' },
    { number: 10, suffix: '+', text: 'Years of Excellence' },
  ];

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="pt-[80px] flex-1">
        <section id="hero-section" className="mb-16">
          <HeroSection />
        </section>

        <section id="car-cards" className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Most Searched Vehicles
            </h2>

            {loading && (
              <div className="flex justify-center items-center py-8 text-gray-600">
                <FaSpinner className="animate-spin mr-3" />
                Loading cars...
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 py-8">{error}</div>
            )}

            {!loading && !error && cars.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-0">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={car.image || 'https://via.placeholder.com/300x200'}
                        alt={car.name}
                        className="h-48 w-full object-cover"
                        onError={(e) =>
                          (e.target.src = 'https://via.placeholder.com/300x200')
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                    </div>
                    <div className="p-4 bg-[#6D1C30] text-white">
                      <h2 className="text-lg font-bold">{car.name}</h2>
                      <p className="text-sm">{car.description || car.model}</p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="font-semibold">{car.price_per_day} DH/Day</p>
                        <button
                          className="text-sm bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition-all focus:outline-none"
                          onClick={() => setSelectedCar(car)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && cars.length === 0 && (
              <div className="text-center text-gray-600 py-8">
                No cars available at the moment.
              </div>
            )}
          </div>
        </section>

        <section id="reviews" className="bg-gradient-to-b from-gray-50 to-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Client Reviews
            </h2>

            {loading && (
              <div className="flex justify-center items-center py-8 text-gray-600">
                <FaSpinner className="animate-spin mr-3" />
                Loading reviews...
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 py-8">{error}</div>
            )}

            {!loading && !error && reviews.length > 0 && <Reviews reviews={reviews} />}

            {!loading && !error && reviews.length === 0 && (
              <div className="text-center text-gray-600 py-8">
                No reviews available at the moment.
              </div>
            )}
          </div>
        </section>

        <section className="relative bg-[#6D1C30] py-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
            <svg
              className="relative block w-full h-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="#FFFFFF"
                fillOpacity="1"
                d="M0,256L48,224C96,192,192,128,288,133.3C384,139,480,213,576,213.3C672,213,768,139,864,128C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-denim-3.png')] opacity-20 pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-800 inline-block px-8 py-3 rounded-md text-white text-xl font-semibold shadow-lg">
                Our Numbers Speak for Themselves
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center px-4 sm:px-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#732534] rounded-md p-6 text-white shadow-lg transform transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <p className="text-3xl font-extrabold mb-2">
                    <CountUp
                      start={0}
                      end={stat.number}
                      duration={2}
                      separator={stat.separator || ''}
                      suffix={stat.suffix || ''}
                    />
                  </p>
                  <p className="text-sm font-medium">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {selectedCar && (
        <Modal onClose={() => setSelectedCar(null)}>
          <h2 className="text-xl font-bold mb-4">{selectedCar.name}</h2>
          <p><strong>Price Per Day:</strong> {selectedCar.price_per_day} DH</p>
          <p><strong>Model:</strong> {selectedCar.model}</p>
          <p><strong>Year:</strong> {selectedCar.year || 'N/A'}</p>
          <p><strong>Description:</strong> {selectedCar.description}</p>
          <img
            src={selectedCar.image || 'https://via.placeholder.com/300x200'}
            alt={selectedCar.name}
            className="mt-4 w-full h-auto object-cover rounded"
          />
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all focus:outline-none"
            onClick={() => navigate('/available-cars')}
          >
            View Available Cars
          </button>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
