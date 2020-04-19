const {
    Schema,
} = require('mongoose');

const userPropertiesSchema = new Schema({
    targetGlycemia: {
        type: Number,
    },
})

module.exports = userPropertiesSchema;
