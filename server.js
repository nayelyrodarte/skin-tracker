const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// middleware
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/routine", require("./API/routes/routine"));
app.use("/", express.static("build"));

const PORT = process.env.PORT || 3000;
const host = "0.0.0.0" || "localhost";

app.listen(PORT, host, function (err) {
  console.log(`Levantando servidor en ${process.env.PORT}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get(/^((?!(api)).)*$/, (req, res) =>
    res.sendFile(path.resolve(__dirname, "build"))
  );
}

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("connected with Mongo");
  })
  .catch(function (err) {
    console.log(err);
  });
