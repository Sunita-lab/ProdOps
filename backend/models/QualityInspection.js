const mongoose = require('mongoose');

const qualityInspectionSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductionOrder',
    required: true
  },
  inspectedQuantity: {
    type: Number,
    required: true
  },
  passedQuantity: {
    type: Number,
    required: true
  },
  failedQuantity: {
    type: Number,
    required: true
  },
  defectType: {
    type: String,
    enum: ['none', 'dimensional', 'surface', 'material', 'assembly', 'other'],
    default: 'none'
  },
  remarks: {
    type: String
  },
  inspectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('QualityInspection', qualityInspectionSchema);