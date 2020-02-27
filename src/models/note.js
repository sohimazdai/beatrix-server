const {
    Schema,
    model
} = require('mongoose');

const note = new Schema({
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

module.exports = {
    model: model('Note', note),
    schema: note
}