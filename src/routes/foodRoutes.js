const {
  Router
} = require('express');
const FoodController = require('../controllers/foodController');
const routes = require('./routes');
const router = Router();

router.post(routes.FOOD_SEARCH, FoodController.search)

module.exports = router;
