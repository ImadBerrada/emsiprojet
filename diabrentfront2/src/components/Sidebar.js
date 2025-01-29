import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard' },
    { name: 'Car Management', path: '/admin/cars' },
    { name: 'User Management', path: '/admin/users' },
    { name: 'Booking Management', path: '/admin/bookings' },
    { name: 'Analytics & Reports', path: '/admin/analytics' },
    { name: 'Customer Emails and Messages', path: '/admin/messages' },
    { name: 'Settings & Preferences', path: '/admin/settings' },
    { name: 'Feedback and Reviews', path: '/admin/feedback' },
  ];

  const navigate = useNavigate();

  const handleDisconnect = () => {
    // Clear authentication data
    localStorage.removeItem('authToken'); // Adjust based on your authentication storage
    sessionStorage.clear();

    // Optionally notify the server (if logout endpoint exists)
    // axios.post('/api/logout').catch(err => console.error('Logout error:', err));

    // Redirect to the login page
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <aside className="bg-[#722637] text-white min-h-screen w-64 p-4 shadow-md flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">Welcome!</h2>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition duration-200 ease-in-out ${
                      isActive
                        ? 'bg-[#933D4E] font-semibold shadow-inner text-white'
                        : 'hover:bg-[#933D4E] hover:shadow-lg hover:text-gray-300'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto space-y-4">
        {/* Home Button */}
        <button
          onClick={handleGoHome}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200"
        >
          Home
        </button>

        {/* Disconnect Button */}
        <button
          onClick={handleDisconnect}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200"
        >
          Disconnect
        </button>

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-300 text-center">
          <p>&copy; {new Date().getFullYear()} Diab Car. All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
