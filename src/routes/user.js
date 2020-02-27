const {
    Router
} = require('express');
const User = require('../models/user');
const UserController = require('../controllers/user');
const router = Router();

router.get('/user', UserController.getUser)

router.get('/user/create', UserController.createUser)

module.exports = router;