import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { FaTrash } from 'react-icons/fa'; // Import the Trash icon

const ViewLoads = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loads from the API when the component mounts
  useEffect(() => {
    const fetchLoads = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please log in.");

        const response = await axios.get('http://localhost:5001/api/loads/get-loads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoads(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch loads error:", err.response || err);
        setError(err.response?.data?.msg || err.message || 'An error occurred while fetching loads');
        setLoading(false);
      }
    };

    fetchLoads();
  }, []);

  // Handle delete load action
  const handleDelete = async (loadId) => {
    if (window.confirm('Are you sure you want to delete this load?')) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(`http://localhost:5001/api/loads/delete-loads/${loadId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setLoads((prevLoads) => prevLoads.filter((load) => load._id !== loadId));
        } else {
          setError('Failed to delete load');
        }
      } catch (err) {
        setError(err.response?.data?.msg || 'An error occurred while deleting the load');
      }
    }
  };

  // Render different states (loading, error, no data, data)
  return (
    <div>
      {loading && <p className="text-gray-600">Loading loads...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && loads.length === 0 && <p className="text-gray-600">No loads found.</p>}
      {!loading && !error && loads.length > 0 && (
        <div>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Load Type</th>
                <th className="px-4 py-2 text-left">Weight (kg)</th>
                <th className="px-4 py-2 text-left">Pickup Location</th>
                <th className="px-4 py-2 text-left">Destination</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loads.map((load) => (
                <tr key={load._id} className="border-b">
                  <td className="px-4 py-2">{load.title}</td>
                  <td className="px-4 py-2">{load.loadType}</td>
                  <td className="px-4 py-2">{load.weight}</td>
                  <td className="px-4 py-2">{load.pickupLocation}</td>
                  <td className="px-4 py-2">{load.destination}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(load._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewLoads;