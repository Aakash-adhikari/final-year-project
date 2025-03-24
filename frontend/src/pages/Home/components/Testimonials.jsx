// src/components/Testimonials.js
import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/Images/Homepage/testimonial-1.avif"
                alt="User 1"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <p className="text-gray-600 mb-4">
              "This platform made it incredibly easy for me to find reliable transporters at great rates. The bidding system is fantastic!"
            </p>
            <div className="flex justify-center mb-4">
              {/* Star Ratings */}
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} size={20} className="text-yellow-400" />
              ))}
            </div>
            <p className="font-semibold text-gray-800">Rajesh K.</p>
            <p className="text-gray-500">Shipper</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/Images/Homepage/testimonial-2.avif"
                alt="User 2"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <p className="text-gray-600 mb-4">
              "As a transporter, this platform helped me find high-quality shipments quickly. The whole process is smooth and transparent."
            </p>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} size={20} className="text-yellow-400" />
              ))}
            </div>
            <p className="font-semibold text-gray-800">Suman P.</p>
            <p className="text-gray-500">Transporter</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/Images/Homepage/testimonial-3.avif"
                alt="User 3"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <p className="text-gray-600 mb-4">
              "We’ve been using this platform for months now, and it’s simplified our logistics. The customer support team is top-notch!"
            </p>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} size={20} className="text-yellow-400" />
              ))}
            </div>
            <p className="font-semibold text-gray-800">Anita R.</p>
            <p className="text-gray-500">Freight Manager</p>
          </div>
        </div>

        {/* Success Stories / Case Studies */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">Success Stories</h3>

          {/* Success Stories Flex Container */}
          <div className="flex justify-center gap-12">
            
            {/* Success Story 1 */}
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-md">
              <img
                src="/Images/Homepage/success-story-1.jpeg"
                alt="Success 1"
                className="w-full h-auto rounded-lg mb-6"
              />
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Transporter Saves 20% in Fuel Costs</h4>
                <p className="text-gray-600">
                  "By optimizing my routes and using reliable transport options through this platform, I was able to cut my fuel costs by 20% in just two months!"
                </p>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-md">
              <img
                src="/Images/Homepage/success-story-2.jpg"
                alt="Success 2"
                className="w-full h-auto rounded-lg mb-6"
              />
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Shipper Boosts Efficiency with Bidding</h4>
                <p className="text-gray-600">
                  "Thanks to the bidding feature, I found the perfect transporter at an unbeatable price. It streamlined my entire shipping process!"
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
