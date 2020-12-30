const {
  Schema,
} = require('mongoose');

const sheduleSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  hours: {
    type: [Number],
    required: true
  },
});

module.exports = sheduleSchema;
