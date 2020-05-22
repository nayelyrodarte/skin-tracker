const mongoose = require('mongoose');

const daySchema = mongoose.Schema(
  {
    day: String,
    products: Array,
  },
  { collection: 'weeks' }
);

module.exports = mongoose.model('Day', daySchema);
