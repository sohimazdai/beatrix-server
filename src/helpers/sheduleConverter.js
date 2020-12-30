const {
  GlycemiaMeasuringType,
  CarbsMeasuringType,
  convertMMOLtoMGDL,
  convertMGDLtoMMOLL,
} = require('./measuringHelper');

function convertSheduleItem(
  sheduleItem, prevProperties, currentProperties
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

  if (
    sheduleItem.insulinSensitivityFactor && prevGlycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L &&
    currentGlycemiaMeasuringType === GlycemiaMeasuringType.MG_DL
  ) {
    sheduleItem.insulinSensitivityFactor = Math.round(
      convertMMOLtoMGDL(sheduleItem.insulinSensitivityFactor)
    );
  }
  else if (
    sheduleItem.insulinSensitivityFactor && prevGlycemiaMeasuringType === GlycemiaMeasuringType.MG_DL &&
    currentGlycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L
  ) {
    sheduleItem.insulinSensitivityFactor = Number(
      convertMGDLtoMMOLL(sheduleItem.insulinSensitivityFactor).toFixed(1)
    );
  }

  if (
    sheduleItem.carbohydrateRatio && prevCarbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES &&
    currentCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS
  ) {
    sheduleItem.carbohydrateRatio = Number(
      (sheduleItem.carbohydrateRatio / carbsUnitWeightType).toFixed(1)
    );
  }
  else if (
    sheduleItem.carbohydrateRatio && prevCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS &&
    currentCarbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES
  ) {
    sheduleItem.carbohydrateRatio = Number(
      (sheduleItem.carbohydrateRatio * carbsUnitWeightType).toFixed(1)
    );
  }

  return sheduleItem;
}

async function convertShedule(user, shedule, prevProperties, currentProperties) {
  Object.values(shedule).forEach((sheduleItem => {
    const convertedSheduleItem = convertSheduleItem(sheduleItem, prevProperties, currentProperties);

    user.shedule.set(`${sheduleItem.id}`, convertedSheduleItem);
  }));
};

module.exports = convertShedule;
