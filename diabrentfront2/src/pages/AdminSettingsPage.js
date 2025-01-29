import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const AdminSettingsPage = () => {
  const [siteTheme, setSiteTheme] = useState('light'); // Default theme
  const [emailNotifications, setEmailNotifications] = useState(true); // Default notifications

  const handleSaveChanges = () => {
    alert('Settings have been saved!');
  };

  const handleReset = () => {
    setSiteTheme('light');
    setEmailNotifications(true);
    alert('Settings have been reset to default!');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-[#722637]">Settings and Preferences</h1>

        {/* Settings Section */}
        <div className="space-y-6">
          {/* Site Theme Selection */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Site Theme</h2>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="light"
                  checked={siteTheme === 'light'}
                  onChange={() => setSiteTheme('light')}
                  className="mr-2"
                />
                Light
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="dark"
                  checked={siteTheme === 'dark'}
                  onChange={() => setSiteTheme('dark')}
                  className="mr-2"
                />
                Dark
              </label>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="mr-2"
              />
              Enable Email Notifications
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition"
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;