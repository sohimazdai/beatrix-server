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

router.post('/user/installation', UserController.giveUserByInstallationId)
router.post('/user/installation/clear', UserController.clearInstallationId)

router.post('/user/properties/get', UserController.getUserProperties)
router.post('/user/properties/sync', UserController.syncUserProperties)
router.post('/user/properties/clear', UserController.clearUserPropertiesForTestApi)
router.post('/user/properties/set', UserController.setUserPropertiesForTestApi)

module.exports = router;
