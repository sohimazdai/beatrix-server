const {
    Schema,
} = require('mongoose');

const userSheduleSchema = new Schema({
    id: {
        type: Number
    },
    carbohydrateRatio: {
        type: Number,
    },
    insulinSensitivityFactor: {
        type: Number,
    }
})

module.exports = userSheduleSchema;
