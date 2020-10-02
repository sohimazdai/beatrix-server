const FoodModel = require('../models/foodModel');
const foodRequests = require('../requests/foodRequests');
const { searchFood } = require('../selectors/search-food');

class FoodController {
  static async getById(req, res) {
    try {
      const foodId = req.body.foodId;
      if (!foodId) throw new Error('Не передан foodId');

      const food = await FoodModel.findOne({ id: foodId });

      if (!food) {
        console.log(__dirname + '/' + __filename + "Ошибка получения продукта из БД: FOOD__NOT_FOUND");
        res.status(503);
        res.send();
      } else {
        res
          .status(200)
          .send(food)
          .end();
      }
    } catch (e) {
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
    }
  }

  static async search(req, res) {
    try {
      const searchString = req.body.searchString;

      const searchResult = await foodRequests.searchFatSecret(searchString);

      res.status(200).send(searchResult).end();
    } catch (e) {
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
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
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
    }
  }

  static async getProductsByDbId(req, res) {
    try {
      const dbId = req.body.dbId;

      const products = await FoodModel.find({ dbId })

      res.status(200).send(products).end();
    } catch (e) {
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
    }
  }

  static async searchDbsProducts(req, res) {
    try {
      const MAX_FOODS = 10;

      const dbs = req.body.dbs;
      const searchOptions = req.body.searchOptions;

      if (!dbs) throw new Error('dbs field is not defined');
      if (!searchOptions) throw new Error('searchOptions field is not defined');

      const { name } = searchOptions;
      if (!name) throw new Error('name field is not defined');

      const products = await searchFood(dbs, name, MAX_FOODS)

      const response = {
        foods: products.slice(0, MAX_FOODS),
        total: products.length,
      }

      res
        .status(200)
        .send(response)
        .end();
    } catch (e) {
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
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
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
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
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
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
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
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
      console.log(__dirname + '/' + __filename + " catch error: ", e);
      res.status(400);
      res.send(e.message)
    }
  }
}

function createProduct(product) {
  return new FoodModel({ ...product });
}

module.exports = FoodController;
