const Note = require('../models/note');
const User = require('../models/user');

class NoteController {
    static async getUserNotes(req, res) {
        const notes = await Note.model.find({});
        res.type('application/json')
        res.json(notes)
    }

    static async createUserNote(req, res) {
        try {
            const users = await User.find({
                id: 1
            });
            const user = users[0]

            const data = req.body || {};
            const note = new Note.model({
                id: data.id || Date.now() + '',
                date: new Date(),
                glucose: data.glucose,
                breadUnits: data.breadUnits,
                insulin: data.insulin,
                longInsulin: data.longInsulin,
                comment: data.comment
            })
            user.notes.set(note.id, note);
            await note.save();
            await user.save();
            res.status(200);
            res.send('')
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e)
        }
    }
}

module.exports = NoteController;