const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    type: String,

});


module.exports = mongoose.model("Product", productSchema);