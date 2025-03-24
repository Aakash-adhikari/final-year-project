import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const PostYourLoad = () => {
  const [loadDetails, setLoadDetails] = useState({
    title: '',
    loadType: '',
    weight: '',
    pickupLocation: '',
    destination: '',
    description: '',
    contactInfo: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoadDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loadDetails.title) newErrors.title = 'Title is required.';
    if (!loadDetails.loadType) newErrors.loadType = 'Load type is required.';
    if (!loadDetails.weight || isNaN(loadDetails.weight)) newErrors.weight = 'Valid weight is required.';
    if (!loadDetails.pickupLocation) newErrors.pickupLocation = 'Pickup location is required.';
    if (!loadDetails.destination) newErrors.destination = 'Destination is required.';
    if (!loadDetails.contactInfo) newErrors.contactInfo = 'Contact info is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    if (validateForm()) {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please log in.");

        const response = await axios.post(
          'http://localhost:5001/api/loads/post-loads',
          loadDetails,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        setSuccessMessage(response.data.message || 'Load posted successfully!');
        setLoadDetails({
          title: '',
          loadType: '',
          weight: '',
          pickupLocation: '',
          destination: '',
          description: '',
          contactInfo: '',
        });
      } catch (error) {
        console.error("Post load error:", error.response || error);
        setErrorMessage(error.response?.data?.msg || error.message || 'Failed to connect to the server.');
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          {successMessage && <p className="text-green-600 mt-4 text-center">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 mt-4 text-center">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">Load Title</label>
              <input
                type="text"
                name="title"
                value={loadDetails.title}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., Electronics from Kathmandu to Pokhara"
                aria-describedby="titleError"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1" id="titleError">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">Load Type</label>
              <select
                name="loadType"
                value={loadDetails.loadType}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-describedby="loadTypeError"
              >
                <option value="">Select Load Type</option>
                <option value="General Freight">General Freight</option>
                <option value="Heavy Equipment">Heavy Equipment</option>
                <option value="Temperature Controlled">Temperature Controlled</option>
              </select>
              {errors.loadType && <p className="text-red-600 text-sm mt-1" id="loadTypeError">{errors.loadType}</p>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-800 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={loadDetails.weight}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Weight of the goods"
                  aria-describedby="weightError"
                />
                {errors.weight && <p className="text-red-600 text-sm mt-1" id="weightError">{errors.weight}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-800 mb-2">Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={loadDetails.pickupLocation}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g., Kathmandu"
                  aria-describedby="pickupLocationError"
                />
                {errors.pickupLocation && <p className="text-red-600 text-sm mt-1" id="pickupLocationError">{errors.pickupLocation}</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-800 mb-2">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={loadDetails.destination}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g., Pokhara"
                  aria-describedby="destinationError"
                />
                {errors.destination && <p className="text-red-600 text-sm mt-1" id="destinationError">{errors.destination}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-800 mb-2">Your Contact Info</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={loadDetails.contactInfo}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Name, Email, Phone"
                  aria-describedby="contactInfoError"
                />
                {errors.contactInfo && <p className="text-red-600 text-sm mt-1" id="contactInfoError">{errors.contactInfo}</p>}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">Description</label>
              <textarea
                name="description"
                value={loadDetails.description}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="3"
                placeholder="Any additional details about the load"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold w-full focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? 'Posting Load...' : 'Post Load'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PostYourLoad;