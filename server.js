const express = require("express");
const app = express();
const dotenv = require("dotenv").config(); // para crear variables de entorno 
const mongoose = require("mongoose");

const api = require("./api");
app.use("/api", api); //cualquier peticion a /api se contesta con api (archivo)
app.use('/', express.static("public"))

// process es el objeto global de los env 
app.listen(process.env.PORT, function () {
    console.log("Levantando servidor en");
    console.log(`http://localhost:${process.env.PORT}`);
});

// conexión a Mongo
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
    .then(function (result) {
        console.log("connected with Mongo");
    })
    .catch(function (err) {
        console.log(err);
    })

