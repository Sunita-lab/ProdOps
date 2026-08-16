const Line = require('../models/Line');

const createLine = async (req, res) => {
  try {
    const line = await Line.create(req.body);
    res.status(201).json(line);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLines = async (req, res) => {
  try {
    const lines = await Line.find();
    res.status(200).json(lines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLine = async (req, res) => {
  try {
    const line = await Line.findByIdAndDelete(req.params.id);
    if (!line) return res.status(404).json({ message: 'Line not found' });
    res.status(200).json({ message: 'Line deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLine, getLines, deleteLine };