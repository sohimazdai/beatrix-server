const axios = require('axios');
const oauth = require('axios-oauth-client');
const qs = require('qs');
const { FAT_SECRET_ENTITIES, ONE_HOUR } = require('../entities/Food');

const fatSecretSearchMapper = require('../mappers/fat-secret-food-mapper');
const oFFMapper = require('../mappers/open-food-facts-mapper');
const createQueryString = require('../utils/create-query-string');

const FS_CLIENT_SECRET = '63fbbc6c774343b8a4a5506a03ee944d';
const FS_CLIENT_ID = 'd84709d0262e4f86817ad2d2da7183f5';

const FC_BASE_URL = 'https://platform.fatsecret.com/rest/server.api';
const FC_AUTH_TOKEN_URL = 'https://oauth.fatsecret.com/connect/token';

const OFF_BASE_URL = `https://world.openfoodfacts.org/cgi/search.pl`;

async function authFatSecret() {
  try {
    const authData = await oauth.client(
      axios.create(),
      {
        method: 'POST',
        url: FC_AUTH_TOKEN_URL,
        grant_type: 'client_credentials',
        client_id: FS_CLIENT_ID,
        client_secret: FS_CLIENT_SECRET,
        scope: 'premier',
      }
    )();

    FAT_SECRET_ENTITIES.requestedAtInHours = new Date().getTime() / ONE_HOUR;
    FAT_SECRET_ENTITIES.expiresIn = authData['expires_in'] / (60 * 60);
    FAT_SECRET_ENTITIES.accessToken = authData['access_token'];
  } catch (e) {
    console.error('Ошибка авторизации на FatSecret', e);
  }
}

async function searchFatSecret(searchString) {
  try {
    const query = qs.stringify({
      method: 'foods.search',
      format: 'json',
      search_expression: searchString,
      generic_description: 'weight',
    });
    const url = `${FC_BASE_URL}?${query}`;

    var getOptions = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FAT_SECRET_ENTITIES.accessToken}`,
      },
    };

    const { data } = await axios(getOptions);

    return fatSecretSearchMapper(data.foods.food);
  } catch (e) {
    console.error('Ошибка поиска на FatSecret', e);

    return {}
  }
}

async function searchOpenFoodFacts(key) {
  const query = qs.stringify({
    search_terms: key,
    search_simple: 1,
    action: 'process',
    json: 1,
  });
  const url = `${OFF_BASE_URL}?${query}`;


  const getOptions = {
    method: "GET",
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios(getOptions);

    return oFFMapper(data.products);
  } catch (e) {
    console.error('Ошибка поиска на Open Food Facts', e);
    return {};
  }
}

module.exports = {
  authFatSecret,
  searchFatSecret,
  searchOpenFoodFacts,
}
