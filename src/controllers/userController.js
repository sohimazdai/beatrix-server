const UserModel = require('../models/userModel');
const convertNotelist = require('../helpers/notesConverter');
const convertShedule = require('../helpers/sheduleConverter');

class UserController {
    static async clearInstallationId(req, res) {
        try {
            const userId = req.body.userId;
            const user = await UserModel.findOne({ id: userId });
            if (user) {

                user.set('installationId', "");
                await user.save();

                res.send("OK")
            } else {
                res.send("NOT_OK")
            }
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.send(error);
        }
    }

    static async giveUserByInstallationId(req, res) {
        try {
            const installationId = req.body.installationId;

            const user = await UserModel.findOne({ installationId });
            if (user) {

                user.set('installationId', "");
                await user.save();

                res.type('application/json');
                res.status(200);
                res.send({
                    id: user.id,
                    authType: user.authType,
                    email: user.email,
                })
            } else {
                res.send({})
            }
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.send(error);
        }
    }
    static async updateUserShedule(req, res) {
        try {
            var userId = req.body.userId;

            const user = await UserModel.findOne({ id: userId });

            Object.values(req.body.shedule).map(sheduleItem => {
                user.shedule.set(`${sheduleItem.id}`, sheduleItem);
            });

            await user.save();

            res.type('application/json');
            res.status(200);
            res.send(user.shedule)
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.send(error);
        }
    }

    static async findUser(req, res) {
        try {
            var id = req.body.id;
            var email = req.body.email;
            const user = !id && !email ?
                //For test
                await UserModel.find({}) :
                [
                    ...await UserModel.find({ id }),
                    ...await UserModel.find({ email })
                ];
            res.type('application/json');
            res.send(user);
            return;
        } catch (e) {
            res.send(e.message)
        }
    }

    static async getUser(req, res) {
        try {
            var userId = req.body.userId;
            const user = await UserModel.findOne({ id: userId });
            if (user) {
                res.type('application/json');
                res.send(user);
                return;
            }
            res.send('User is not exist');
        } catch (e) {
            res.send(e.message)
        }
    }

    static async deleteUser(req, res) {
        try {
            var userId = req.body.userId;
            const result = await UserModel.deleteOne({ id: userId });
            res.type('application/json');
            res.send(result);
        } catch (e) {
            res.send(e.message)
        }
    }

    static async syncUser(req, res) {
        try {
            const requestUser = req.body.user;

            const user = await UserModel.findOne({ id: requestUser.id });
            res.type('application/json');
            if (!user) {
                const newUser = new UserModel({
                    id: requestUser.id,
                    email: requestUser.email,
                    authType: requestUser.authType,
                    registeredOn: new Date(),
                    loggedInOn: new Date(),
                    installationId: requestUser.installationId,
                });

                await newUser.save();

                const resNewUser = {
                    properties: {},
                    shedule: {},
                };

                res.send(resNewUser);
            } else {
                if (!user.registeredOn) {
                    user.set('registeredOn', new Date());
                }

                if (requestUser.installationId) {
                    user.set('installationId', requestUser.installationId)
                }

                user.set('authType', requestUser.authType);
                user.set('email', requestUser.email);
                user.set('loggedInOn', new Date());

                await user.save();

                const resUser = {
                    properties: user.properties,
                    shedule: user.shedule,
                };

                res.send(resUser);
            }


        } catch (e) {
            console.log(__filename + " catch error: ", e.message);
            res.status(400);
            res.send(error);
        }
    }

    // USER PROPERTIES
    static async getUserProperties(req, res) {
        try {
            var userId = req.body.userId;
            const user = await UserModel.findOne({ id: userId });

            if (user) {
                res.type('application/json');
                res.send(user.properties);
                return;
            }

            res.send('User is not exist');
        } catch (e) {
            console.log(__filename + " catch error: ", e.message);
            res.status(400);
            res.send(error);
        }
    }

    static async clearUserPropertiesForTestApi(req, res) {
        try {
            const userId = req.body.userId;
            const user = await UserModel.findOne({ id: userId });

            user.set('properties', {});

            await user.save();

            res.status(200);
            res.send('OK');
        } catch (e) {
            console.log(__filename + " catch error: ", e.message);
            res.status(500);
            res.send(error);
        }
    }

    static async syncUserProperties(req, res) {
        try {
            const userId = req.body.userId;
            const properties = req.body.properties;
            const idsToConvert = req.body.idsToConvert;
            const shedule = req.body.shedule;

            const user = await UserModel.findOne({ id: userId });

            res.type('application/json');

            const userProperties = user.properties;

            user.set('properties', properties);

            res.status(200);
            await user.save();

            if (
                (userProperties.glycemiaMeasuringType &&
                    userProperties.glycemiaMeasuringType !== properties.glycemiaMeasuringType) ||
                (userProperties.carbsMeasuringType &&
                    userProperties.carbsMeasuringType !== properties.carbsMeasuringType)
            ) {
                await convertNotelist(user, idsToConvert, userProperties, properties);
                await convertShedule(user, shedule, userProperties, properties);
                await user.save();

                res.send(user);
                return;
            }
            res.status(200);
            res.send({});
        } catch (e) {
            console.log(__filename + " catch error: ", e.message);
            res.status(500);
            res.send(error);
        }
    }
}

module.exports = UserController;
