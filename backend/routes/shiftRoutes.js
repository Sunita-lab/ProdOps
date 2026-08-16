const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createShift, getShifts, deleteShift } = require('../controllers/shiftController');

router.post('/', protect, createShift);
router.get('/', protect, getShifts);
router.delete('/:id', protect, deleteShift);

module.exports = router;