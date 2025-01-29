import React from 'react';

const Statistics = () => {
  const stats = [
    { label: 'Locations Across Morocco', value: '20+' },
    { label: 'Cars Available', value: '500+' },
    { label: 'Vehicle Categories', value: '10+' },
    { label: 'Happy Customers', value: '15,000+' },
    { label: 'Rentals Per Day', value: '200+' },
    { label: 'Years of Excellence', value: '10+' },
  ];

  return (
    <section className="bg-[#722637] text-white py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Our Numbers Speak for Themselves</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#6b2032] rounded-lg py-6 shadow-lg"
          >
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-center mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;