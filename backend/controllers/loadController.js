const Load = require('../models/Load');
const User = require('../models/User');
const mongoose = require('mongoose');

const createLoad = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Load schema paths:", Object.keys(Load.schema.paths));

    const title = req.body.title;
    const loadType = req.body.loadType;
    const weight = req.body.weight;
    const pickupLocation = req.body.pickupLocation;
    const destination = req.body.destination;
    const price = req.body.price;
    const description = req.body.description;
    const contactInfo = req.body.contactInfo;

    console.log("Raw price from req.body:", price);

    if (!title || !loadType || !weight || !pickupLocation || !destination || !contactInfo) {
      return res.status(400).json({ msg: "All required fields must be provided" });
    }

    if (price === undefined || price === null || price === '') {
      return res.status(400).json({ msg: "Price is required" });
    }
    const parsedPrice = Number(price);
    console.log("Parsed price:", parsedPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({ msg: "Price must be a positive number" });
    }

    if (!["General Freight", "Heavy Equipment", "Temperature Controlled"].includes(loadType)) {
      return res.status(400).json({ msg: "Invalid load type" });
    }

    const parsedWeight = Number(weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      return res.status(400).json({ msg: "Weight must be a positive number" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ msg: "Invalid user ID format" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.role !== "shipper") {
      return res.status(403).json({ msg: "Only shippers can post loads" });
    }

    const newLoad = new Load({
      title: title,
      loadType: loadType,
      weight: parsedWeight,
      pickupLocation: pickupLocation,
      destination: destination,
      price: parsedPrice,
      description: description || undefined,
      contactInfo: contactInfo,
      postedBy: req.user.id,
    });

    console.log("New load document before save:", newLoad.toObject());

    await newLoad.save();
    console.log("Load saved successfully:", newLoad.toObject());
    res.status(201).json({ message: 'Load posted successfully!', load: newLoad });
  } catch (error) {
    console.error("Error in createLoad:", error.message, error.stack);
    res.status(500).json({ message: 'Error posting load', error: error.message });
  }
};

const editLoad = async (req, res) => {
  try {
    const loadId = req.params.id;
    const { title, loadType, weight, pickupLocation, destination, price, description, contactInfo } = req.body;

    if (!mongoose.Types.ObjectId.isValid(loadId)) {
      return res.status(400).json({ msg: "Invalid load ID format" });
    }

    const load = await Load.findById(loadId);
    if (!load) {
      return res.status(404).json({ msg: "Load not found" });
    }

    if (load.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to edit this load" });
    }

    if (!title || !loadType || !weight || !pickupLocation || !destination || !contactInfo) {
      return res.status(400).json({ msg: "All required fields must be provided" });
    }

    if (price === undefined || price === null || price === '') {
      return res.status(400).json({ msg: "Price is required" });
    }
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({ msg: "Price must be a positive number" });
    }

    if (!["General Freight", "Heavy Equipment", "Temperature Controlled"].includes(loadType)) {
      return res.status(400).json({ msg: "Invalid load type" });
    }

    const parsedWeight = Number(weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      return res.status(400).json({ msg: "Weight must be a positive number" });
    }

    load.title = title;
    load.loadType = loadType;
    load.weight = parsedWeight;
    load.pickupLocation = pickupLocation;
    load.destination = destination;
    load.price = parsedPrice;
    load.description = description || undefined;
    load.contactInfo = contactInfo;

    await load.save();
    res.status(200).json({ message: "Load updated successfully", load });
  } catch (error) {
    console.error("Error in editLoad:", error.message, error.stack);
    res.status(500).json({ message: "Error updating load", error: error.message });
  }
};

const getAllLoads = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let query;
    if (user.role === "shipper") {
      query = { postedBy: req.user.id };
    } else if (user.role === "transporter") {
      const shippers = await User.find({ role: "shipper" }).select("_id");
      const shipperIds = shippers.map(shipper => shipper._id);
      query = {
        postedBy: { $in: shipperIds, $ne: req.user.id },
        bookedBy: null, // Only show unbooked loads
      };
    } else {
      return res.status(403).json({ msg: "Invalid user role" });
    }

    const loads = await Load.find(query)
      .populate('postedBy', 'fullName email')
      .populate('bookedBy', 'fullName email')
      .populate('bids.transporter', 'fullName email')
      .sort({ createdAt: -1 });
    res.status(200).json(loads);
  } catch (error) {
    console.error("Error in getAllLoads:", error.message, error.stack);
    res.status(500).json({ message: 'Error fetching loads', error: error.message });
  }
};

const deleteLoad = async (req, res) => {
  try {
    const loadId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(loadId)) {
      return res.status(400).json({ msg: "Invalid load ID format" });
    }

    const load = await Load.findById(loadId);
    if (!load) return res.status(404).json({ message: 'Load not found' });

    if (load.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this load' });
    }

    await Load.deleteOne({ _id: loadId });
    res.status(200).json({ message: 'Load deleted successfully', load });
  } catch (error) {
    console.error("Error in deleteLoad:", error.message, error.stack);
    res.status(500).json({ message: 'Error deleting load', error: error.message });
  }
};

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
    console.error("Error in saveLoad:", error.message, error.stack);
    res.status(500).json({ message: 'Error saving load', error: error.message });
  }
};

const unsaveLoad = async (req, res) => {
  try {
    const loadId = req.params.id;
    const userId = req.user.id;

    const load = await Load.findById(loadId);
    if (!load) return res.status(404).json({ message: 'Load not found' });
    if (!load.savedBy.includes(userId)) return res.status(400).json({ message: 'Load not saved by this user' });

    load.savedBy = load.savedBy.filter(id => id.toString() !== userId);
    await load.save();
    res.status(200).json({ message: 'Load removed from saved loads', load });
  } catch (error) {
    console.error("Error in unsaveLoad:", error.message, error.stack);
    res.status(500).json({ message: 'Error removing load from saved loads', error: error.message });
  }
};

const getSavedLoads = async (req, res) => {
  try {
    const userId = req.user.id;
    const loads = await Load.find({ savedBy: userId, bookedBy: null }) // Only show unbooked saved loads
      .populate('postedBy', 'fullName email')
      .populate('bookedBy', 'fullName email')
      .populate('bids.transporter', 'fullName email')
      .sort({ createdAt: -1 }); // Sort newest first
    res.status(200).json(loads);
  } catch (error) {
    console.error("Error in getSavedLoads:", error.message, error.stack);
    res.status(500).json({ message: 'Error fetching saved loads', error: error.message });
  }
};

const getBookedLoads = async (req, res) => {
  try {
    const userId = req.user.id;
    const loads = await Load.find({ bookedBy: userId })
      .populate('postedBy', 'fullName email')
      .populate('bookedBy', 'fullName email')
      .populate('bids.transporter', 'fullName email')
      .sort({ createdAt: -1 }); // Sort newest first
    res.status(200).json(loads);
  } catch (error) {
    console.error("Error in getBookedLoads:", error.message, error.stack);
    res.status(500).json({ message: 'Error fetching booked loads', error: error.message });
  }
};

const getShipperOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const loads = await Load.find({ postedBy: userId })
      .populate('postedBy', 'fullName email')
      .populate('bookedBy', 'fullName email')
      .populate('bids.transporter', 'fullName email')
      .sort({ createdAt: -1 });
    res.status(200).json(loads);
  } catch (error) {
    console.error("Error in getShipperOrders:", error.message, error.stack);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

const placeBid = async (req, res) => {
  try {
    const loadId = req.params.id;
    const { amount } = req.body;
    const userId = req.user.id;

    const load = await Load.findById(loadId);
    if (!load) return res.status(404).json({ message: 'Load not found' });
    if (load.bookedBy) return res.status(400).json({ message: 'Load already booked' });
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid bid amount' });

    // Check for an existing bid by this transporter
    const existingBid = load.bids.find(bid => bid.transporter.toString() === userId);
    if (existingBid) {
      if (existingBid.status === 'pending') {
        return res.status(400).json({ message: 'You have a pending bid on this load' });
      } else if (existingBid.status === 'accepted') {
        return res.status(400).json({ message: 'Your bid was already accepted for this load' });
      } else if (existingBid.status === 'rejected') {
        // Remove the rejected bid to allow a new bid
        load.bids = load.bids.filter(bid => bid.transporter.toString() !== userId);
      }
    }

    load.bids.push({ transporter: userId, amount });
    await load.save();
    res.status(200).json({ message: 'Bid placed successfully', load });
  } catch (error) {
    console.error("Error in placeBid:", error.message, error.stack);
    res.status(500).json({ message: 'Error placing bid', error: error.message });
  }
};

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
    load.bookedBy = bid.transporter;
    load.bids.forEach(b => { if (b._id.toString() !== bidId) b.status = 'rejected'; });
    await load.save();

    res.status(200).json({ message: 'Bid accepted successfully', load });
  } catch (error) {
    console.error("Error in acceptBid:", error.message, error.stack);
    res.status(500).json({ message: 'Error accepting bid', error: error.message });
  }
};

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
    console.error("Error in rejectBid:", error.message, error.stack);
    res.status(500).json({ message: 'Error rejecting bid', error: error.message });
  }
};

const getTransporterBids = async (req, res) => {
  try {
    const userId = req.user.id;
    const loads = await Load.find({ 'bids.transporter': userId })
      .populate('postedBy', 'fullName email')
      .populate('bookedBy', 'fullName email')
      .populate('bids.transporter', 'fullName email')
      .sort({ createdAt: -1 }); // Sort newest first
    res.status(200).json(loads);
  } catch (error) {
    console.error("Error in getTransporterBids:", error.message, error.stack);
    res.status(500).json({ message: 'Error fetching transporter bids', error: error.message });
  }
};

module.exports = {
  createLoad,
  editLoad,
  getAllLoads,
  deleteLoad,
  saveLoad,
  unsaveLoad,
  getSavedLoads,
  getBookedLoads,
  getShipperOrders,
  placeBid,
  acceptBid,
  rejectBid,
  getTransporterBids,
};