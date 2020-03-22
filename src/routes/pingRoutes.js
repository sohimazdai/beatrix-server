const {
    Router
} = require('express');
const PingController = require('../controllers/pingController');
const router = Router();

router.post('/ping', PingController.ping)

module.exports = router;
