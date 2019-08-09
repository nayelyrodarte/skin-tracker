const Week = require('../models/Week');

function getWeek(req, res) {

    Week.find()
        .then(function (week) {
            res.json({
                // para que regrese como objeto
                week: week[0]
            })
        })

        .catch(function (err) {
            res.send(err)
        })

}


module.exports = getWeek