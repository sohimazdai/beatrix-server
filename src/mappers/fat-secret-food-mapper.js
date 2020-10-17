const uuid = require('uuid');
const { FoodDatabase, MAX_RESPONSE_ARRAY_SIZE } = require('../entities/Food');
const parseUglyFatSecretString = require('../helpers/parse-ugly-fatsecret-string');

/**
 * Transform Fatsecret search API request response to Map
 * 
 * @param {Array<Object>} products from fatSecret search API
 * 
 * @returns {Map<string, Object>}
 */
const fatSecretSearchMapper = (products) => {

  const foods = {};

  if (!products || !(products.length > 0)) return foods;

  products.slice(0, MAX_RESPONSE_ARRAY_SIZE).forEach((product) => {
    if (!product['food_id'] || !product['food_description'] || !product['food_name']) return;

    try {
      const nutrients = parseUglyFatSecretString(product['food_description']);

      const id = uuid.v1();

      const food = {
        id,
        sourceId: product['food_id'],
        dbId: FoodDatabase.FAT_SECRET_US,
        brandName: product['brand_name'],
        name: product['food_name'],
        nutrients,
      };

      foods[id] = food;
    } catch (e) {
      //ITS NEED TO SKIP BROKEN FOODS
      return
    }
  })

  return foods;
}

module.exports = fatSecretSearchMapper;
