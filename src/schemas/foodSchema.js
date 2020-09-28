const { Schema } = require('mongoose');

const foodSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  sourceId: {
    type: String,
    required: true,
  },
  dbId: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  brandName: {
    type: String,
  },
  gi: {
    type: Number,
  },
  imageSrc: {
    type: String,
  },
  locale: {
    type: String
  },
  region: {
    type: String
  },

  nutrients: {
    calories: {
      type: Number,
      required: true,
    },
    energy: {
      type: Number,
      required: true,
    },
    carbohydrates: {
      type: Number,
      required: true,
    },
    proteins: {
      type: Number,
      required: true,
    },
    fats: {
      type: Number,
      required: true,
    },
  },
});

module.exports = foodSchema;
