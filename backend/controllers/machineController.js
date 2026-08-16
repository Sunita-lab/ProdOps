const Machine = require('../models/Machine');

const createMachine = async (req, res) => {
  try {
    const machine = await Machine.create(req.body);
    res.status(201).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMachine = async (req, res) => {
  try {
    const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!machine) return res.status(404).json({ message: 'Machine not found' });
    res.status(200).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findByIdAndDelete(req.params.id);
    if (!machine) return res.status(404).json({ message: 'Machine not found' });
    res.status(200).json({ message: 'Machine deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMachine, getMachines, updateMachine, deleteMachine };