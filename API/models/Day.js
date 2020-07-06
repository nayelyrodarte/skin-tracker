const mongoose = require('mongoose');

const daySchema = mongoose.Schema(
  {
    name: String,
    type: String,
    date: Date,
    days: Array,
  },
  { collection: 'weeks' }
);

module.exports = mongoose.model('Day', daySchema);
