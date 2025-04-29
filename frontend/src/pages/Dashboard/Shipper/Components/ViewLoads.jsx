import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewLoads = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLoad, setCurrentLoad] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    loadType: '',
    weight: '',
    pickupLocation: '',
    destination: '',
    price: '',
    description: '',
    contactInfo: '',
  });
  const [editErrors, setEditErrors] = useState({});

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadIdToDelete, setLoadIdToDelete] = useState(null);

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No auth token found. Please log in.');

        const response = await axios.get('http://localhost:5001/api/loads/get-loads', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log("Fetched loads:", response.data);
        setLoads(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching loads:", err);
        setError(err.response?.data?.msg || err.message || 'Failed to fetch loads.');
        setLoading(false);
      }
    };

    fetchLoads();
  }, []);

  const handleDelete = (loadId) => {
    setLoadIdToDelete(loadId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No auth token found. Please log in.');

      await axios.delete(`http://localhost:5001/api/loads/delete-loads/${loadIdToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setLoads(loads.filter(load => load._id !== loadIdToDelete));
      setSuccessMessage('Load deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setIsDeleteModalOpen(false);
      setLoadIdToDelete(null);
    } catch (err) {
      console.error("Error deleting load:", err);
      setError(err.response?.data?.message || err.message || 'Failed to delete load.');
      setTimeout(() => setError(''), 3000);
      setIsDeleteModalOpen(false);
      setLoadIdToDelete(null);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setLoadIdToDelete(null);
  };

  const handleEditClick = (load) => {
    if (!load || !load._id) {
      console.error("Invalid load data:", load);
      setError("Cannot edit load: Invalid load data.");
      setTimeout(() => setError(''), 3000);
      return;
    }

    setCurrentLoad(load);
    setEditFormData({
      title: load.title || '',
      loadType: load.loadType || '',
      weight: load.weight ? load.weight.toString() : '',
      pickupLocation: load.pickupLocation || '',
      destination: load.destination || '',
      price: load.price ? load.price.toString() : '',
      description: load.description || '',
      contactInfo: load.contactInfo || '',
    });
    setEditErrors({});
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEditForm = () => {
    const newErrors = {};
    if (!editFormData.title.trim()) newErrors.title = 'Title is required.';
    if (!editFormData.loadType) newErrors.loadType = 'Load type is required.';

    const parsedWeight = Number(editFormData.weight);
    if (!editFormData.weight || isNaN(parsedWeight) || parsedWeight <= 0) {
      newErrors.weight = 'Valid weight greater than 0 is required.';
    }

    const parsedPrice = Number(editFormData.price);
    if (editFormData.price === '' || isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = 'Valid price greater than 0 is required.';
    }

    if (!editFormData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required.';
    if (!editFormData.destination.trim()) newErrors.destination = 'Destination is required.';
    if (!editFormData.contactInfo.trim()) newErrors.contactInfo = 'Contact info is required.';

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError('');

    if (validateEditForm()) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No auth token found. Please log in.');

        const payload = {
          title: editFormData.title.trim(),
          loadType: editFormData.loadType,
          weight: Number(editFormData.weight),
          pickupLocation: editFormData.pickupLocation.trim(),
          destination: editFormData.destination.trim(),
          price: Number(editFormData.price),
          description: editFormData.description.trim() || undefined,
          contactInfo: editFormData.contactInfo.trim(),
        };

        const response = await axios.put(
          `http://localhost:5001/api/loads/${currentLoad._id}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        setLoads(loads.map(load => load._id === currentLoad._id ? response.data.load : load));
        setSuccessMessage('Load updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setIsEditModalOpen(false);
        setCurrentLoad(null);
      } catch (err) {
        console.error("Error updating load:", err);
        setError(err.response?.data?.msg || err.response?.data?.message || err.message || 'Failed to update load.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentLoad(null);
    setEditFormData({
      title: '',
      loadType: '',
      weight: '',
      pickupLocation: '',
      destination: '',
      price: '',
      description: '',
      contactInfo: '',
    });
    setEditErrors({});
  };

  if (loading) return <p className="text-center text-gray-600">Loading loads...</p>;
  if (error && !successMessage) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Posted Loads</h2>
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {loads.length === 0 ? (
          <p className="text-center text-gray-600">No loads found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loads.map(load => (
              <div key={load._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{load.title}</h3>
                <p className="text-gray-600 mb-1"><strong>Type:</strong> {load.loadType}</p>
                <p className="text-gray-600 mb-1"><strong>Weight:</strong> {load.weight} kg</p>
                <p className="text-gray-600 mb-1"><strong>Pickup:</strong> {load.pickupLocation}</p>
                <p className="text-gray-600 mb-1"><strong>Destination:</strong> {load.destination}</p>
                <p className="text-gray-600 mb-1"><strong>Price:</strong> ${load.price}</p>
                {load.description && <p className="text-gray-600 mb-1"><strong>Description:</strong> {load.description}</p>}
                <p className="text-gray-600 mb-4"><strong>Contact:</strong> {load.contactInfo}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(load)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(load._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Load</h3>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label class CottName="block text-lg font-medium text-gray-800 mb-2">Load Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditInputChange}
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="e.g., Electronics from Kathmandu to Pokhara"
                  />
                  {editErrors.title && <p className="text-red-600 text-sm mt-1">{editErrors.title}</p>}
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">Load Type</label>
                  <select
                    name="loadType"
                    value={editFormData.loadType}
                    onChange={handleEditInputChange}
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select Load Type</option>
                    <option value="General Freight">General Freight</option>
                    <option value="Heavy Equipment">Heavy Equipment</option>
                    <option value="Temperature Controlled">Temperature Controlled</option>
                  </select>
                  {editErrors.loadType && <p className="text-red-600 text-sm mt-1">{editErrors.loadType}</p>}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={editFormData.weight}
                      onChange={handleEditInputChange}
                      className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Weight of the goods"
                      min="1"
                    />
                    {editErrors.weight && <p className="text-red-600 text-sm mt-1">{editErrors.weight}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Price (USD)</label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditInputChange}
                      className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Price for the load"
                      min="1"
                    />
                    {editErrors.price && <p className="text-red-600 text-sm mt-1">{editErrors.price}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Pickup Location</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={editFormData.pickupLocation}
                      onChange={handleEditInputChange}
                      className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="e.g., Kathmandu"
                    />
                    {editErrors.pickupLocation && <p className="text-red-600 text-sm mt-1">{editErrors.pickupLocation}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={editFormData.destination}
                      onChange={handleEditInputChange}
                      className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="e.g., Pokhara"
                    />
                    {editErrors.destination && <p className="text-red-600 text-sm mt-1">{editErrors.destination}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">Contact Info</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={editFormData.contactInfo}
                    onChange={handleEditInputChange}
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Name, Email, Phone"
                  />
                  {editErrors.contactInfo && <p className="text-red-600 text-sm mt-1">{editErrors.contactInfo}</p>}
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows="3"
                    placeholder="Any additional details about the load"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this load? This action cannot be undone.</p>
              <div className="flex gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Confirm
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLoads;