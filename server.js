const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

app.use('/api/routine', require('./API/routes/routine'));
app.use('/', express.static('build'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

cors();

const PORT = process.env.PORT || 3000;
const host = '0.0.0.0' || 'localhost';

app.listen(PORT, host, function () {
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
