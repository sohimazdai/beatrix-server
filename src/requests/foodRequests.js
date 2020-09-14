var request = require('request');
const { FAT_SECRET_ENTITIES } = require('../entities/Food');

const FS_CLIENT_SECRET = '63fbbc6c774343b8a4a5506a03ee944d';
const FS_CLIENT_ID = 'd84709d0262e4f86817ad2d2da7183f5';

const FC_GET_BASE_URL = 'https://platform.fatsecret.com/rest/server.api';
const FC_AUTH_TOKEN_URL = 'https://oauth.fatsecret.com/connect/token';

var options = {
  url: FC_AUTH_TOKEN_URL,
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

    FAT_SECRET_ENTITIES.requestedAt = new Date();
    FAT_SECRET_ENTITIES.expiresIn = body['expires_in'];
    FAT_SECRET_ENTITIES.accessToken = body['access_token'];

    getProductById(33691);

    console.log(body);
  });
};


async function getProductById(id) {
  const baseUrl = FC_GET_BASE_URL;
  const query = `method=food.get.v2&food_id=${id}&format=json`;
  const url = `${baseUrl}?${query}`;
  var getOptions = {
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${FAT_SECRET_ENTITIES.accessToken}`,
    },
    json: true
  };

  try {
    const response = await request(getOptions, (error, res, body) => {
      if (error) throw error;

      console.log('🤖🤖🤖🤖 body', body.food.servings);
    });



    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  authFatSecret,
  getProductById
}
