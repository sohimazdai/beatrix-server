const UserModel = require('../models/userModel');

class UserController {
    static async findUser(req, res) {
        try {
            var id = req.body.id;
            var email = req.body.email;
            const user = !id && !email ?
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
            const res = await UserModel.deleteOne({ id: userId });
            res.type('application/json');
            res.send(res);
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
            if (!user) {
                const newUser = new UserModel({
                    id: requestUser.id,
                    email: requestUser.email,
                });
                await newUser.save();
                res.send(newUser);
            } else {

                res.send(user);
            }
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.send(error);
        }
    }
}

module.exports = UserController;
