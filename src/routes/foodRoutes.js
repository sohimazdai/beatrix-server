const {
  Router
} = require('express');
const FoodController = require('../controllers/foodController');
const routes = require('./routes');
const router = Router();

router.post(routes.FOOD_GET_BY_ID, FoodController.getById)

module.exports = router;
