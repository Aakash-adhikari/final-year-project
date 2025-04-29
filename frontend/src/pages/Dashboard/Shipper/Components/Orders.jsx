import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please log in.");

        const response = await axios.get("http://localhost:5001/api/loads/shipper-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Raw API response (shipper orders):", response.data); // Debug log
        setLoads(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch orders error:", err.response || err);
        setError(err.response?.data?.msg || err.message || "Failed to fetch orders.");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleAcceptBid = async (loadId, bidId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:5001/api/loads/accept-bid/${loadId}/${bidId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoads(loads.map((load) => (load._id === loadId ? response.data.load : load)));
    } catch (err) {
      setError(err.response?.data?.msg || "Error accepting bid.");
    }
  };

  const handleRejectBid = async (loadId, bidId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:5001/api/loads/reject-bid/${loadId}/${bidId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoads(loads.map((load) => (load._id === loadId ? response.data.load : load)));
    } catch (err) {
      setError(err.response?.data?.msg || "Error rejecting bid.");
    }
  };

  if (loading) return <p className="text-gray-600">Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Orders</h3>
      {loads.length === 0 ? (
        <p className="text-gray-600">No booked orders yet.</p>
      ) : (
        <div className="space-y-4">
          {loads.map((load) => (
            <div key={load._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h4 className="text-lg font-medium text-gray-900">{load.title}</h4>
              <p className="text-sm text-gray-600">Type: {load.loadType}</p>
              <p className="text-sm text-gray-600">Weight: {load.weight} lbs</p>
              <p className="text-sm text-gray-600">Pickup: {load.pickupLocation}</p>
              <p className="text-sm text-gray-600">Destination: {load.destination}</p>
              <p className="text-sm text-gray-600">Created At: {new Date(load.createdAt).toLocaleString()}</p> {/* Display createdAt for debugging */}
              <p className="text-sm text-gray-600 mt-2">
                Booked By: {load.bookedBy ? load.bookedBy.fullName : "Not booked yet"}
              </p>
              {load.bids.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-700">Bids:</p>
                  {load.bids.map((bid) => (
                    <div key={bid._id} className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-600">
                        {bid.transporter.fullName}: ${bid.amount} - {bid.status}
                      </p>
                      {bid.status === 'pending' && !load.bookedBy && (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleAcceptBid(load._id, bid._id)}
                            className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectBid(load._id, bid._id)}
                            className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;