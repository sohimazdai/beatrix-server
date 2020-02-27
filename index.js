const express = require('express');
const mongoose = require('mongoose');
const noteRouter = require('./src/routes/note');

var app = express();

const PORT = process.env.port || 80;
const URL = "mongodb://localhost:27017";

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
db.once('open', () => console.info('mongo connected'));


function requestLogger(req, res, next) {
  console.log('Time:', Date.now());
  console.log(req.originalUrl)
  next();
}

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next();
}

function responseAccessSetter(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Session, Authorization'
  });
  next();
}
app.use(requestLogger);
app.use(responseAccessSetter);
app.use(express.urlencoded({
  extended: true
}));
app.use(noteRouter);
app.use(logErrors);


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