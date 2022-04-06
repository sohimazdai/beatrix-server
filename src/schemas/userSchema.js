const NoteSchema = require('./noteSchema');
const UserPropertiesSchema = require('./userPropertiesSchema');
const UserSheduleSchema = require('./userSheduleSchema');
const {
    Schema,
} = require('mongoose');
const TagSchema = require('./tagSchema');
const SheduleSchema = require('./sheduleSchema');

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    installationId: {
        type: String,
        default: '',
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
    },
    registeredOn: {
        type: Date,
    },
    loggedInOn: {
        type: Date,
    },
    isNeedToShowOnboarding: {
        type: Boolean,
        default: false,
    },
    tagList: {
        type: Map,
        of: TagSchema,
        default: {}
    },
    shedules: {
        type: Map,
        of: SheduleSchema,
        default: {},
    },
    notificationsSeen: {
        type: Array,
        of: String,
        default: [],
    },
})

module.exports = userSchema;
