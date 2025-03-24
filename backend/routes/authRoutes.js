const express = require('express');
const { createAccount, login } = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

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
router.put(
  '/update-profile',
  authMiddleware,
  [
    check('fullName', 'Full name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber', 'Please include a valid phone number').optional().isMobilePhone(),
  ],
  authController.updateUserProfile
);

module.exports = router;