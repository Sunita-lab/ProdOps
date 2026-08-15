const ProductionOrder = require('../models/ProductionOrder');
const ProductionRecord = require('../models/ProductionRecord');
const Machine = require('../models/Machine');
const Downtime = require('../models/Downtime');
const QualityInspection = require('../models/QualityInspection');

const getSummary = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Orders
    const totalOrders = await ProductionOrder.countDocuments();
    const activeOrders = await ProductionOrder.countDocuments({ status: 'in-progress' });
    const completedOrders = await ProductionOrder.countDocuments({ status: 'completed' });

    // Today's output (sum of quantityProduced from records created today)
    const todayRecords = await ProductionRecord.find({ createdAt: { $gte: todayStart } });
    const todayOutput = todayRecords.reduce((sum, r) => sum + r.quantityProduced, 0);

    // Machines currently down
    const machinesDown = await Machine.countDocuments({ status: 'down' });
    const totalMachines = await Machine.countDocuments();

    // Active (unresolved) downtimes
    const activeDowntimes = await Downtime.countDocuments({ endTime: { $exists: false } });

    // Quality — rejection rate (all-time)
    const inspections = await QualityInspection.find();
    const totalInspected = inspections.reduce((sum, i) => sum + i.inspectedQuantity, 0);
    const totalFailed = inspections.reduce((sum, i) => sum + i.failedQuantity, 0);
    const rejectionRate = totalInspected > 0 ? ((totalFailed / totalInspected) * 100).toFixed(1) : 0;

    res.status(200).json({
      totalOrders,
      activeOrders,
      completedOrders,
      todayOutput,
      machinesDown,
      totalMachines,
      activeDowntimes,
      rejectionRate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSummary };