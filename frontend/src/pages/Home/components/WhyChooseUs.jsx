// src/components/WhyChooseUs.js
import React from 'react';
import { FaMoneyBillWave, FaNetworkWired, FaLock, FaStar, FaCheckCircle } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
          Why Choose Us?
        </h2>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Competitive Pricing */}
          <div className="flex items-center p-6 bg-white rounded-lg shadow-md text-center">
            <FaMoneyBillWave size={40} className="text-green-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                Get the best rates in the industry, ensuring you save money on every shipment.
              </p>
            </div>
          </div>

          {/* Wide Network */}
          <div className="flex items-center p-6 bg-white rounded-lg shadow-md text-center">
            <FaNetworkWired size={40} className="text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Wide Network</h3>
              <p className="text-gray-600">
                Access a vast network of trusted transporters across Nepal and beyond.
              </p>
            </div>
          </div>

          {/* Secure & Reliable */}
          <div className="flex items-center p-6 bg-white rounded-lg shadow-md text-center">
            <FaLock size={40} className="text-red-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Rest assured with secure transactions and reliable transporters for your goods.
              </p>
            </div>
          </div>

          {/* User Reviews / Trust */}
          <div className="flex items-center p-6 bg-white rounded-lg shadow-md text-center">
            <FaStar size={40} className="text-yellow-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">User Reviews / Trust</h3>
              <p className="text-gray-600">
                Trust built through transparent user reviews and a rating system to ensure quality service.
              </p>
            </div>
          </div>

          {/* Easy Process */}
          <div className="flex items-center p-6 bg-white rounded-lg shadow-md text-center">
            <FaCheckCircle size={40} className="text-teal-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Process</h3>
              <p className="text-gray-600">
                A simple, user-friendly platform to post loads, bid for transport, and track deliveries effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
