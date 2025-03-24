import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section 
      className="relative bg-cover bg-center text-white py-20 h-[90vh]" 
      style={{
        backgroundImage: `url('/Images/Homepage/HeroCover.jpg')`,
        // backgroundPosition: 'bottom',  
        backgroundSize: 'cover',       
        backgroundRepeat: 'no-repeat' 
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 h-full">
        <div className="grid md:grid-cols-2 gap-8 items-center h-full">
          <div>
            {/* Add margin-top to push this content down */}
            <h1 className="text-4xl font-extrabold mb-4 mt-12">
              Connecting Nepal’s Shippers & Transporters
            </h1>
            <p className="text-xl text-gray-200 mb-6 mt-4">
              Find the best rates and secure transport for your goods, whether by land or air.
            </p>

            <div className="flex space-x-4 mt-6">
              <Link
                to="/get-started"
                className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
              >
                Get Started
              </Link>
              <Link
                to="/create-account"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Post Your Load
              </Link>
            </div>
          </div> 
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
