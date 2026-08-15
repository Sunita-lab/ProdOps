const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  unit: {
    type: String,
    required: true,
    default: 'pcs'
  },
  standardCycleTime: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);