const {
    Router
} = require('express');
const NoteController = require('../controllers/noteController');
const router = Router();

router.post('/note', NoteController.getUserNotes)

router.post('/note/create', NoteController.createUserNote)

module.exports = router;
