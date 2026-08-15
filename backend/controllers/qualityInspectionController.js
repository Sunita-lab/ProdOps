const QualityInspection = require('../models/QualityInspection');

const createInspection = async (req, res) => {
  try {
    const { order, inspectedQuantity, passedQuantity, failedQuantity, defectType, remarks } = req.body;

    if (Number(passedQuantity) + Number(failedQuantity) !== Number(inspectedQuantity)) {
      return res.status(400).json({ message: 'Passed + Failed must equal Inspected quantity' });
    }

    const inspection = await QualityInspection.create({
      order,
      inspectedQuantity,
      passedQuantity,
      failedQuantity,
      defectType,
      remarks,
      inspectedBy: req.user.id
    });

    res.status(201).json(inspection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInspections = async (req, res) => {
  try {
    const inspections = await QualityInspection.find()
      .populate({
        path: 'order',
        select: 'orderNumber product',
        populate: { path: 'product', select: 'name' }
      })
      .populate('inspectedBy', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(inspections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createInspection, getInspections };