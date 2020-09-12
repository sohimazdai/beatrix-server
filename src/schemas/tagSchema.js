const {
  Schema,
} = require('mongoose');

const tagSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    default: '',
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
