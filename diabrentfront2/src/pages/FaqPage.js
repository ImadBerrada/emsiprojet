import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqData = [
  {
    question: 'How do I make a booking?',
    answer:
      'To make a booking, log in to your account, browse the available options, and select the one you prefer. Click "Book Now" and follow the instructions to confirm your booking.',
  },
  {
    question: 'How do I update my account information?',
    answer:
      'Go to the Profile section under Account Settings. You can update your name, email address, and phone number. Don’t forget to click "Save" to confirm the changes.',
  },
  {
    question: 'How can I recover my account if I forget my password?',
    answer:
      'Click on "Forgot Password" on the login page. Enter your registered email address, and we’ll send you instructions to reset your password.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We currently support cash payments upon delivery/pickup and credit card payments (Visa, Mastercard, etc.). More payment options may be available based on your region.',
  },
  {
    question: 'Can I cancel or modify a booking?',
    answer:
      'Yes, you can cancel or modify your booking within the allowed timeframe. Go to My Bookings in your account, select the booking, and choose "Cancel" or "Modify." Cancellation policies may apply.',
  },
  {
    question: 'How do I contact customer support?',
    answer:
      'You can reach us through the Contact Support option in the app or website. Fill out the contact form, or use the live chat for immediate assistance.',
  },
  {
    question: 'How do I delete my account?',
    answer:
      'If you wish to delete your account, go to the My Profile section and scroll down to the "Delete My Account" button. Note that this action is irreversible.',
  },
  {
    question: 'Is my personal information secure?',
    answer:
      'Yes, we use advanced encryption and security measures to protect your data. For more details, read our Privacy Policy.',
  },
  {
    question: 'What is the refund policy?',
    answer:
      'Refunds depend on the specific service or product you booked. Please review our Terms & Conditions or contact support for assistance with refunds.',
  },
  {
    question: 'How do I enable or disable notifications?',
    answer:
      'Go to Notification Settings under Preferences, and use the checkboxes to enable or disable specific types of notifications.',
  },
];

// 📌 Single FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-none"
      >
        <span>{question}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

// 📌 Main FAQ Page Component
const FaqPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">Customer Support</h1>
        <h2 className="text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="max-w-3xl mx-auto space-y-4 bg-white p-6 rounded-lg shadow-md">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaqPage;
