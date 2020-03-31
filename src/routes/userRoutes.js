const {
    Router
} = require('express');
const UserController = require('../controllers/userController');
const router = Router();

router.post('/user', UserController.getUser)
router.post('/user/sync', UserController.syncUser)
router.post('/user/delete', UserController.deleteUser)
router.post('/user/find', UserController.findUser)
router.post('/user/shedule', UserController.updateUserShedule)

module.exports = router;
