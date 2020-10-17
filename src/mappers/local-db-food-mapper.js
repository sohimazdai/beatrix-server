function localDBFoodMapper(foods) {
  return foods.reduce((foodList, food) => {
    foodList[food.id] = food
    return foodList;
  }, {});
}

module.exports = localDBFoodMapper;
