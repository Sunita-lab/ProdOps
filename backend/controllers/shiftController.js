const Shift = require('../models/Shift');

const createShift = async (req, res) => {
  try {
    const shift = await Shift.create(req.body);
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.id);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });
    res.status(200).json({ message: 'Shift deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createShift, getShifts, deleteShift };