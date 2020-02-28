const {
    Router
} = require('express');
const UserController = require('../controllers/userController');
const router = Router();

router.get('/user', UserController.getUser)

router.get('/user/create', UserController.createUser)

module.exports = router;