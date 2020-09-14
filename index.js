const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./src/routes/noteRoutes');
const userRoutes = require('./src/routes/userRoutes');
const testRoutes = require('./src/routes/check');
const exportRoutes = require('./src/routes/exportRoutes');
const onboardingRoutes = require('./src/routes/onboardingRoutes');
const tagRoutes = require('./src/routes/tagRoutes');
const appRoutes = require('./src/routes/appRoutes');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { authFatSecret, getProductById } = require('./src/requests/foodRequests');
const { FAT_SECRET_ENTITIES } = require('./src/entities/Food');

var app = express();

const PORT = process.env.port || 80;
const URL = "mongodb://localhost:27017";
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
db.once('open', () => console.info('mongo connected'));

app.use(checker);
app.use(logger('dev'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(responseAccessSetter);
app.use(isItTimeToUpdateAccessToken);
app.use(testRoutes)
app.use(noteRoutes);
app.use(userRoutes);
app.use(exportRoutes);
app.use(onboardingRoutes);
app.use(tagRoutes);
app.use(appRoutes);

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

function responseAccessSetter(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
}

function checker(req, res, next) {
  if (req.query && req.query.key === "h4NIt1NS") {
    req.originalUrl = req.originalUrl.split('?')[0];
    next();
  }
}

function isItTimeToUpdateAccessToken(req, res, next) {
  if (!FAT_SECRET_ENTITIES) {
    authFatSecret();
  } else if (!FAT_SECRET_ENTITIES.accessToken) {
    authFatSecret();
  } else {
    const looseTime = FAT_SECRET_ENTITIES.requestedAt + FAT_SECRET_ENTITIES.expiresIn * 1000
    const looseInHours = (looseTime - new Date().getTime()) / (1000 * 60 * 60);

    if (looseInHours < 2) {
      authFatSecret();
    } else {
    }
  }

  next();
}
