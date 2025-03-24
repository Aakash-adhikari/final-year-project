// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Check if the Authorization header exists and has a token
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Authorization denied. No token provided.' });
    }

    // Extract and verify the token
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Token validation error:', error.message);
    return res.status(401).json({ msg: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
