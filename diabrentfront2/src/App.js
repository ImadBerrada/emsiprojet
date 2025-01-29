import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import HomePage from "./pages/HomePage";
import TestConnectionPage from "./pages/TestConnectionPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminBookingManagementPage from "./pages/AdminBookingManagementPage";
import AdminCarManagementPage from "./pages/AdminCarManagementPage";
import AdminCustomerMessagesPage from "./pages/AdminCustomerMessagesPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminTestPage from "./pages/AdminTestPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import AvailableCarsPage from "./pages/AvailableCarsPage";
import ContactUsPage from "./pages/ContactUsPage";
import FeedbackAndReviewsPage from "./pages/FeedbackAndReviewsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import FaqPage from './pages/FaqPage';
import MyBookingsPage from './pages/MyBookingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/test-connection" element={<TestConnectionPage />} />
        <Route path="/available-cars" element={<AvailableCarsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/feedback-reviews" element={<FeedbackAndReviewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bookings" element={<MyBookingsPage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/cars" element={<AdminCarManagementPage />} />
        <Route path="/admin/bookings" element={<AdminBookingManagementPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/admin/users" element={<AdminUserManagementPage />} />
        <Route path="/admin/messages" element={<AdminCustomerMessagesPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route path="/admin/test" element={<AdminTestPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </Router>
  );
};

export default App;
