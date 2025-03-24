// src/components/CTASection.js
import React from 'react';

const CTASection = () => {
  return (
    <section className="py-20 bg-teal-600 text-white text-center">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Ship or Become a Transporter?
        </h2>
        <p className="text-lg mb-8">
          Whether you're looking to ship your goods or become part of our network of trusted transporters, we make it easy to get started. Join us today!
        </p>
        
        <div className="flex justify-center gap-6">
          {/* Get Started Button */}
          <a href="/get-started" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out">
            Get Started
          </a>
          
          {/* Become a Transporter Button */}
          <a href="/create-account" className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out">
            Become a Transporter
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
