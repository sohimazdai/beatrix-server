const {
    model
} = require('mongoose');
const noteSchema = require('../schemas/noteSchema');

module.exports = model('Note', noteSchema);