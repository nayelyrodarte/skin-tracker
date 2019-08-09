//traer todos los productos
const Product = require('../models/Product');

function getProducts(req, res) {

    Product.find()
        .then(function (products) {
            res.json({

                // se envia objeto con la lista de productos
                products: products
            })
        })

        .catch(function (err) {
            res.send(err)
        })

}


module.exports = getProducts 