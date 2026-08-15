const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { startDowntime, resolveDowntime, getDowntimes } = require('../controllers/downtimeController');

router.post('/', protect, startDowntime);
router.put('/:id/resolve', protect, resolveDowntime);
router.get('/', protect, getDowntimes);

module.exports = router;