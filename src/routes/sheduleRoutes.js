const {
  Router
} = require('express');
const SheduleController = require('../controllers/sheduleController');
const router = Router();

router.post('/shedule/change', SheduleController.change);

module.exports = router;
