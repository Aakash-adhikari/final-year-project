import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewBids = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please log in.");

        const response = await axios.get("http://localhost:5001/api/loads/transporter-bids", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoads(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch bids error:", err.response || err);
        setError(err.response?.data?.msg || err.message || "Failed to fetch bids.");
        setLoading(false);
      }
    };
    fetchBids();
  }, []);

  if (loading) return <p className="text-gray-600">Loading bids...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Bids</h3>
      {loads.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any bids yet.</p>
      ) : (
        <div className="space-y-4">
          {loads.map((load) => {
            const userBid = load.bids.find(bid => bid.transporter._id === localStorage.getItem("userId")); // Assuming userId is stored
            return (
              <div key={load._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h4 className="text-lg font-medium text-gray-900">{load.title}</h4>
                <p className="text-sm text-gray-600">Type: {load.loadType}</p>
                <p className="text-sm text-gray-600">Weight: {load.weight} lbs</p>
                <p className="text-sm text-gray-600">Pickup: {load.pickupLocation}</p>
                <p className="text-sm text-gray-600">Destination: {load.destination}</p>
                {userBid && (
                  <p className="text-sm text-gray-600 mt-2">
                    Your Bid: ${userBid.amount} - Status: {userBid.status}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewBids;