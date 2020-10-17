const numberizeAndFix = require('./numberize-and-fix');

const CALORIES_TO_ENERGY_RELATION = 4.1868;

function convertCaloriesToEnergy(ccal) {
  return numberizeAndFix(ccal * CALORIES_TO_ENERGY_RELATION);
}

function convertEnergyToCalories(kJ) {
  return numberizeAndFix(kJ / CALORIES_TO_ENERGY_RELATION);
}

module.exports = {
  convertEnergyToCalories,
  convertCaloriesToEnergy,
};
