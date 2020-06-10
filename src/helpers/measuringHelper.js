const MGDLtoMMOLrelation = 18.015;

module.exports = {
  GlycemiaMeasuringType: {
    MG_DL: 'mg/dL',
    MMOL_L: 'mmol/L'
  },
  CarbsMeasuringType: {
    BREAD_UNITS: 'breadUnits',
    CARBOHYDRATES: 'carbohydrates',
  },
  CarbsUnitWeightType: {
    TEN: 10,
    ELEVEN: 11,
    TWELVE: 12,
  },
  convertMMOLtoMGDL: function (mmol) {
    return mmol * MGDLtoMMOLrelation;
  },
  convertMGDLtoMMOLL: function (mgdl) {
    return mgdl / MGDLtoMMOLrelation;
  }
}
