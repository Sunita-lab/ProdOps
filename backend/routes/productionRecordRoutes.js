const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createRecord, getRecords, getRecordsByOrder } = require('../controllers/productionRecordController');

router.post('/', protect, createRecord);
router.get('/', protect, getRecords);
router.get('/order/:orderId', protect, getRecordsByOrder);

module.exports = router;