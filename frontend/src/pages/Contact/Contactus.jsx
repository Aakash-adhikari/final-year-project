import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill out all fields');
      return;
    }

    // Reset error if form is valid
    setError(null);

    // Simulate form submission (you can integrate with an API or email service here)
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="w-full px-6 py-16 lg:px-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-screen-md mx-auto">
            Have questions or need more information about how SAT can help your business? Reach out to us, and we’ll get back to you as soon as possible.
          </p>
        </section>

        {/* Centered Form Section */}
        <section className="flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-lg font-semibold text-gray-800 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  placeholder="Enter subject"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-800 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                  placeholder="Enter your message"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 font-semibold text-center">{error}</div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-600 text-white font-bold text-xl rounded-lg hover:bg-yellow-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-8 text-center text-green-600 font-semibold">
                Thank you for contacting us! We'll get back to you shortly.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
