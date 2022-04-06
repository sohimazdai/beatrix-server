const {
    model
} = require('mongoose');
const notificationsSchema = require('../schemas/notificationsSchema');

module.exports = model('Notifications', notificationsSchema);
