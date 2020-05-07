const mongoose = require('mongoose');

const weekSchema = mongoose.Schema({
  _id: Object,
  day: String,
  products: Object,
});

module.exports = mongoose.model('Week', weekSchema);
