const mongoose = require('mongoose');

const daySchema = mongoose.Schema(
  {
    day: String,
    products: [],
  },
  { collection: 'weeks' }
);

module.exports = mongoose.model('Day', daySchema);
