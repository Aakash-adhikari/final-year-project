import React from 'react';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 

const AboutUs = () => {
  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="w-full px-6 py-16 lg:px-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to SAT
          </h1>
          <p className="text-xl text-gray-600 max-w-screen-lg mx-auto">
            SAT is Nepal's premier freight and logistics marketplace, bringing shippers and transporters together to create seamless, efficient, and transparent solutions for your logistics needs.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-24 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Our Mission: Revolutionizing Nepal’s Logistics
          </h2>
          <p className="text-lg text-gray-600 max-w-screen-lg mx-auto">
            At SAT, our mission is simple: make logistics smoother, faster, and more accessible. We connect businesses with trusted transporters, ensuring transparency, reliability, and fair pricing in every transaction.
          </p>
        </section>

        {/* How SAT Works Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">
            How SAT Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Shippers</h3>
              <p className="text-gray-600">
                Find reliable transporters quickly, get transparent quotes, and book with ease. SAT’s platform ensures your shipments are handled with care, saving you time and effort.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Transporters</h3>
              <p className="text-gray-600">
                Grow your business by connecting with a steady stream of shippers. SAT helps transporters maximize efficiency with fair pricing, easy scheduling, and timely payments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Seamless Booking</h3>
              <p className="text-gray-600">
                With SAT’s real-time updates and intuitive booking interface, managing freight has never been easier. Book, track, and manage all your shipments with a few clicks.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-24 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-screen-lg mx-auto mb-8">
            Our values are the foundation of SAT. We prioritize trust, efficiency, and growth for all our partners—empowering businesses and transporters to thrive in the logistics space.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left text-lg text-gray-600 max-w-screen-lg mx-auto">
            <li className="flex items-center mb-4">
              <span className="text-yellow-600 mr-3">🌟</span><span>**Transparency**: No hidden fees, no surprises—just clear pricing every time.</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="text-yellow-600 mr-3">⚡</span><span>**Efficiency**: Faster connections, smoother operations, and smarter logistics.</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="text-yellow-600 mr-3">🤝</span><span>**Trust**: We ensure reliable services and timely payments for all users.</span>
            </li>
            <li className="flex items-center mb-4">
              <span className="text-yellow-600 mr-3">📈</span><span>**Growth**: Empowering both shippers and transporters to scale and succeed.</span>
            </li>
          </ul>
        </section>

        {/* Our Story Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 max-w-screen-lg mx-auto">
            SAT was founded with a vision to simplify Nepal's logistics industry. We identified a gap where businesses struggled to find reliable transporters and transporters lacked access to consistent work. Our platform brings both sides together, creating value and fostering growth for everyone involved.
          </p>
          <p className="text-lg text-gray-600 max-w-screen-lg mx-auto mt-6">
            We’re committed to continuously evolving and improving, bringing innovative solutions to the logistics community and helping businesses of all sizes succeed.
          </p>
        </section>

        {/* Contact Section */}
        <section className="text-center mt-20 mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Get in Touch with SAT
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Have questions or ready to get started with SAT? We're here to help. Reach out today!
          </p>
          <a href="mailto:contact@satmarketplace.com" className="bg-yellow-600 text-white font-bold text-xl py-3 px-8 rounded-full hover:bg-yellow-700 transition-colors duration-300">
            Contact Us
          </a>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
