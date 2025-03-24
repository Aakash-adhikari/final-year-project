// src/components/FeaturedServices.js
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedServices = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
          Featured Services
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Land Freight */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <img
              src="/Images/Homepage/land-freight.avif"
              alt="Land Freight"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Land Freight</h3>
            <p className="text-gray-600 mb-4">
              Trucks and local transport for deliveries across Nepal, ensuring fast and reliable shipments.
            </p>
            <Link to="/land-freight" className="text-blue-500 hover:underline">
              Learn More
            </Link>
          </div>

          {/* Air Freight */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <img
              src="/Images/Homepage/air-freight.avif" 
              alt="Air Freight"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Air Freight</h3>
            <p className="text-gray-600 mb-4">
              Fast, reliable air cargo services for time-sensitive shipments, delivering globally.
            </p>
            <Link to="/air-freight" className="text-blue-500 hover:underline">
              Learn More
            </Link>
          </div>

          {/* Temperature-Controlled Transport */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <img
              src="/Images/Homepage/temperature-controlled.avif"
              alt="Temperature-Controlled Transport"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Temperature-Controlled Transport</h3>
            <p className="text-gray-600 mb-4">
              Specialized transport for sensitive goods requiring constant temperature control.
            </p>
            <Link to="/temperature-controlled" className="text-blue-500 hover:underline">
              Learn More
            </Link>
          </div>

          {/* Heavy Freight */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <img
              src="/Images/Homepage/heavy-freight.avif" 
              alt="Heavy Freight"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Heavy Freight</h3>
            <p className="text-gray-600 mb-4">
              Reliable transportation for heavy freight, ensuring safe and secure delivery.
            </p>
            <Link to="/heavy-freight" className="text-blue-500 hover:underline">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
