const Note = require('./note');
const {
    Schema,
    model
} = require('mongoose');

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    // socialMediaHandles: {
    //     type: Map,
    //     of: String
    // }
    notes: {
        type: Map,
        of: Note.schema,
        default: {}
    }
})

module.exports = model('User', userSchema);