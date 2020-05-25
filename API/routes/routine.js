const express = require('express');
const router = express.Router();
const Day = require('../models/Day');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// @route GET api/routine
// Get complete routine of the
router.get('/', async (req, res) => {
  try {
    const routine = await Day.find();
    res.json(routine);
    console.log(routine);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Error del servidor').end();
  }
});

// @route PUT api/routine/:day
// Add individual products to user selected days of the week
router.put('/:day', async (req, res) => {
  try {
    const day = await Day.findOneAndUpdate(
      { day: req.params.day },
      { $push: { products: req.body } }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Error del servidor').end();
  }
});

module.exports = router;
