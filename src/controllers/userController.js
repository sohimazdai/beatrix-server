const UserModel = require('../models/userModel');

class UserController {
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
            const requestUser = {
                ...req.body
            };
            const user = await UserModel.findOne({ id: requestUser.id });
            res.type('application/json');
            if (!user) {
                const newUser = new UserModel({
                    id: requestUser.id,
                    email: requestUser.email,
                });
                await newUser.save();
                res.send(newUser);
            } else {
                //start
                user.set('authType', requestUser.authType);
                await user.save();
                //end
                res.send(user);
            }
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.send(error);
        }
    }
}

module.exports = UserController;
