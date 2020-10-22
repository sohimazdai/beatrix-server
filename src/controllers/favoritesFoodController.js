const FavoritesFoodModel = require('../models/favoritesFoodModel');
const foodModel = require('../models/foodModel');

class FavoritesController {
  static async add(req, res) {
    try {
      const userId = req.body.userId;
      const foodId = req.body.foodId;

      if (!foodId) throw new Error('Не передан foodId (foodId)');
      if (!userId) throw new Error('Не передан userId (userId)');

      const userFavorites = await FavoritesFoodModel.findOne({ userId });

      let result;

      if (!!userFavorites) {
        result = await FavoritesFoodModel.updateOne(
          { userId },
          { $push: { favorites: foodId } }
        );

        await userFavorites.save();
      } else {
        result = await new FavoritesFoodModel({ userId: userId, favorites: [foodId] });

        await result.save();
      }

      res
        .status(200)
        .send(result)
    } catch (e) {
      console.log('Ошибка при добавлении в favorites: ' + e);

      res
        .status(503)
        .send({ error: 'Ошибка при добавлении в favorites', e })
    }
  }

  static async remove(req, res) {
    try {
      const userId = req.body.userId;
      const idToDelete = req.body.foodId;

      if (!idToDelete) throw new Error('Не передан idToDelete (foodId)');
      if (!userId) throw new Error('Не передан userId (userId)');

      const result = await FavoritesFoodModel.updateMany(
        { userId },
        { $pull: { favorites: idToDelete } },
      );

      res
        .status(200)
        .send(result)
    } catch (e) {
      console.log('Ошибка при удалении из favorites: ' + e);
      res
        .status(503)
        .send({ error: 'Ошибка при удалении из favorites', e })
    }
  }

  static async get(req, res) {
    try {
      const userId = req.body.userId;

      if (!userId) throw new Error('Не передан userId (userId)');

      const favorites = await FavoritesFoodModel.findOne({ userId });

      res
        .status(200)
        .send(favorites)
    } catch (e) {
      console.log('Ошибка при получении favorites: ' + e);

      res
        .status(500)
        .send({ error: 'Ошибка при получении favorites юзера', e })
    }
  }

  static async sync(req, res) {
    try {
      const userId = req.body.userId;
      const favorites = req.body.favorites;
      if (!userId) throw new Error('Не передан userId (userId)');
      if (!favorites) throw new Error('Не передан favorites (favorites)');


      const result = await FavoritesFoodModel.updateMany(
        { userId },
        { favorites: favorites },
      );

      res
        .status(200)
        .send(result)
    } catch (e) {
      console.log('Ошибка при синхронизации favorites: ' + e);

      res
        .status(503)
        .send({ error: 'Ошибка при получении favorites юзера', e })
    }
  }
}

module.exports = FavoritesController;
