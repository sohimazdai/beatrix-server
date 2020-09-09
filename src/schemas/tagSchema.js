const {
  Schema,
} = require('mongoose');

const tagSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
})

module.exports = tagSchema
