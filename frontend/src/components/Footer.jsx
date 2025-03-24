// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-gray-400 mb-4">
              We are a company dedicated to providing quality services and solutions. Our mission is to deliver the best user experience for everyone.
            </p>
            <Link to="/about" className="text-blue-500 hover:underline">
              Learn more
            </Link>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* User Accounts Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">User Accounts</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/become-contributor" className="text-gray-400 hover:text-white">
                  Become a Contributor
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-400 hover:text-white">
                  Manage Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-gray-400">Email: contact@company.com</p>
              </li>
              <li>
                <p className="text-gray-400">Phone:  +977 9812345678</p>
              </li>
              <li>
                <p className="text-gray-400">Address: Kathmandu, Nepal</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links and Legal Section */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center flex-wrap space-y-4 md:space-y-0 md:flex-row">
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="hover:text-white">
                Terms & Conditions
              </Link>
              <Link to="/refund-policy" className="hover:text-white">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Footer Credits */}
          <div className="mt-4 text-center text-gray-400 text-sm">
  <p>© 2025 OpenFreight Network. All Rights Reserved.</p>
  <p>Designed by Aakash Adhikari</p>
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
