const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createLine, getLines, deleteLine } = require('../controllers/lineController');

router.post('/', protect, createLine);
router.get('/', protect, getLines);
router.delete('/:id', protect, deleteLine);

module.exports = router;