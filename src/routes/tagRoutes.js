const {
  Router
} = require('express');
const TagController = require('../controllers/tagController');
const router = Router();

router.post('/tag/sync', TagController.sync)

module.exports = router;
