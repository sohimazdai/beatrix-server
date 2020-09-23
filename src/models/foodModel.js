const { model } = require('mongoose');
const foodSchema = require('../schemas/foodSchema');

module.exports = model('Food', foodSchema);
