const {
    Schema,
} = require('mongoose');

const notificationsSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    versionAndroidFrom: {
        type: String,
        required: false,
        default: '0',
    },
    versionAndroidTo: {
        type: String,
        required: false,
        default: '99',
    },
    versionIOsFrom: {
        type: String,
        required: false,
        default: '0.0.0',
    },
    versionIOsTo: {
        type: String,
        required: false,
        default: '10.0.0',
    },
    enabled: {
        type: Boolean,
        required: false,
        default: true,
    },
    isForAllUsers: {
        type: Boolean,
        required: false,
        default: false,
    },
    title_ru: {
        type: String,
        required: true,
    },
    title_en: {
        type: String,
        required: true,
    },
    title_es: {
        type: String,
        required: true,
    },
    title_ua: {
        type: String,
        required: true,
    },
    text_ru: {
        type: String,
        required: true,
    },
    text_en: {
        type: String,
        required: true,
    },
    text_es: {
        type: String,
        required: true,
    },
    text_ua: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
})

module.exports = notificationsSchema;
