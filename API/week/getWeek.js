const Week = require('../models/Week');

function getWeek(req, res) {
  Week.find()
    .then(function (data) {
      res.json({
        data: data,
      });
    })

    .catch(function (err) {
      res.send(err);
    });
}

module.exports = getWeek;
