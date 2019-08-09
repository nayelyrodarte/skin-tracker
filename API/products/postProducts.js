// Usar Schema (como si fuera un molde) para postear producto nuevo

const Product = require("../models/Product")


function postProducts(req, resp) {
    const newProduct = new Product({
        name: req.body.name,
        type: req.body.type,
    });


    // mandar a BD MONGO
    newProduct.save()
        .then(function (newProduct) {
            resp.json({ message: "Se agregó producto" })
        })

        .catch(function (err) {
            resp.json(err)
        })

}

module.exports = postProducts