import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import assets
import heroImage from '../assets/car2.png'; // Ensure the correct path to the hero image

const ContactUsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute top-0 w-full">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              fill="#8B0000"
              fillOpacity="0.9"
              d="M0,64L48,106.7C96,149,192,235,288,240C384,245,480,171,576,138.7C672,107,768,117,864,122.7C960,128,1056,128,1152,122.7C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">Get in Touch</h1>
          <p className="text-lg mb-6 animate-fadeIn delay-200">We’re here to help you with all your queries.</p>
          <a
            href="#contact-form"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg animate-bounce"
          >
            Contact Us Now
          </a>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Morocco</h2>
          <div className="flex flex-col items-center space-y-4 text-gray-700">
            <p className="flex items-center">📍 356, Boulevard Zerktouni - Casablanca</p>
            <p className="flex items-center">📞 05 22 26 03 05</p>
            <p className="flex items-center">📞 05 22 26 03 61</p>
            <p className="flex items-center">📧 diabcar@gmail.com</p>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section id="contact-form" className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 hover:shadow-md"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 hover:shadow-md"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 hover:shadow-md"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 hover:shadow-md"
            />
            <textarea
              placeholder="Your Message"
              className="border rounded-lg p-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 hover:shadow-md"
            ></textarea>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>
                Agree to our <a href="#" className="text-blue-500">Terms and Privacy Policy</a>
              </span>
            </label>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6">Our Location</h3>
          <iframe
            src="https://maps.google.com/maps?q=Casablanca,%20Morocco&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[400px] rounded-lg border-0 hover:shadow-lg transition-shadow duration-300"
            allowFullScreen=""
            loading="lazy"
            title="Map of Casablanca"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUsPage;
