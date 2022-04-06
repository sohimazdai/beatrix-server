const uuid = require('uuid');
const NotificationsModel = require('../models/notificationsModel');
const UserModel = require('../models/userModel');

class NotificationsController {
    static async getNotifications(req, res) {
        try {
            const userId = req.body.userId;

            if (!userId) throw new Error('userId not found');

            const notifications = await NotificationsModel.find();
            const user = await UserModel.findOne({ id: userId });

            const response = {
                notifications: [],
                notificationsSeen: [],
            };

            if (!notifications || !user) {
                res.status(200);
                res.send(response);
                return;
            }

            response.notificationsSeen = user.notificationsSeen;
            response.notifications = notifications.filter((n) => n.enabled);

            res.status(200);
            res.send(response);
            return;
        } catch (error) {
            console.log(__filename + " catch error: ", error && error.message);
            res.status(503);
            res.send(error);
        }
    }

    static async getAllNotifications(_, res) {
        try {
            const notifications = await NotificationsModel.find();

            res.status(200);
            res.send(notifications);
            return;
        } catch (error) {
            console.log(__filename + " catch error: ", error && error.message);
            res.status(503);
            res.send(error);
        }
    }

    static async createNotification(req, res) {
        try {
            const notification = req.body;

            if (!notification) throw new Error('Не указан body');

            const newNotification = new NotificationsModel({
                ...notification,
                createdAt: new Date(),
                id: notification.id || uuid.v1(),
            });

            await newNotification.save();

            res.status(200);
            res.send(newNotification);
            return;
        } catch (error) {
            console.log(__filename + " catch error: ", error && error.message);
            res.status(503);
            res.send(error);
        }
    }

    static async setSeenNotification(req, res) {
        try {
            const userId = req.body.userId;
            const notificationIds = req.body.notificationIds;

            if (!notificationIds) throw new Error('Не указан notificationIds');
            if (!userId) throw new Error('Не указан userId');

            const user = await UserModel.findOne({ id: userId });

            if (!user) throw new Error('User не найден в ', __filename);

            user.set('notificationsSeen', [...user.notificationsSeen, ...notificationIds]);

            await user.save();

            res.status(200);
            res.send('OK');
            return;
        } catch (error) {
            console.log(__filename + " catch error: ", error && error.message);
            res.status(503);
            res.send(error);
        }
    }

    static async setEnabilityNotification(req, res) {
        try {
            const enabled = req.body.enabled;
            const notificationId = req.body.notificationId;

            if (!notificationId) throw new Error('Не указан notificationId');
            if (typeof enabled === 'undefined') throw new Error('Не указан enabled');

            const notification = await NotificationsModel.findOne({ id: notificationId });

            if (!notification) throw new Error('Notification не найден');

            notification.set('enabled', enabled);
            
            await notification.save();

            res.status(200);
            res.send('OK');
            return;
        } catch (error) {
            console.log(__filename + " catch error: ", error && error.message);
            res.status(503);
            res.send(error);
        }
    }
}

module.exports = NotificationsController;
