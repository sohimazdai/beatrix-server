const NoteModel = require('../models/noteModel');
const UserModel = require('../models/userModel');

class NoteController {
    static async getAllNotes(req, res) {
        try {
            const notes = await NoteModel.find({});
            res.status(200);
            res.send(notes)
        }
        catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e)
            res.send(e.message)
        }
    }
    static async deleteUserNote(req, res) {
        try {
            const clientNoteId = req.body.date;
            const user = await UserModel.findOne({ id: req.body.userId });

            const noteToDelete = await NoteModel.findOne({ id: clientNoteId });
            await NoteModel.findOneAndRemove({ id: clientNoteId })

            if (user) {
                user.notes.set(`${noteToDelete._id}`);
                await user.save();
            }

            res.status(200);
            res.send("OK")
        }
        catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e)
            res.send(e.message)
        }
    }

    static async updateUserNote(req, res) {
        try {
            const body = req.body;
            const { prevDate, ...rest } = body;
            const forUpdate = {
                id: rest.date.toString(),
                date: new Date(rest.date),
                ...rest
            }
            const user = await UserModel.findOne({ id: body.userId });

            await NoteModel.replaceOne({
                id: !!body.prevDate ?
                    body.prevDate :
                    forUpdate.id
            }, forUpdate);
            const noteToUpdate = await NoteModel.findOne({ id: forUpdate.id })

            user.notes.set(`${noteToUpdate._id}`, noteToUpdate);
            await user.save();

            res.status(200);
            res.send("OK")
        }
        catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e)
            res.send(e.message)
        }
    }

    static async getUserNotes(req, res) {
        try {
            const user = await UserModel.findOne({ id: req.body.userId });
            const notes = user.notes;
            res.type('application/json')
            res.json(notes)
        }
        catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e)
            res.send(e.message)
        }
    }

    static async createUserNote(req, res) {
        try {
            const user = await UserModel.findOne({
                id: req.body.userId
            });
            const data = req.body;
            const note = new NoteModel({
                id: data.date.toString(),
                date: new Date(data.date),
                glucose: data.glucose,
                breadUnits: data.breadUnits,
                insulin: data.insulin,
                longInsulin: data.longInsulin,
                comment: data.comment,
                userId: data.userId
            });
            user.notes.set(`${note._id}`, note);
            await note.save();
            await user.save();
            res.status(200);
            res.send('OK')
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.send(e.message);
        }
    }
}

module.exports = NoteController;
