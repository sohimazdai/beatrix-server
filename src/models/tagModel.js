const {
  model
} = require('mongoose');
const tagSchema = require('../schemas/tagSchema');

module.exports = model('TagModel', tagSchema);
