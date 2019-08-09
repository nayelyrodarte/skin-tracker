// INDEX DE LA API
// Se manejan las rutas 

const express = require("express");
const router = express.Router(); // para manejar middleware


const week = require("./week");
const products = require("./products");


router.use(express.json());


// maneja rutas de la api & de donde va a jalar la info
router.use("/week", week);
router.use("/products", products);

// peticiones a la raiz, regresa las distintas rutas la api

router.all("/", function (request, response) {
    response.json({
        "week": `http://localhost:${process.env.PORT}/week`,
        "products": `http://localhost.${process.env.PORT}/products`
    })
})


// para importar
module.exports = router; 