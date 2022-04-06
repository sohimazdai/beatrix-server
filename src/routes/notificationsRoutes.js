const { Router } = require('express');
const NotificationsController = require('../controllers/notificationsController');
const routes = require('./routes');
const router = Router();

router.post(routes.NOTIFICATIONS_GET, NotificationsController.getNotifications);
router.post(routes.NOTIFICATIONS_GET_ALL, NotificationsController.getAllNotifications);
router.post(routes.NOTIFICATIONS_CREATE, NotificationsController.createNotification);
router.post(routes.NOTIFICATIONS_SEEN, NotificationsController.setSeenNotification);
router.post(routes.NOTIFICATION_ENABLE, NotificationsController.setEnabilityNotification);

module.exports = router;
