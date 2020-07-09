const {
  Router
} = require('express');
const ExportController = require('../controllers/exportController');
const router = Router();

router.post('/export', ExportController.exportNotes);
router.get('/export/download', ExportController.download);

module.exports = router;
