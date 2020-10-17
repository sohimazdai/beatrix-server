const { MAX_RESPONSE_ARRAY_SIZE } = require('../entities/Food');
const localDBFoodMapper = require('../mappers/local-db-food-mapper');
const { searchFood } = require('../selectors/search-food');

async function searchDbsProducts(dbs, name) {
  try {
    if (!dbs) throw new Error('dbs field is not defined');
    if (!name) throw new Error('name field is not defined');

    const products = await searchFood(dbs, name, MAX_RESPONSE_ARRAY_SIZE)

    return localDBFoodMapper(products.slice(0, MAX_RESPONSE_ARRAY_SIZE));
  } catch (e) {
    console.log(__dirname + '/' + __filename + " catch error: ", e);
    return {};
  }
}

module.exports = searchDbsProducts;
