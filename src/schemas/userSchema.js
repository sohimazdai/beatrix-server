const NoteSchema = require('./noteSchema');
const UserPropertiesSchema = require('./userPropertiesSchema');
const UserSheduleSchema = require('./userSheduleSchema');
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
    },
    shedule: {
        type: Map,
        of: UserSheduleSchema,
        default: {}
    },
    properties: {
        type: UserPropertiesSchema,
        default: {}
    },
    authType: {
        type: String,
        default: "email"
    }
})

module.exports = userSchema;
