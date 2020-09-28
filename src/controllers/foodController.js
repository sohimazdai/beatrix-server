const FoodModel = require('../models/foodModel');
const foodRequests = require('../requests/foodRequests');

class FoodController {
  static async getById(req, res) {
    try {
      const foodId = req.body.foodId;
      if (!foodId) throw new Error('Не передан foodId');

      const food = await FoodModel.findOne({ id: foodId });

      if (!food) {
        console.log('Ошибка получения продукта из БД: FOOD__NOT_FOUND', e);

        res
          .status(503)
          .send()
          .end();
      } else {
        res
          .status(200)
          .send(food)
          .end();
      }
    } catch (e) {
      console.log('Ошибка получения продукта из БД', e);
      res
        .status(503)
        .send('Ошибка получения продукта из БД: ' + e)
        .end();
    }
  }

  static async search(req, res) {
    try {
      const searchString = req.body.searchString;

      const searchResult = await foodRequests.searchFatSecret(searchString);

      res.status(200).send(searchResult).end();
    } catch (e) {
      console.log('Ошибка обработки комлпексного запроса поиска на FatSecret', e);
      res
        .status(503)
        .send('Ошибка обработки запроса поиска на FatSecret: ' + e)
        .end();
    }
  }

  static async addProduct(req, res) {
    try {
      const product = req.body.product;

      const sameProduct = await FoodModel.findOne({
        sourceId: product.sourceId,
        dbId: product.dbId,
      });

      if (!sameProduct) {
        const newProduct = createProduct(product);
        await newProduct.save();
      }

      res.status(200).send({ success: true }).end();
    } catch (e) {
      console.log('Ошибка добавления продукта в БД', e);
      res.status(503).send('Ошибка добавления продукта в БД: ' + e).end();
    }
  }

  static async getProductsByDbId(req, res) {
    try {
      const dbId = req.body.dbId;

      const products = await FoodModel.find({ dbId })

      res.status(200).send(products).end();
    } catch (e) {
      console.log('Ошибка выдачи продуктов по идентификатору БД', e);
      res.status(503).send('Ошибка выдачи продуктов по идентификатору БД: ' + e).end();
    }
  }

  static async searchDbsProducts(req, res) {
    try {
      const dbs = req.body.dbs;
      const searchOptions = req.body.searchOptions;

      if (!dbs) throw new Error('dbs field is not defined');
      if (!searchOptions) throw new Error('searchOptions field is not defined');

      const { name, ...restOptions } = searchOptions;
      if (!name) throw new Error('name field is not defined');

      let products = [];

      const databasesIterator = dbs.entries();
      let db = databasesIterator.next();

      while (!db.done) {
        const dbId = db.value[1];

        const dbFoods = await FoodModel.find({
          ...restOptions,
          name: { "$regex": name, "$options": "i" },
          dbId,
        })

        products = products.concat(dbFoods);

        db = databasesIterator.next();
      }

      const response = {
        foods: products.slice(0, 10),
        total: products.length,
      }

      res
        .status(200)
        .send(response)
        .end();
    } catch (e) {
      console.log('Ошибка получения продуктов с локальной БД', e);
      res
        .status(503)
        .send({ error: 'Ошибка получения продуктов с локальной БД' + e })
        .end();
    }
  }

  static async deleteDb(req, res) {
    try {
      const dataBaseId = req.body.dbId;
      if (!dataBaseId) throw new Error('Не указан dataBaseId (dbId)');

      const deleted = await FoodModel.deleteMany({ dbId: dataBaseId });

      res
        .status(200)
        .send(deleted)
        .end();
    } catch (e) {
      console.log('Ошибка удаления локальной БД', e);
      res
        .status(503)
        .send({ error: 'Ошибка удаления локальной БД' + e })
        .end();
    }
  }

  static async getDBsList(req, res) {
    try {
      const dbs = await FoodModel.distinct('dbId');

      res
        .status(200)
        .send(dbs)
        .end()
    } catch (e) {
      console.log('Ошибка запроса списка идентификаторов БД', e);
      res
        .status(503)
        .send({ error: 'Ошибка запроса списка идентификаторов БД' + e })
        .end();
    }
  }

  static async getByBarcode(req, res) {
    try {
      const barcode = req.body.barcode;

      const food = await FoodModel.findOne({ barcode: barcode });

      res
        .status(200)
        .send(food)
        .end()
    } catch (e) {
      console.log('Ошибка запроса продукта по штрихкоду', e);
      res
        .status(503)
        .send({ error: 'Ошибка запроса продукта по штрихкоду' + e })
        .end();
    }
  }

  static async getAllWithBarcode(req, res) {
    try {
      const foods = await FoodModel.find({
        barcode: { "$regex": '', "$options": "i" },
      });

      res
        .status(200)
        .send(foods)
        .end()
    } catch (e) {
      console.log('Ошибка запроса всех продуктов со штрихкодом', e);
      res
        .status(503)
        .send({ error: 'Ошибка запроса всех продуктов со штрихкодом' + e })
        .end();
    }
  }
}

function createProduct(product) {
  return new FoodModel({ ...product });
}

module.exports = FoodController;
