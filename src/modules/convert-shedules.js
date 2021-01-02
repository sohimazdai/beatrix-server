const { TYPES } = require('../entities/Shedule');
const {
  GlycemiaMeasuringType,
  CarbsMeasuringType,
  convertMMOLtoMGDL,
  convertMGDLtoMMOLL,
} = require('../helpers/measuringHelper');

function convertShedulesItem(
  hour, type, prevProperties, currentProperties
) {
  const {
    glycemiaMeasuringType: prevGlycemiaMeasuringType,
    carbsMeasuringType: prevCarbsMeasuringType,
    carbsUnitWeightType: prevCarbsUnitWeightType,
  } = prevProperties;
  const {
    glycemiaMeasuringType: currentGlycemiaMeasuringType,
    carbsMeasuringType: currentCarbsMeasuringType,
    carbsUnitWeightType: currentCarbsUnitWeightType,
  } = currentProperties;

  const carbsUnitWeightType = currentCarbsUnitWeightType || prevCarbsUnitWeightType;

  let item = hour;

  switch (type) {
    case TYPES.ISF:
      if (
        item && prevGlycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L &&
        currentGlycemiaMeasuringType === GlycemiaMeasuringType.MG_DL
      ) {
        item = Math.round(
          convertMMOLtoMGDL(item)
        );
      }
      else if (
        item && prevGlycemiaMeasuringType === GlycemiaMeasuringType.MG_DL &&
        currentGlycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L
      ) {
        item = Number(
          convertMGDLtoMMOLL(item).toFixed(1)
        );
      }
      break;
    case TYPES.CR:
      if (
        item && prevCarbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES &&
        currentCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS
      ) {
        item = Number(
          (item / carbsUnitWeightType).toFixed(1)
        );
      }
      else if (
        item && prevCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS &&
        currentCarbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES
      ) {
        item = Number(
          (item * carbsUnitWeightType).toFixed(1)
        );
      }
      break;
  }


  return item;
}

async function convertShedules(user, shedules, prevProperties, currentProperties) {
  const newShedules = {};

  Object.values(shedules).forEach((shedulesItem => {
    const { type, hours } = shedulesItem;
    newShedules[type] = { type, hours: [] };

    const newHours = [...hours].map((hour => convertShedulesItem(hour, type, prevProperties, currentProperties)));

    user.shedules.set(type, { type, hours: [...newHours] });
  }));
};

module.exports = convertShedules;
