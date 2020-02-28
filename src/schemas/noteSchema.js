const {
    Schema,
} = require('mongoose');

const noteSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    glucose: {
        type: Number,
        default: '0'
    },
    breadUnits: {
        type: Number,
        default: '0',
    },
    insulin: {
        type: Number,
        default: '0',
    },
    longInsulin: {
        type: Number,
        default: '0'
    },
    comment: {
        type: String,
        default: "",
    }
})

module.exports = noteSchema
