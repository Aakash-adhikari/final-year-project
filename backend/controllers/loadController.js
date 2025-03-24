// controllers/loadController.js
const Load = require('../models/Load');

// Create a new load (updated with postedBy)
const createLoad = async (req, res) => {
  try {
    const { title, loadType, weight, pickupLocation, destination, description, contactInfo } = req.body;
    const newLoad = new Load({
      title,
      loadType,
      weight,
      pickupLocation,
      destination,
      description,
      contactInfo,
      postedBy: req.user.id, // Set from authenticated user
    });
    await newLoad.save();
    res.status(201).json({ message: 'Load posted successfully!', load: newLoad });
  } catch (error) {
    res.status(500).json({ message: 'Error posting load', error });
  }
};

// Get all posted loads
const getAllLoads = async (req, res) => {
  try {
    const loads = await Load.find().populate('bookedBy', 'fullName email').populate('bids.transporter', 'fullName email');
    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loads', error });
  }
};

// Delete a load by ID (unchanged)
const deleteLoad = async (req, res) => {
  try {
    const loadId = req.params.id;
    const load = await Load.findByIdAndDelete(loadId);
    if (!load) return res.status(404).json({ message: 'Load not found' });
    res.status(200).json({ message: 'Load deleted successfully', load });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting load', error });
  }
};

// Book a load (unchanged)
// const bookLoad = async (req, res) => {
//   try {
//     const loadId = req.params.id;
//     const userId = req.user.id;
//     const load = await Load.findById(loadId);
//     if (!load) return res.status(404).json({ message: 'Load not found' });
//     if (load.bookedBy) return res.status(400).json({ message: 'Load already booked' });

//     load.bookedBy = userId;
//     await load.save();
//     res.status(200).json({ message: 'Load booked successfully', load });
//   } catch (error) {
//     res.status(500).json({ message: 'Error booking load', error });
//   }
// };

// Save a load as favorite (unchanged)
const saveLoad = async (req, res) => {
  try {
    const loadId = req.params.id;
    const userId = req.user.id;
    const load = await Load.findById(loadId);
    if (!load) return res.status(404).json({ message: 'Load not found' });
    if (load.savedBy.includes(userId)) return res.status(400).json({ message: 'Load already saved' });

    load.savedBy.push(userId);
    await load.save();
    res.status(200).json({ message: 'Load saved successfully', load });
  } catch (error) {
    res.status(500).json({ message: 'Error saving load', error });
  }
};

// Get saved loads for a user (unchanged)
const getSavedLoads = async (req, res) => {
  try {
    const userId = req.user.id;
    const loads = await Load.find({ savedBy: userId });
    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved loads', error });
  }
};

// Get booked loads for a user (unchanged)
const getBookedLoads = async (req, res) => {
  try {
    const userId = req.user.id;
    const loads = await Load.find({ bookedBy: userId });
    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booked loads', error });
  }
};

// Get booked loads for a shipper (updated with postedBy)
const getShipperOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const loads = await Load.find({ postedBy: userId })
      .populate('bookedBy', 'fullName email')
      .populate('bids.transporter', 'fullName email');
    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
// Place a bid on a load
const placeBid = async (req, res) => {
  try {
    const loadId = req.params.id;
    const { amount } = req.body;
    const userId = req.user.id;

    const load = await Load.findById(loadId);
    if (!load) return res.status(404).json({ message: 'Load not found' });
    if (load.bookedBy) return res.status(400).json({ message: 'Load already booked' });
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid bid amount' });

    // Check if user already bid
    const existingBid = load.bids.find(bid => bid.transporter.toString() === userId);
    if (existingBid) return res.status(400).json({ message: 'You have already placed a bid on this load' });

    load.bids.push({ transporter: userId, amount });
    await load.save();
    res.status(200).json({ message: 'Bid placed successfully', load });
  } catch (error) {
    res.status(500).json({ message: 'Error placing bid', error });
  }
};

// Accept a bid
const acceptBid = async (req, res) => {
  try {
    const loadId = req.params.loadId;
    const bidId = req.params.bidId;
    const userId = req.user.id;

    const load = await Load.findOne({ _id: loadId, postedBy: userId });
    if (!load) return res.status(404).json({ message: 'Load not found or you are not authorized' });

    const bid = load.bids.id(bidId);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    if (bid.status !== 'pending') return res.status(400).json({ message: 'Bid already processed' });

    bid.status = 'accepted';
    load.bookedBy = bid.transporter; // Book the load to the winning transporter
    load.bids.forEach(b => { if (b._id.toString() !== bidId) b.status = 'rejected'; }); // Reject other bids
    await load.save();

    res.status(200).json({ message: 'Bid accepted successfully', load });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting bid', error });
  }
};

// Reject a bid
const rejectBid = async (req, res) => {
  try {
    const loadId = req.params.loadId;
    const bidId = req.params.bidId;
    const userId = req.user.id;

    const load = await Load.findOne({ _id: loadId, postedBy: userId });
    if (!load) return res.status(404).json({ message: 'Load not found or you are not authorized' });

    const bid = load.bids.id(bidId);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    if (bid.status !== 'pending') return res.status(400).json({ message: 'Bid already processed' });

    bid.status = 'rejected';
    await load.save();

    res.status(200).json({ message: 'Bid rejected successfully', load });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting bid', error });
  }
};

// Get bids placed by a transporter
const getTransporterBids = async (req, res) => {
  try {
    const userId = req.user.id;
    const loads = await Load.find({ 'bids.transporter': userId })
      .populate('postedBy', 'fullName email')
      .populate('bids.transporter', 'fullName email');
    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transporter bids', error });
  }
};

module.exports = {
  createLoad,
  getAllLoads,
  deleteLoad,
  // bookLoad,
  saveLoad,
  getSavedLoads,
  getBookedLoads,
  getShipperOrders,
  placeBid,
  acceptBid,
  rejectBid,
  getTransporterBids,
};