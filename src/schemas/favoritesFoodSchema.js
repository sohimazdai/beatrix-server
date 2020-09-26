const { Schema } = require('mongoose');

const favoritesFoodSchema = new Schema({
  favorites: {
    type: [String],
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = favoritesFoodSchema;
