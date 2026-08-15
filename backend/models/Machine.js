const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  line: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['running', 'idle', 'down'],
    default: 'idle'
  }
}, { timestamps: true });

module.exports = mongoose.model('Machine', machineSchema);