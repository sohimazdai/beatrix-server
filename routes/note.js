const {Router} = require('express');
const Note = require('../models/note');
const router = Router();

router.get('/note', async (req, res) => {
    const notes = await Note.find({});
    res.send(notes)
})

router.post('/note', async (req, res) => {
    const data = req.body;
    const note = new Note({
        id: data.id,
        glucose: data.glucose,
        breadUnits: data.breadUnits,
        insulin: data.insulin,
        longInsulin: data.longInsulin,
        comment: data.comment
    })

    await note.save();
})

module.exports = router;