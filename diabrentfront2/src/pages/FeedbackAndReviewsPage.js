import React from 'react';
import Sidebar from '../components/Sidebar';
import { FaStar, FaRegStar, FaEllipsisV, FaTrash } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    rating: 5,
    title: 'Best place ever!!',
    body: 'Easy process and clean cars!',
    reviewer: 'maya trelock',
    date: '20.10.2024',
  },
  {
    id: 2,
    rating: 2,
    title: 'not good',
    body: 'slow',
    reviewer: 'the shithead',
    date: '11.2.2024',
  },
  {
    id: 3,
    rating: 1,
    title: 'Review title',
    body: 'Review body',
    reviewer: 'Reviewer name',
    date: 'Date',
  },
  { id: 4, rating: 1, title: 'Review title', body: 'Review body', reviewer: 'Reviewer name', date: 'Date' },
  { id: 5, rating: 1, title: 'Review title', body: 'Review body', reviewer: 'Reviewer name', date: 'Date' },
  { id: 6, rating: 1, title: 'Review title', body: 'Review body', reviewer: 'Reviewer name', date: 'Date' },
  { id: 7, rating: 1, title: 'Review title', body: 'Review body', reviewer: 'Reviewer name', date: 'Date' },
  { id: 8, rating: 1, title: 'Review title', body: 'Review body', reviewer: 'Reviewer name', date: 'Date' },
];

// Function to render star ratings
const renderStars = (rating) => {
  const totalStars = 5;
  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    stars.push(i < rating ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-gray-400" />);
  }
  return <div className="flex">{stars}</div>;
};

const FeedbackAndReviewsPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Feedback and Reviews</h1>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-white shadow-md rounded-lg">
              {/* Stars and Actions */}
              <div className="flex justify-between items-center mb-4">
                {renderStars(review.rating)}
                <div className="flex space-x-2">
                  <FaEllipsisV className="text-gray-400 cursor-pointer hover:text-gray-600" />
                  <FaTrash className="text-red-500 cursor-pointer hover:text-red-600" />
                </div>
              </div>

              {/* Review Content */}
              <h3 className="text-lg font-semibold mb-1">{review.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{review.body}</p>

              {/* Reviewer Details */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <img
                  src={`https://i.pravatar.cc/40?u=${review.reviewer}`} // Random avatars
                  alt={review.reviewer}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p>{review.reviewer}</p>
                  <p>{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndReviewsPage;
