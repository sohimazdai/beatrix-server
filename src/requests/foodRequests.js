var request = require('request');

const FS_CLIENT_SECRET = '63fbbc6c774343b8a4a5506a03ee944d';
const FS_CLIENT_ID = 'd84709d0262e4f86817ad2d2da7183f5';

var options = {
  url: 'https://oauth.fatsecret.com/connect/token',
  method: 'POST',
  auth: {
    user: FS_CLIENT_ID,
    password: FS_CLIENT_SECRET,
  },
  headers: { 'content-type': 'application/json' },
  form: {
    'grant_type': 'client_credentials',
    'scope': 'basic'
  },
  json: true
};

function authFatSecret() {
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
};

module.exports = {
  authFatSecret
}
