// INDEX de products


const express = require("express");
const router = express.Router();

const getProducts = require("./getProducts");
const postProducts = require("./postProducts");


// manejador de los cambios que pasan en las URL
router.get("/", getProducts);
router.post("/", postProducts);



module.exports = router; 