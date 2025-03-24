import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi'; 

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src="/path-to-your-logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Navigation Section (Centered) */}
        <nav className="flex-1 flex justify-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
        </nav>

        {/* User Actions Section */}
        <div className="flex items-center space-x-4">
          {/* Login Button */}
          <Link to="/login">
            <button className="bg-transparent text-gray-700 hover:text-blue-600 flex items-center">
              <FiUser className="text-2xl" />
              <span className="ml-2">Login</span>
            </button>
          </Link>

          {/* Become a Transporter Button */}
          <Link to="/create-account">
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
             Create account
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
