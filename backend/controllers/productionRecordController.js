const ProductionRecord = require('../models/ProductionRecord');
const ProductionOrder = require('../models/ProductionOrder');

const createRecord = async (req, res) => {
  try {
    const { order, quantityProduced, rejectedQuantity } = req.body;

    // Step 1: create the record
    const record = await ProductionRecord.create({
      order,
      quantityProduced,
      rejectedQuantity,
      recordedBy: req.user.id
    });

    // Step 2: update the parent order's producedQuantity
    const productionOrder = await ProductionOrder.findById(order);
    if (!productionOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    productionOrder.producedQuantity += Number(quantityProduced);

    // Step 3: auto-update status based on progress
    if (productionOrder.producedQuantity >= productionOrder.targetQuantity) {
      productionOrder.status = 'completed';
    } else if (productionOrder.producedQuantity > 0) {
      productionOrder.status = 'in-progress';
    }

    await productionOrder.save();

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecords = async (req, res) => {
  try {
    const records = await ProductionRecord.find()
      .populate({
        path: 'order',
        select: 'orderNumber product',
        populate: { path: 'product', select: 'name' }
      })
      .populate('recordedBy', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecordsByOrder = async (req, res) => {
  try {
    const records = await ProductionRecord.find({ order: req.params.orderId })
      .populate('recordedBy', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRecord, getRecords, getRecordsByOrder };