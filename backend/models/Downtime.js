const mongoose = require('mongoose');

const downtimeSchema = new mongoose.Schema({
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['breakdown', 'maintenance', 'changeover', 'material-shortage', 'other'],
    default: 'other'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  loggedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Downtime', downtimeSchema);