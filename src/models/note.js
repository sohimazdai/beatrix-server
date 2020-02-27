const {Schema, model} = require('mongoose');

const note = new Schema({
    id: {
        type: String,
        required: true
    },
    glucose: {
        type: String,
        default: '0'
    },
    breadUnits: {
        type: String,
        default: '0',
    },
    insulin: {
        type: String,
        default: '0',
    },
    longInsulin: {
        type: String,
        default:  '0'
    },
    comment: {
        type: String,
        default: "",
    }
})

module.exports = model('Note', note);