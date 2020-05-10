const {
  Router
} = require('express');
const AppController = require('../controllers/appController');
const router = Router();

router.post('/ping', AppController.ping);
router.post('/nobody/clear', AppController.clearNobody)

module.exports = router;
