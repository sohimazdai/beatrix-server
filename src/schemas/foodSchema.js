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
  description: {
    type: String,
  },
  brandName: {
    type: String,
  },
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
  gi: {
    type: Number,
  },
  categoryId: {
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
  }
});

module.exports = foodSchema;
