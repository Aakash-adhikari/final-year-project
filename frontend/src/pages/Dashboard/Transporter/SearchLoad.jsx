import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchLoads = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bidAmounts, setBidAmounts] = useState({});

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please log in.");

        const response = await axios.get("http://localhost:5001/api/loads/get-loads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoads(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch loads error:", err.response || err);
        setError(err.response?.data?.msg || err.message || "Failed to fetch loads.");
        setLoading(false);
      }
    };
    fetchLoads();
  }, []);

  const handleSave = async (loadId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:5001/api/loads/save-load/${loadId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoads(loads.map((load) => (load._id === loadId ? response.data.load : load)));
      setSuccessMessage("Load saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error saving load:", err);
      setError(err.response?.data?.msg || "Error saving load.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleBid = async (loadId) => {
    const amount = bidAmounts[loadId];
    if (!amount || amount <= 0) {
      setError("Please enter a valid bid amount.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:5001/api/loads/place-bid/${loadId}`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoads(loads.map((load) => (load._id === loadId ? response.data.load : load)));
      setBidAmounts({ ...bidAmounts, [loadId]: "" });
      setSuccessMessage("Bid placed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error placing bid:", err);
      setError(err.response?.data?.msg || "Error placing bid.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleBidAmountChange = (loadId, value) => {
    setBidAmounts({ ...bidAmounts, [loadId]: value });
  };

  if (loading) return <p className="text-gray-600">Loading loads...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Loads</h3>
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loads.length === 0 ? (
        <p className="text-gray-600">No loads available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loads.map((load) => (
            <div key={load._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-medium text-gray-900">{load.title}</h4>
              <p className="text-sm text-gray-600">Type: {load.loadType}</p>
              <p className="text-sm text-gray-600">Weight: {load.weight} lbs</p>
              <p className="text-sm text-gray-600">Pickup: {load.pickupLocation}</p>
              <p className="text-sm text-gray-600">Destination: {load.destination}</p>
              <p className="text-sm text-gray-600">Price: ${load.price}</p>
              {load.description && <p className="text-sm text-gray-600 mt-2">Description: {load.description}</p>}
              <p className="text-sm text-gray-600 mt-2">Contact: {load.contactInfo}</p>

              {/* Display existing bid status if any */}
              {load.bids && load.bids.some(bid => bid.transporter._id === localStorage.getItem("userId")) ? (
                load.bids
                  .filter(bid => bid.transporter._id === localStorage.getItem("userId"))
                  .map(bid => (
                    <p key={bid._id} className={`text-sm mt-2 ${bid.status === 'rejected' ? 'text-red-600' : bid.status === 'accepted' ? 'text-green-600' : 'text-gray-600'}`}>
                      Your Bid: ${bid.amount} - Status: {bid.status}
                    </p>
                  ))
              ) : null}

              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSave(load._id)}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={bidAmounts[load._id] || ""}
                    onChange={(e) => handleBidAmountChange(load._id, e.target.value)}
                    placeholder="Enter bid amount"
                    className="p-2 border rounded-md w-32"
                    min="1"
                    disabled={load.bookedBy}
                  />
                  <button
                    onClick={() => handleBid(load._id)}
                    disabled={load.bookedBy}
                    className={`px-4 py-2 rounded-md text-white ${load.bookedBy ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                  >
                    Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchLoads;