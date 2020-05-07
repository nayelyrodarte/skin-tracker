const Week = require('../models/Week');

function putWeek(req, res) {
  Week.find()
    .then((weeks) => weeks[0])
    .then((week) => {
      week = req.body.days;
      week.save().then((response) => res.json({ msg: 'actualizado' }));
    });
}

module.exports = putWeek;
