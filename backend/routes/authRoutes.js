const express = require('express');
const { createAccount, login, updateUserProfile, getUserDetails } = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const router = express.Router();
// Configure multer for file uploads
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    // Ensure the uploads folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept image files only
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Route to create a new user account
router.post(
  '/create-account',
  [
    check('fullName', 'Full name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('confirmPassword', 'Confirm password is required').not().isEmpty(),
    check('role', 'Role must be "shipper" or "transporter"').isIn(['shipper', 'transporter']),
    check('companyName', 'Company name is optional').optional(),
    check('vehicleType', 'Vehicle type is optional').optional(),
    check('phoneNumber', 'Please include a valid phone number').optional().isMobilePhone(),
  ],
  createAccount
);

// Route to login
router.post(
  '/login',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  login
);

// GET /api/user/profile - Get user profile details
router.get('/get-profile', authMiddleware, authController.getUserDetails);

// PUT /api/user/profile - Update user profile details
router.post(
  "/update-profile",
  authMiddleware,
  upload.single("profilePic"),
  authController.updateProfile
);
module.exports = router;
