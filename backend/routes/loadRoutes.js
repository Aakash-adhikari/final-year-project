// routes/loadRoutes.js
const express = require('express');
const router = express.Router();
const loadController = require('../controllers/loadController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/post-loads', authMiddleware, loadController.createLoad);
router.get('/get-loads', authMiddleware, loadController.getAllLoads); // Protected now
router.delete('/delete-loads/:id', authMiddleware, loadController.deleteLoad);
router.put('/:id', authMiddleware, loadController.editLoad);

// router.post('/book-load/:id', authMiddleware, loadController.bookLoad);
router.post('/save-load/:id', authMiddleware, loadController.saveLoad);
router.get('/saved-loads', authMiddleware, loadController.getSavedLoads);
router.get('/booked-loads', authMiddleware, loadController.getBookedLoads);
router.get('/shipper-orders', authMiddleware, loadController.getShipperOrders);
router.post('/place-bid/:id', authMiddleware, loadController.placeBid);
router.post('/accept-bid/:loadId/:bidId', authMiddleware, loadController.acceptBid);
router.post('/reject-bid/:loadId/:bidId', authMiddleware, loadController.rejectBid);
router.get('/transporter-bids', authMiddleware, loadController.getTransporterBids);

module.exports = router;