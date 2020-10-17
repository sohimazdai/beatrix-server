const numberizeAndFix = require('./numberize-and-fix');
const { convertCaloriesToEnergy, convertEnergyToCalories } = require('./convert-nutrients');

const KEYS = {
  Calories: 'calories',
  Energy: 'energy',
  Fat: 'fats',
  Carbs: 'carbohydrates',
  Protein: 'proteins',
}

/**
 * Fat secret returns very ugly string kinda 'Product per 100g | carbs: 20 | ...'
 * @param {Object} fsNutrients nutrients of fs product
 * 
 * @returns {Object}
 */
function parseUglyFatSecretString(fsNutrients) {
  const parted = fsNutrients.split(' - ');
  const container = parted[0];
  const isPer100Gramms = container === 'Per 100g';

  if (!isPer100Gramms) throw new Error();

  const nutrients = {};
  const nutrientsArray = parted[1].split(' | ');

  for (const nutrient of nutrientsArray) {
    const parsedNutrient = nutrient.split(': ');
    const key = KEYS[parsedNutrient[0]];
    const valueNum = parsedNutrient[1].replace(/[^\d.-]/g, '')

    if (key) {
      nutrients[key] = numberizeAndFix(valueNum);
    }
  }

  nutrients.energy = numberizeAndFix(nutrients.energy || convertCaloriesToEnergy(nutrients.calories));
  nutrients.calories = numberizeAndFix(nutrients.calories || convertEnergyToCalories(nutrients.energy));

  return nutrients;
}

module.exports = parseUglyFatSecretString;
