const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

app.use('/api/routine', require('./API/routes/routine'));
app.use('/', express.static('public'));
app.use('/API', express.static('API'));

app.listen(process.env.PORT, function () {
  console.log('Levantando servidor en');
  console.log(`http://localhost:${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log('connected with Mongo');
  })
  .catch(function (err) {
    console.log(err);
  });
