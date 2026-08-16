const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createMachine, getMachines, updateMachine, deleteMachine } = require('../controllers/machineController');

router.post('/', protect, createMachine);
router.get('/', protect, getMachines);
router.put('/:id', protect, updateMachine);
router.delete('/:id', protect, deleteMachine);

module.exports = router;