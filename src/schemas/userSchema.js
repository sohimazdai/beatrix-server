const NoteSchema = require('./noteSchema');
const {
    Schema,
} = require('mongoose');

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    notes: {
        type: Map,
        of: NoteSchema,
        default: {}
    }
})

module.exports = userSchema;
