const {Router} = require('express');
const User = require('../models/user');
const router = Router();

router.get('/user', async (req, res) => {
    const users = await User.find({});
    res.send(users)
})

router.get('/user/create', async (req, res) => {
    const user = new User({
        email: "JOHN",
        password: "123456"
    })

    await user.save();
})

module.exports = router;