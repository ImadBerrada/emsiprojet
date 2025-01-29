import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";
import API from "../api/network";
import heroImage from "../assets/car2.png";

/********************
 * HeroSection Component
 ********************/
const HeroSection = () => {
  return (
    <div
      className="relative h-64 md:h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Find your perfect car for the perfect price!
        </h1>
        <p className="max-w-2xl mx-auto">
          Search and find your best car rental with a few clicks!
        </p>
      </div>
    </div>
  );
};

/********************
 * SidebarFilters
 ********************/
const SidebarFilters = ({ selectedTypes, onFilter }) => {
  const carTypes = [
    "All",
    "Economy",
    "Compact",
    "Mid-size",
    "Luxury",
    "SUV",
    "Minivan",
  ];

  const handleCheckboxChange = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((item) => item !== type)
      : [...selectedTypes, type];
    onFilter(updatedTypes);
  };

  return (
    <aside className="bg-white rounded-lg shadow-md p-6 w-full lg:w-1/4">
      {/* Map Section */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Show on map</h4>
        <div className="overflow-hidden rounded-lg">
          <iframe
            src="https://maps.google.com/maps?q=Casablanca,%20Morocco&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[200px] rounded-lg border-0"
            allowFullScreen=""
            loading="lazy"
            title="Map of Casablanca"
          ></iframe>
        </div>
      </div>

      {/* Car Type Filter */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Car Type</h4>
        <ul className="space-y-2">
          {carTypes.map((type) => (
            <li key={type}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  className="rounded"
                />
                <span>{type}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* (Optional) Price Range Filter */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Set your price</h4>
        <input type="range" min="0" max="1000" className="w-full" />
        <div className="flex justify-between text-sm mt-2">
          <span>0 MAD</span>
          <span>1000 MAD</span>
        </div>
      </div>

      {/* (Optional) Fuel Type Filter */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Fuel type</h4>
        <ul className="space-y-2">
          {["All", "Hybrid (HEV)", "Electric (EV)", "Diesel", "Gasoline/Petrol"].map(
            (fuel) => (
              <li key={fuel}>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>{fuel}</span>
                </label>
              </li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
};

/********************
 * BookingModal
 * - Disable Confirm Booking button if chosen date range overlaps
 ********************/
const BookingModal = ({ car, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);

  // Helper to check if two date ranges overlap
  const doRangesOverlap = (startA, endA, startB, endB) => {
    return startA <= endB && startB <= endA;
  };

  useEffect(() => {
    // Clear or recalc whenever user changes date
    if (!startDate || !endDate) {
      setTotalPrice(0);
      setError(null);
      return;
    }

    const chosenStart = new Date(startDate);
    const chosenEnd = new Date(endDate);

    if (chosenStart >= chosenEnd) {
      setTotalPrice(0);
      setError("Start date must be before end date.");
      return;
    }

    // Check if user's chosen range overlaps with any ongoing booking
    if (car.bookedRanges && Array.isArray(car.bookedRanges)) {
      const overlap = car.bookedRanges.some((booking) => {
        const bStart = new Date(booking.start_date);
        const bEnd = new Date(booking.end_date);
        return doRangesOverlap(chosenStart, chosenEnd, bStart, bEnd);
      });

      if (overlap) {
        setTotalPrice(0);
        setError("This period is unavailable. Please choose another.");
        return;
      }
    }

    // Otherwise, compute total price
    const days = Math.ceil((chosenEnd - chosenStart) / (1000 * 60 * 60 * 24));
    const price = days > 0 ? days * car.price_per_day : 0;
    setTotalPrice(price);
    setError(null);
  }, [startDate, endDate, car.price_per_day, car.bookedRanges]);

  const handleBooking = async () => {
    // If there's an error or totalPrice <= 0, show an alert & stop
    if (error) {
      alert(error);
      return;
    }
    if (totalPrice <= 0) {
      alert("Please select valid dates for booking.");
      return;
    }

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Please log in to book a car.");
        return;
      }
      const user = JSON.parse(storedUser);

      const payload = {
        user_id: user.id,
        car_id: car.id,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
      };

      const response = await API.createBooking(payload);
      if (response.success) {
        alert("Booking created successfully!");
        onClose();
      } else {
        setError(response.message || "Failed to create booking.");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Book {car.name}</h2>

        <label className="block mb-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <p className="text-lg font-bold mb-2">Total Price: {totalPrice} MAD</p>

        {/* Display an inline error if needed */}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          {/* Disable the Confirm Booking button if there's an error or no valid total price */}
          <button
            onClick={handleBooking}
            disabled={!!error || totalPrice <= 0}
            className={`px-4 py-2 rounded-md text-white ${
              !!error || totalPrice <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

/********************
 * AvailableCarsPage
 ********************/
const AvailableCarsPage = () => {
  // Original data from API
  const [cars, setCars] = useState([]);
  // Filtered & sorted data
  const [filteredCars, setFilteredCars] = useState([]);

  // Car types selected in sidebar
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Bookings
  const [allBookings, setAllBookings] = useState([]);
  // For the booking modal
  const [selectedCar, setSelectedCar] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Pagination & sorting states
  const [totalItems, setTotalItems] = useState(0);
  const [showCount, setShowCount] = useState("20");
  const [sortBy, setSortBy] = useState("Most viewed");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const carsResponse = await API.getCars();
        const bookingsResponse = await API.getAllBookings();

        if (carsResponse.success && bookingsResponse.success) {
          console.log("Cars Data:", carsResponse.cars);
          setCars(carsResponse.cars);
          setFilteredCars(carsResponse.cars);
          setTotalItems(carsResponse.cars.length);
          setAllBookings(bookingsResponse.bookings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /********************
   * 1) Handling Filter (Car Types)
   ********************/
  const handleFilter = (types) => {
    setSelectedTypes(types);
  };

  /********************
   * 2) Apply Filter & Sort
   ********************/
  useEffect(() => {
    // Start with all cars
    let updatedCars = [...cars];

    // Filter by type
    if (!selectedTypes.includes("All") && selectedTypes.length > 0) {
      updatedCars = updatedCars.filter((car) =>
        selectedTypes.includes(car.car_type)
      );
    }

    // Sort
    if (sortBy === "Lowest price") {
      updatedCars.sort((a, b) => a.price_per_day - b.price_per_day);
    } else if (sortBy === "Highest price") {
      updatedCars.sort((a, b) => b.price_per_day - a.price_per_day);
    }
    // "Most viewed" => No specific sorting logic unless you have a "views" property

    // Update states
    setFilteredCars(updatedCars);
    setTotalItems(updatedCars.length);
    // Reset to page 1 whenever filter or sort changes
    setCurrentPage(1);
  }, [cars, selectedTypes, sortBy]);

  /********************
   * 3) Pagination
   ********************/
  const perPage = parseInt(showCount, 10);
  const totalPages = Math.ceil(filteredCars.length / perPage);

  // If currentPage is beyond totalPages (e.g., filtering shrank the list), fix it
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate which cars to show on the current page
  const indexOfLastCar = currentPage * perPage;
  const indexOfFirstCar = indexOfLastCar - perPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  /********************
   * 4) "Show Count" & "Sort By"
   ********************/
  const handleShowCountChange = (e) => {
    setShowCount(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  /**
   * Only gather bookings that are "ongoing" for a car, because we only want
   * to block out those dates, not the entire car.
   */
  const getOngoingBookingsForCar = (carId) => {
    return allBookings.filter(
      (bk) => bk.car_id === carId && bk.status === "ongoing"
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1) Navbar */}
      <Navbar />

      {/* 2) Hero Section */}
      <HeroSection />

      {/* 3) Search Form below hero */}
      <div className="max-w-7xl mx-auto -mt-16 relative z-10 px-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <SearchForm />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 mt-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Our Vehicles</h1>
          <p className="text-gray-600">
            Turning dreams into reality with versatile vehicles.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <SidebarFilters selectedTypes={selectedTypes} onFilter={handleFilter} />

          {/* Cars listing area */}
          <div className="flex-1">
            {/* Top controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <p className="text-gray-500">{totalItems} items found</p>
              <div className="flex items-center space-x-4">
                <div>
                  <label htmlFor="showCount" className="mr-2 font-medium">
                    Show
                  </label>
                  <select
                    id="showCount"
                    name="showCount"
                    value={showCount}
                    onChange={handleShowCountChange}
                    className="border p-1 rounded"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sortBy" className="mr-2 font-medium">
                    Sort by
                  </label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border p-1 rounded"
                  >
                    <option value="Most viewed">Most viewed</option>
                    <option value="Lowest price">Lowest price</option>
                    <option value="Highest price">Highest price</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading or car cards */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {currentCars.map((car) => {
                  /**
                   * We'll always show "Book Now" so that
                   * the user can attempt to book a different date range.
                   * The actual disabling of an overlapping period
                   * occurs in the BookingModal.
                   */
                  return (
                    <div
                      key={car.id}
                      className="bg-white rounded-lg shadow-md flex flex-col sm:flex-row overflow-hidden"
                    >
                      {/* Car image */}
                      <div className="flex-shrink-0">
                        <img
                          src={
                            car.image
                              ? car.image
                              : "https://via.placeholder.com/409x227"
                          }
                          alt={car.name}
                          className="w-[409px] h-[227px] object-cover"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/409x227")
                          }
                        />
                      </div>

                      {/* Car details */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h2 className="text-lg font-bold text-gray-800">
                            {car.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {car.location || "Casablanca, Morocco"}
                          </p>
                          <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                            <span>📅 {car.year || "2024"}</span>
                            <span>⚙️ {car.transmission || "Automatic"}</span>
                            <span>⛽ {car.fuel || "Diesel"}</span>
                            <span>🚗 {car.seats || "5 Seats"}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-lg font-bold text-gray-800">
                            From {car.price_per_day || 350} DH/Day
                          </p>
                          <button
                            onClick={() => {
                              // Only pass ongoing bookings as 'bookedRanges'
                              const bookedRanges = getOngoingBookingsForCar(car.id);
                              setSelectedCar({ ...car, bookedRanges });
                            }}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination controls */}
            <div className="flex justify-center mt-6">
              <nav className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1 ? "bg-gray-300" : "bg-gray-200"
                  }`}
                >
                  Previous
                </button>

                {/* Page number buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages || totalPages === 0
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedCar && (
        <BookingModal
          car={selectedCar} // includes only ongoing .bookedRanges
          onClose={() => setSelectedCar(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default AvailableCarsPage;
