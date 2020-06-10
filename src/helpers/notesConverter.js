const NoteModel = require('../models/noteModel');
const UserModel = require('../models/userModel');
const {
  GlycemiaMeasuringType, CarbsMeasuringType, CarbsUnitWeightType
} = require('./measuringHelper');

const MGDLtoMMOLrelation = 18.015;

function convertMGDLtoMMOLL(mgdl) {
  return mgdl / MGDLtoMMOLrelation;
}

function convertMMOLtoMGDL(mmol) {
  return mmol * MGDLtoMMOLrelation;
}

function convertNote(
  note, prevProperties, currentProperties
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
    note.glucose && prevGlycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L &&
    currentGlycemiaMeasuringType === GlycemiaMeasuringType.MG_DL
  ) {
    note.set('glucose', Math.round(convertMMOLtoMGDL(note.glucose)));
  }
  else if (
    note.glucose && prevGlycemiaMeasuringType === GlycemiaMeasuringType.MG_DL &&
    currentGlycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L
  ) {
    note.set('glucose', Number(convertMGDLtoMMOLL(note.glucose).toFixed(1)));
  }

  if (
    note.breadUnits && prevCarbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES &&
    currentCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS
  ) {
    console.log('🤖🤖🤖🤖 from carbs to bu');
    console.log('🤖🤖🤖🤖 carbsUnitWeightType', carbsUnitWeightType);
    console.log('🤖🤖🤖🤖 new bu', Number((note.breadUnits / carbsUnitWeightType).toFixed(1)));
    note.set('breadUnits', Number((note.breadUnits / carbsUnitWeightType).toFixed(1)));
  }
  else if (
    note.breadUnits && prevCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS &&
    currentCarbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES
  ) {
    console.log('🤖🤖🤖🤖 from bu to carbs');
    console.log('🤖🤖🤖🤖 carbsUnitWeightType', carbsUnitWeightType);
    console.log('🤖🤖🤖🤖 new bu', Number((note.breadUnits / carbsUnitWeightType).toFixed(1)));
    note.set('breadUnits', Math.round(note.breadUnits * carbsUnitWeightType));
  }

  return note;
}

async function convertNoteList(user, idsToConvert, prevProperties, currentProperties) {
  for (const id of idsToConvert) {
    const noteToConvert = await NoteModel.findOne({ id });
    if (noteToConvert) {
      console.log('🤖🤖🤖🤖 noteToConvert', noteToConvert);
      const convertedNote = convertNote(noteToConvert, prevProperties, currentProperties);
      console.log('🤖🤖🤖🤖 convertedNote', convertedNote);

      await NoteModel.replaceOne({ id: convertedNote.id }, convertedNote);

      const noteThatConvertedAndReplaced = await NoteModel.findOne({ id })
      console.log('🤖🤖🤖🤖 noteThatConvertedAndReplaced', noteThatConvertedAndReplaced);

      user.notes.set(id, noteThatConvertedAndReplaced);

      await user.save();
    }
  }
  await user.save();
};

module.exports = convertNoteList;
