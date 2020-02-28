const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./src/routes/noteRoutes');
const userRoutes = require('./src/routes/userRoutes');

var app = express();

const PORT = process.env.port || 3000; //TODO:
const URL = "mongodb://localhost:27017";
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
db.once('open', () => console.info('mongo connected'));


app.use(requestLogger);
app.use(responseAccessSetter);
app.use(express.urlencoded({
  extended: true
}));
app.use(noteRoutes);
app.use(userRoutes);
app.use(logErrors);


async function start() {
  try {
    console.info('Connecting to mongo')
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
      .then(() => {
        app.listen(PORT, function () {
          console.log('Listen on port ' + PORT + '...');
        })
      });
  } catch (e) {
    console.log('App start error: ', e)
  }
}

start();

function requestLogger(req, res, next) {
  const performance = Date.now();
  console.log('Time:', Date.now());
  console.log(req.originalUrl)
  try {
    next();
    console.log(`Request completed in ${Date.now() - performance} miliseconds`)
  } catch (e) {
    console.error('Request cancelled with error: ', e)
  }
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
