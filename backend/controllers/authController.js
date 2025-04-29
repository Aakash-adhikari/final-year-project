const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

 // Register new user
 exports.createAccount = async (req, res) => {
  const { fullName, email, password, confirmPassword, role, companyName, vehicleType, phoneNumber } = req.body;

  // Check for validation errors from express-validator (if used)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Custom validation
  try {
    if (!fullName || !fullName.match(/^[a-zA-Z\s]+$/)) {
      return res.status(400).json({ msg: "Full name must contain only letters and spaces" });
    }
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
    if (!["shipper", "transporter"].includes(role)) {
      return res.status(400).json({ msg: "Role must be 'shipper' or 'transporter'" });
    }
    if (role === "shipper" && (!companyName || companyName.length < 3)) {
      return res.status(400).json({ msg: "Company name is required and must be at least 3 characters for shippers" });
    }
    if (role === "transporter" && (!vehicleType || vehicleType.length < 3)) {
      return res.status(400).json({ msg: "Vehicle type is required and must be at least 3 characters for transporters" });
    }
    if (phoneNumber && !phoneNumber.match(/^\+?\d{10,15}$/)) {
      return res.status(400).json({ msg: "Phone number must be 10-15 digits" });
    }
    if (!password || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      return res.status(400).json({ msg: "Password must be at least 8 characters with one uppercase, one lowercase, one number, and one special character" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user (password will be hashed by the pre-save hook)
    const newUser = new User({
      fullName,
      email,
      password, // Plain text, will be hashed by pre-save hook
      confirmPassword, // Optional, will be hashed if provided
      role,
      companyName: role === "shipper" ? companyName : "",
      vehicleType: role === "transporter" ? vehicleType : "",
      phoneNumber: phoneNumber || "",
    });

    // Save user to DB
    await newUser.save();

    // Generate JWT token
    const payload = { user: { id: newUser._id } };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.status(201).json({ msg: "User created successfully", token });
  } catch (err) {
    console.error("Error in createAccount:", err.message, err.stack);
    if (err.name === "ValidationError") {
      return res.status(400).json({ msg: "Validation error", errors: err.errors });
    }
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Duplicate email detected" });
    }
    res.status(500).json({ msg: "Server error", error: err.message });
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
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT_SECRET is not set' });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

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

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -confirmPassword');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
      vehicleType: user.vehicleType,
      phoneNumber: user.phoneNumber,
      location: user.location,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update user profile
const path = require("path");
const fs = require("fs");

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware
    const { fullName, email, phoneNumber, companyName, vehicleType, location } = req.body;

    console.log("Request body:", req.body);
    console.log("File:", req.file);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update fields
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.companyName = companyName || user.companyName;
    user.vehicleType = vehicleType || user.vehicleType;
    user.location = location || user.location;

    // Handle profile picture upload
    if (req.file) {
      // Delete old profile picture if exists
      if (user.profilePic) {
        const oldImagePath = path.join(__dirname, "../uploads", path.basename(user.profilePic));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // Save new profile picture path
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    await user.save();
    console.log(user.profilePic)
    // Return updated user data
    res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      companyName: user.companyName,
      vehicleType: user.vehicleType,
      location: user.location,
      profilePic: user.profilePic || "",
    });
  } catch (err) {
    console.error("Error in updateProfile:", err.message, err.stack);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};