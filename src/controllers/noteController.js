const NoteModel = require('../models/noteModel');
const NoteSchema = require('../schemas/noteSchema');
const User = require('../models/userModel');

class NoteController {
    static async getUserNotes(req, res) {
        const notes = await NoteModel.find({ ...req.body });
        res.type('application/json')
        res.json(notes)
    }

    static async createUserNote(req, res) {
        try {
            console.log(req.body)
            const user = await User.findOne({
                id: req.body.userId
            });

            const data = req.body.note;
            const note = new NoteModel({
                id: data.date.toString(),
                date: new Date(data.date),
                glucose: data.glucose,
                breadUnits: data.breadUnits,
                insulin: data.insulin,
                longInsulin: data.longInsulin,
                comment: data.comment,
                userId: req.body.userId
            })
            console.log(note)
            user.notes.set(`${note._id}`, note);
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
