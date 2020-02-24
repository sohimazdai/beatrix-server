const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

var app = express();

const PORT = process.env.port || 80;
const URL = "mongodb://localhost:27017";

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
db.once('open', () => console.info('mongo connected'));

app.use(express.urlencoded({
  extended: true
}));

app.use(userRouter);

async function start() {
  try {
    console.info('Connecting to mongo')
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    app.listen(PORT, function () {
      console.log('Listen on port ' + PORT + '...');
    });
  } catch (e) {
    console.log(e)
  }
}

start();