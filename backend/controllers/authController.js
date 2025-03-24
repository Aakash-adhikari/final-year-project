const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register new user
exports.createAccount = async (req, res) => {
  const { fullName, email, password, confirmPassword, role, companyName, vehicleType, phoneNumber } = req.body;

  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if role is valid
  if (!['shipper', 'transporter'].includes(role)) {
    return res.status(400).json({ msg: 'Role must be "shipper" or "transporter"' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password,
      confirmPassword,
      role,
      companyName: role === 'shipper' ? companyName : '', // Only for shippers
      vehicleType: role === 'transporter' ? vehicleType : '', // Only for transporters
      phoneNumber: phoneNumber || '',
    });

    // Save user to DB
    await newUser.save();

    // Return success response
    res.status(201).json({ msg: 'User created successfully', user: { id: newUser._id, email: newUser.email, role: newUser.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.isPasswordCorrect(password);
    console.log('Password Match:', isMatch); // Debugging line
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Include role in payload
      },
    };

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT_SECRET is not set' });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token and user details
    res.status(200).json({
      msg: 'Login successful',
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user details by ID (unchanged)
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const userDetails = {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      location: user.location,
      companyName: user.companyName,
      vehicleType: user.vehicleType,
      phoneNumber: user.phoneNumber,
      profilePic: user.profilePic,
    };

    res.status(200).json(userDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update user profile (adjusted to include vehicleType)
exports.updateUserProfile = async (req, res) => {
  const { fullName, email, location, companyName, vehicleType, phoneNumber, profilePic } = req.body;

  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user fields
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.location = location || user.location;
    user.companyName = user.role === 'shipper' ? (companyName || user.companyName) : user.companyName;
    user.vehicleType = user.role === 'transporter' ? (vehicleType || user.vehicleType) : user.vehicleType;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profilePic = profilePic || user.profilePic;

    await user.save();

    res.status(200).json({
      msg: 'Profile updated successfully',
      user: {
        fullName: user.fullName,
        email: user.email,
        location: user.location,
        companyName: user.companyName,
        vehicleType: user.vehicleType,
        phoneNumber: user.phoneNumber,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};