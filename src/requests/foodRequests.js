const axios = require('axios');
const oauth = require('axios-oauth-client');
const qs = require('qs');
const { FAT_SECRET_ENTITIES, ONE_HOUR } = require('../entities/Food');

const FS_CLIENT_SECRET = '63fbbc6c774343b8a4a5506a03ee944d';
const FS_CLIENT_ID = 'd84709d0262e4f86817ad2d2da7183f5';

const FC_BASE_URL = 'https://platform.fatsecret.com/rest/server.api';
const FC_AUTH_TOKEN_URL = 'https://oauth.fatsecret.com/connect/token';

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

    return {
      foods: data.foods.food,
      total: data.foods['total_results'],
    };
  } catch (e) {
    console.error('Ошибка поиска на FatSecret', e);
  }

  async function pullLocalFoods() {
    try {

    } catch (e) {
      if (e) {
        console.error('Ошибка авторизации на FatSecret', e);

      }
    }
  }
}

module.exports = {
  authFatSecret,
  searchFatSecret
}
