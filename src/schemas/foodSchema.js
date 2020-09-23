const { Schema } = require('mongoose');

const foodSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  sourceId: {
    type: Number,
    required: true,
  },
  dbId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  developer: {
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
});

module.exports = foodSchema;
