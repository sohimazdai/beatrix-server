const { request } = require('http');
const foodRequests = require('../requests/foodRequests');

class FoodController {
  static async getById(req, res) {
  }

  static async search(req, res) {
    try {
      const searchString = req.body.searchString;

      const search = await foodRequests.searchFatSecret(searchString);

      res.status(200).send(search).end();
    } catch (e) {
      console.log('Ошибка обработки запроса поиска на FatSecret', e);
      res.status(503).send().end();
    }
  }
}

module.exports = FoodController;
