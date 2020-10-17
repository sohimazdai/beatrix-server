const {
  Router
} = require('express');
const FoodController = require('../controllers/foodController');
const routes = require('./routes');
const router = Router();

router.post(routes.FOOD_GET_BY_ID, FoodController.getById)
router.post(routes.FOOD_SEARCH, FoodController.search)
router.post(routes.FOOD_ADD_PRODUCT, FoodController.addProduct)
router.post(routes.FOOD_GET_PRODUCTS_BY_DB_ID, FoodController.getProductsByDbId)
router.post(routes.FOOD_SEARCH_DBS_PRODUCTS, FoodController.searchDbsProducts)
router.post(routes.FOOD_REMOVE_DB, FoodController.deleteDb)
router.post(routes.FOOD_GET_DBS_LIST, FoodController.getDBsList)
router.post(routes.FOOD_GET_BY_BARCODE, FoodController.getByBarcode)
router.post(routes.FOOD_GET_ALL_WITH_BARCODE, FoodController.getAllWithBarcode)
router.post(routes.FOOD_SEARCH_BY_REGION, FoodController.searchRegion)

module.exports = router;
