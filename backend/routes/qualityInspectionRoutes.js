const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createInspection, getInspections } = require('../controllers/qualityInspectionController');

router.post('/', protect, createInspection);
router.get('/', protect, getInspections);

module.exports = router;