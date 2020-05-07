const express = require('express');
const router = express.Router();

const week = require('./week');

router.use(express.json());
router.use('/', week);

// router.all('/', function(request, response) {
//   response.json({
//     week: `http://localhost:${process.env.PORT}/weeks`,
//     //products: `http://localhost.${process.env.PORT}/products`
//   });
// });

module.exports = router;
