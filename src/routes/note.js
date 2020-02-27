const {
    Router
} = require('express');
const Note = require('../models/note');
const router = Router();

router.get('/note', async (req, res) => {
    const notes = await Note.find({});
    res.type('application/json')
    res.json([notes])
})

router.post('/note', async (req, res) => {
    try {
        console.log('request received', req.body)
        const data = req.body || {};
        const note = new Note({
            id: data.id || Date.now() + '',
            glucose: data.glucose,
            breadUnits: data.breadUnits,
            insulin: data.insulin,
            longInsulin: data.longInsulin,
            comment: data.comment
        })

        await note.save();
    } catch (e) {
        console.log("Catched e: ", e)
    }
    res.status(200)
})

module.exports = router;