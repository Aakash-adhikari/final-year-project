import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const loadId = query.get("loadId");
  const bidId = query.get("bidId");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("authToken"); // Your actual auth token key
      const res = await axios.post(
        `http://localhost:5001/api/payment/pay/${loadId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { clientSecret } = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.post(
          `http://localhost:5001/api/payment/confirm`,
          {
            paymentIntentId: result.paymentIntent.id,
            status: result.paymentIntent.status,
            bidId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage("Payment successful!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="payment-form p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>
      <CardElement className="p-2 border rounded mb-4" />
      <button
        onClick={handlePayment}
        disabled={!stripe || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default Payment;
