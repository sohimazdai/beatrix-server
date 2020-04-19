const {
    Router
} = require('express');
const NoteController = require('../controllers/noteController');
const router = Router();

router.post('/note', NoteController.getUserNotes)
router.get('/note/all', NoteController.getAllNotes)
router.post('/note/create', NoteController.createUserNote)
router.post('/note/update', NoteController.updateUserNote)
router.post('/note/delete', NoteController.deleteUserNote)
router.post('/note/sync', NoteController.syncUserNotes)

module.exports = router;
