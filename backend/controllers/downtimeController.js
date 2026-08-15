const Downtime = require('../models/Downtime');
const Machine = require('../models/Machine');

// Start a downtime (also sets machine status to 'down')
const startDowntime = async (req, res) => {
  try {
    const { machine, reason, category, startTime } = req.body;

    const downtime = await Downtime.create({
      machine,
      reason,
      category,
      startTime,
      loggedBy: req.user.id
    });

    await Machine.findByIdAndUpdate(machine, { status: 'down' });

    res.status(201).json(downtime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resolve a downtime (sets endTime, machine back to running)
const resolveDowntime = async (req, res) => {
  try {
    const downtime = await Downtime.findByIdAndUpdate(
      req.params.id,
      { endTime: new Date() },
      { new: true }
    );
    if (!downtime) return res.status(404).json({ message: 'Downtime record not found' });

    await Machine.findByIdAndUpdate(downtime.machine, { status: 'running' });

    res.status(200).json(downtime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDowntimes = async (req, res) => {
  try {
    const downtimes = await Downtime.find()
      .populate('machine', 'name code')
      .populate('loggedBy', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(downtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { startDowntime, resolveDowntime, getDowntimes };