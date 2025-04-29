// BookedLoads.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookedLoads = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedLoads = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please log in.");

        const response = await axios.get("http://localhost:5001/api/loads/booked-loads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoads(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch booked loads error:", err.response || err);
        setError(err.response?.data?.msg || err.message || "Failed to fetch booked loads.");
        setLoading(false);
      }
    };
    fetchBookedLoads();
  }, []);

  const handlePayBid = (loadId, bidId) => {
    navigate(`/payment?loadId=${loadId}&bidId=${bidId}`);
  };

  if (loading) return <p className="text-gray-600">Loading booked loads...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Booked Loads</h3>
      {loads.length === 0 ? (
        <p className="text-gray-600">No booked loads yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loads.map((load) => {
            const acceptedBid = load.bids.find((bid) => bid.status === "accepted");
            return (
              <div key={load._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h4 className="text-lg font-medium text-gray-900">{load.title}</h4>
                <p className="text-sm text-gray-600">Type: {load.loadType}</p>
                <p className="text-sm text-gray-600">Weight: {load.weight} lbs</p>
                <p className="text-sm text-gray-600">Pickup: {load.pickupLocation}</p>
                <p className="text-sm text-gray-600">Destination: {load.destination}</p>
                <p className="text-sm text-gray-600">Price: ${load.price}</p>
                {load.description && <p className="text-sm text-gray-600">Description: {load.description}</p>}
                <p className="text-sm text-gray-600">Contact: {load.contactInfo}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Booked By: {load.bookedBy ? load.bookedBy.fullName : "Unknown"}
                </p>
                {acceptedBid && (
                  <>
                    <p className="text-sm text-gray-600 mt-2">
                      Accepted Bid Price: ${acceptedBid.amount}
                    </p>
                    <button
                      onClick={() => handlePayBid(load._id, acceptedBid._id)}
                      className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Pay Bid
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookedLoads;
