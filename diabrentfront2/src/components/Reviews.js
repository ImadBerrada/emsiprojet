import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      name: 'Maya Trelock',
      date: '20.10.2024',
      rating: 5,
      review: 'Best place ever!! Easy process and clean cars!',
    },
    {
      name: 'John Doe',
      date: '15.10.2024',
      rating: 5,
      review: 'Amazing service! Highly recommended.',
    },
    {
      name: 'Alice Smith',
      date: '12.10.2024',
      rating: 5,
      review: 'Great cars and excellent customer support!',
    },
  ];

  return (
    <section className="bg-white py-10">
      <h2 className="text-2xl font-bold text-center mb-6">What our happy clients say</h2>
      <div className="flex overflow-x-auto space-x-4 px-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="min-w-[250px] border rounded-lg shadow-lg p-4 bg-white flex-shrink-0"
          >
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">⭐️⭐️⭐️⭐️⭐️</span>
            </div>
            <p className="font-semibold">{review.review}</p>
            <div className="text-sm text-gray-500 mt-2">
              {review.name} - {review.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;