const {
    Router
} = require('express');
const NoteController = require('../controllers/note');
const router = Router();

router.get('/note', NoteController.getUserNotes)

router.get('/note/create', NoteController.createUserNote)

module.exports = router;