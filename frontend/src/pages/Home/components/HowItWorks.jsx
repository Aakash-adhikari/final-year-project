// src/components/HowItWorks.js
import React from 'react';
import { FaTruck, FaHandHoldingUsd, FaCheckCircle, FaMapMarkedAlt } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1: Post Your Load */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
            <FaTruck size={40} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Post Your Load</h3>
            <p className="text-gray-600">
              Easily upload your load details to find the best transport options.
            </p>
          </div>

          {/* Step 2: Get Bids */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
            <FaHandHoldingUsd size={40} className="text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Get Bids</h3>
            <p className="text-gray-600">
              Receive bids from verified transporters and choose the best deal.
            </p>
          </div>

          {/* Step 3: Choose Your Transporter */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
            <FaCheckCircle size={40} className="text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Choose Your Transporter</h3>
            <p className="text-gray-600">
              Select the transporter that suits your needs based on reviews and bids.
            </p>
          </div>

          {/* Step 4: Track & Deliver */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
            <FaMapMarkedAlt size={40} className="text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track & Deliver</h3>
            <p className="text-gray-600">
              Track your goods in real-time and ensure safe and timely delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
