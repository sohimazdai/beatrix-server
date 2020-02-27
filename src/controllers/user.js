const User = require('../models/user');

class NoteController {
    static async getUser(req, res) {
        const user = await User.find({id: 1});
        res.type('application/json');
        res.json(user);
    }

    static async createUser(req, res) {
        try {

            const user = await User.find({id: '1'});
            if (!user.id) {
                const newUser = new User({
                    id: '1'
                })
                await newUser.save();
                res.status(200);
                res.send('')
            } else {
                res.status(200);
                res.send('Already created')
            }
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e)
        }
    }
}

module.exports = NoteController;