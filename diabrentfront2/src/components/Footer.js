import React from "react";

const Footer = () => {
  /**
   * Handler for the "Access Admin Page" button.
   * Prompts the user for a password. If correct, redirects;
   * otherwise, shows an error alert.
   */
  const handleAdminAccess = () => {
    const password = window.prompt("Enter the Admin Password:");
    if (password === "diab1234car") {
      window.location.href = "/admin/dashboard";
    } else {
      alert("Wrong password. Access denied!");
    }
  };

  return (
    <footer className="bg-[#722637] text-white py-10">
      {/* Footer Grid Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        
        {/* Quick Access Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Access Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Informational Pages */}
        <div>
          <h3 className="text-lg font-bold mb-4">Informational Pages</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/about"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Location Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Our Location</h3>
          <iframe
            title="Map of Casablanca, Morocco"
            src="https://maps.google.com/maps?q=Casablanca,%20Morocco&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-40 rounded-lg border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="mailto:example@example.com"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Buttons Section */}
      <div className="text-center mt-8 space-y-4">
        <button
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Chat with Us
        </button>
        <button
          onClick={handleAdminAccess}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Access Admin Page
        </button>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm text-gray-300">
        © {new Date().getFullYear()} Diab Car. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
