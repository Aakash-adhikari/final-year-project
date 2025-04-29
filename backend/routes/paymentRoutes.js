const express = require('express');
const router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add your Stripe secret key here
const Load = require('../models/Load');
const Payment = require('../models/Payment');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');


// Route to initiate a payment for an accepted bid
router.post('/pay/:loadId',authMiddleware, async (req, res) => {
  try {
    const loadId = req.params.loadId;
    const userId = req.user.id; // The transporter who is paying

    // Find the load by ID
    const load = await Load.findById(loadId);
    if (!load) return res.status(404).json({ message: 'Load not found' });

    // Ensure the current user is the transporter who placed the accepted bid
    if (load.bookedBy.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to make a payment for this load' });
    }

    // Amount should be the price of the load
    const amount = load.price;

    // Create a Stripe PaymentIntent for this load's payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires amount in cents
      currency: 'usd', // or any currency you are using
      metadata: {
        loadId: load._id.toString(),
        transporterId: userId
      }
    });

    // Create a payment record
    const payment = new Payment({
      load: load._id,
      transporter: userId,
      amount: amount,
      paymentIntentId: paymentIntent.id
    });

    // Save the payment record with 'pending' status
    await payment.save();

    // Respond with the payment intent client secret
    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error in creating payment:', error);
    res.status(500).json({ message: 'Error creating payment intent', error: error.message });
  }
});

// Route to confirm the payment (after the user completes the payment on the front end)
router.post('/confirm',authMiddleware, async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const { paymentIntentId, status } = req.body;

    // Find the payment record
    const payment = await Payment.findOne({ paymentIntentId });

    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    // Confirm payment status
    if (payment.paymentIntentId !== paymentIntentId) {
      return res.status(400).json({ message: 'PaymentIntent ID mismatch' });
    }

    // Update payment status based on the payment result
    if (status === 'succeeded') {
      payment.paymentStatus = 'completed';
    } else {
      payment.paymentStatus = 'failed';
    }

    await payment.save();

    // Respond with success or failure
    res.status(200).json({ message: 'Payment confirmed', paymentStatus: payment.paymentStatus });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ message: 'Error confirming payment', error: error.message });
  }
});

module.exports = router;
