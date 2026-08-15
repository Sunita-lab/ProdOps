const mongoose = require('mongoose');

const productionRecordSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductionOrder',
    required: true
  },
  quantityProduced: {
    type: Number,
    required: true
  },
  rejectedQuantity: {
    type: Number,
    default: 0
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ProductionRecord', productionRecordSchema);