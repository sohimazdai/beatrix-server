const FavoritesFoodModel = require('../models/favoritesFoodModel');

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
      } else {
        result = await new FavoritesFoodModel({ userId: userId, favorites: [foodId] });
        await result.save();
      }

      await userFavorites.save();

      res
        .status(200)
        .send(result)
        .end();
    } catch (e) {
      console.log('Ошибка при добавлении в favorites: ' + e);

      res
        .status(503)
        .send({ error: 'Ошибка при добавлении в favorites', success: false })
        .end();
    }
  }

  static async remove(req, res) {
    try {
      const userId = req.body.userId;
      const idsToDelete = req.body.foodIds;

      if (!idsToDelete) throw new Error('Не передан idsToDelete (foodIds)');
      if (!userId) throw new Error('Не передан userId (userId)');

      const result = await FavoritesFoodModel.updateMany(
        { userId },
        { $pullAll: { favorites: idsToDelete } },
      );

      res
        .status(200)
        .send(result)
        .end();
    } catch (e) {
      console.log('Ошибка при удалении из favorites: ' + e);
      res
        .status(503)
        .send({ error: 'Ошибка при удалении из favorites', success: false })
        .end();
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
        .end();
    } catch (e) {
      res
        .status(503)
        .send({ error: 'Ошибка при получении favorites юзера', success: false })
        .end();
    }
  }
}

module.exports = FavoritesController;
