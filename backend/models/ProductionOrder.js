const mongoose = require('mongoose');

const productionOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift',
    required: true
  },
  targetQuantity: {
    type: Number,
    required: true
  },
  producedQuantity: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('ProductionOrder', productionOrderSchema);