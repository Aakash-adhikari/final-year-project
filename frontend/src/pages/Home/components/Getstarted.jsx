import React from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaBriefcase, FaCheckCircle } from 'react-icons/fa'; 
import Header from '../../../components/Header'; 
import Footer from '../../../components/Footer'; 

const GetStarted = () => {
  return (
    <div>
      {/* Header Component */}
      <Header />

{/* Hero Section */}
<section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-38 relative">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Get Started with Our Platform</h1>
          <p className="text-lg mb-6">
            Whether you are a shipper or a transporter, we make it easy to connect and get work done efficiently.
          </p>

          {/* Grid for Shippers and Transporters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Shippers */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <FaBriefcase className="text-4xl text-blue-600" />
                <h3 className="text-2xl font-semibold text-gray-800">For Shippers</h3>
              </div>
              <p className="text-lg text-gray-600">
                As a shipper, you can easily post your load and find the best transporters to handle it. Simply provide your load details, compare bids, and choose the best transporter.
              </p>
              <Link
                to="/create-account"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform hover:scale-105"
              >
                Post Your Load
              </Link>
            </div>

            {/* For Transporters */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <FaTruck className="text-4xl text-teal-600" />
                <h3 className="text-2xl font-semibold text-gray-800">For Transporters</h3>
              </div>
              <p className="text-lg text-gray-600">
                As a transporter, you can browse available loads and submit bids for jobs that fit your capacity. Review the load details, provide an estimate, and wait for approval.
              </p>
              <Link
                to="/browse-loads"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-transform hover:scale-105"
              >
                Browse Loads
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <FaCheckCircle className="text-4xl text-blue-600 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800">Easy Load Posting</h3>
              <p className="text-gray-600">
                Effortlessly post your load with all the relevant details. The platform makes it simple and fast.
              </p>
            </div>
            <div className="text-center space-y-4">
              <FaCheckCircle className="text-4xl text-teal-600 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800">Transparent Pricing</h3>
              <p className="text-gray-600">
                Compare bids from multiple transporters and choose the best deal for your load.
              </p>
            </div>
            <div className="text-center space-y-4">
              <FaCheckCircle className="text-4xl text-blue-600 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800">Secure Payments</h3>
              <p className="text-gray-600">
                Our secure payment system ensures that your transactions are safe, transparent, and reliable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center max-w-md">
              <p className="text-lg text-gray-600 mb-4">
                "This platform helped me find the perfect transporter for my goods. Easy to use and the customer service was amazing!"
              </p>
              <p className="font-semibold text-gray-800">John Doe</p>
              <p className="text-gray-500">Shipper</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center max-w-md">
              <p className="text-lg text-gray-600 mb-4">
                "I found great loads to transport on this platform. The process was quick, and I could track everything easily!"
              </p>
              <p className="font-semibold text-gray-800">Jane Smith</p>
              <p className="text-gray-500">Transporter</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">How do I post a load?</h3>
              <p className="text-gray-600">
                Simply sign up, provide the load details, and post it to the platform. Transporters will then bid on your load.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">How do I browse loads?</h3>
              <p className="text-gray-600">
                As a transporter, you can browse loads posted by shippers and place bids on jobs that fit your capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default GetStarted;
