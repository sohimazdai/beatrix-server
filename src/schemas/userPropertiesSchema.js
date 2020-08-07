const {
    Schema,
} = require('mongoose');

const userPropertiesSchema = new Schema({
    targetGlycemia: {
        type: Number,
    },
    glycemiaMeasuringType: {
        type: String,
    },
    carbsMeasuringType: {
        type: String,
    },
    carbsUnitWeightType: {
        type: Number,
    },
    shortInsulinType: {
        type: String,
    },
})

module.exports = userPropertiesSchema;
