const {
    Schema,
} = require('mongoose');
const foodNoteSchema = require('./foodNoteSchema');

const noteSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Number,
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
    commentary: {
        type: String,
        default: "",
    },
    tagIds: {
        type: [String],
        default: [],
    },
    foodList: {
        type: Map,
        of: foodNoteSchema,
        default: {},
    }
})

module.exports = noteSchema
