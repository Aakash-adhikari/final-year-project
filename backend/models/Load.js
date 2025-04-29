const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  loadType: { type: String, required: true, enum: ['General Freight', 'Heavy Equipment', 'Temperature Controlled'] },
  weight: { type: Number, required: true },
  pickupLocation: { type: String, required: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true }, // New field for price
  description: { type: String, required: false },
  contactInfo: { type: String, required: true },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bids: [{
    transporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Load', loadSchema);