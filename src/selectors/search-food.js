const FoodModel = require('../models/foodModel');

const splitRegexp = /[ .!?\\-]/g;

async function searchFood(dbIds, name, limit) {
  const splittedName = name.split(splitRegexp);

  let foods = [];

  if (splittedName.length === 1) {
    foods = await oneWordSearch(dbIds, splittedName[0], limit);
  }

  if (splittedName.length > 1) {
    foods = await FoodModel.find(
      {
        "name": { $regex: `^${name}`, $options: 'i' },
        dbId: { $in: dbIds }
      },
    );

    if (foods.length < limit) {
      let newFoods = await FoodModel.find(
        {
          "name": { $regex: createSetString(splittedName), $options: 'i' },
          dbId: { $in: dbIds }
        },
      )
      foods = foods.concat(newFoods);
    }
  }


  return foods;
}

function createSetString(splitted) {
  const res = [splitted];

  for (let i = 1; i < splitted.length; i++) {
    res[i] = [...res[i - 1]];
    const shifted = res[i].shift();
    res[i].push(shifted);
  }
  for (let i = 0; i < splitted.length; i++) {
    res[i] = res[i].join('\.*');
  }
  return '(' + res.join(')|(') + ')';
}

async function oneWordSearch(dbIds, firstWord, limit) {
  foods = await FoodModel.find(
    {
      "name": { $regex: `^${firstWord}`, $options: 'i' },
      dbId: { $in: dbIds }
    },
  );

  if (foods.length < limit) {
    const re = new RegExp(`(^|\\s)${firstWord}(?=\\s|$)`, 'i');

    let newFoods = await FoodModel.find(
      {
        "name": { $regex: re },
        dbId: { $in: dbIds }
      },
    )
    foods = foods.concat(newFoods);
  }

  if (foods.length < limit) {
    const re = new RegExp(`(^|\\S)${firstWord}(?=\\S|$)`, 'i');

    let newFoods = await FoodModel.find(
      {
        "name": { $regex: re },
        dbId: { $in: dbIds }
      },
    )
    foods = foods.concat(newFoods);
  }

  return foods;
}

module.exports = {
  searchFood
}
