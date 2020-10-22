const {
  Router
} = require('express');
const FavoritesFoodController = require('../controllers/favoritesFoodController');
const routes = require('./routes');
const router = Router();

router.post(routes.FAVORITES_ADD, FavoritesFoodController.add)
router.post(routes.FAVORITES_REMOVE, FavoritesFoodController.remove)
router.post(routes.FAVORITES_GET, FavoritesFoodController.get)
router.post(routes.FAVORITES_SYNC, FavoritesFoodController.sync)

module.exports = router;
