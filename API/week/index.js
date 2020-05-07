const express = require('express');
const router = express.Router();

const getWeek = require('./getWeek');
const editWeek = require('./putWeek');

// manejador de los cambios que pasan en las URL
router.get('/', getWeek);
router.put('/', editWeek);

module.exports = router;
