const { model } = require('mongoose');
const favoritesFoodSchema = require('../schemas/favoritesFoodSchema');

module.exports = model('FavoritesFood', favoritesFoodSchema);
