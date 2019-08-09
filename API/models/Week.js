const mongoose = require("mongoose");

const weekSchema = mongoose.Schema({
    days: Array
})


// aqui se determina el nombre del modelo
module.exports = mongoose.model("Week", weekSchema);