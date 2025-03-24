import React, { useState, useEffect } from "react";
import axios from "axios";

const BookedLoads = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookedLoads = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/loads/booked-loads", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        setLoads(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch booked loads.");
        setLoading(false);
      }
    };
    fetchBookedLoads();
  }, []);

  if (loading) return <p className="text-gray-600">Loading booked loads...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Booked Loads</h3>
      {loads.length === 0 ? (
        <p className="text-gray-600">No booked loads yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loads.map((load) => (
            <div
              key={load._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h4 className="text-lg font-medium text-gray-900">{load.title}</h4>
              <p className="text-sm text-gray-600">Type: {load.loadType}</p>
              <p className="text-sm text-gray-600">Weight: {load.weight} lbs</p>
              <p className="text-sm text-gray-600">Pickup: {load.pickupLocation}</p>
              <p className="text-sm text-gray-600">Destination: {load.destination}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedLoads;