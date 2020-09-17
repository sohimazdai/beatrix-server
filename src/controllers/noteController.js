const NoteModel = require('../models/noteModel');
const UserModel = require('../models/userModel');

class NoteController {
    static async syncUserNotes(req, res) {
        try {
            const notesToSync = req.body.notes;
            const userId = req.body.userId;
            const user = await UserModel.findOne({ id: userId });

            for (const note of notesToSync) {
                if (note.reason == 'delete') {
                    const noteToDelete = await NoteModel.findOne({ id: note.id });

                    if (noteToDelete) {
                        await NoteModel.findOneAndRemove({ id: note.id })
                        user.notes.set(`${noteToDelete.id}`);
                        await user.save();
                    }
                } else {
                    const newNote = createNote(note);
                    await newNote.save();
                    user.notes.set(`${newNote.id}`, newNote);
                }
            }
            await user.save();
            res.type('application/json');
            res.status(200);
            res.send(user.notes)
        }
        catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.status(400);
            res.send(e.message)
        }
    }

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
            const clientNoteId = req.body.id;
            const user = await UserModel.findOne({ id: req.body.userId });

            const noteToDelete = await NoteModel.findOne({ id: clientNoteId });
            await NoteModel.findOneAndRemove({ id: clientNoteId })

            user.notes.set(`${noteToDelete.id}`);
            await user.save();

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

            user.notes.set(`${noteToUpdate.id}`, noteToUpdate);
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
            const note = createNote(data);
            user.notes.set(`${note.id}`, note);
            await note.save();
            await user.save();
            res.status(200);
            res.send('OK');
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.send(e.message);
        }
    }
}

function createNote(note) {
    return new NoteModel({
        id: note.id,
        date: new Date(Number(note.date)),
        glucose: note.glucose,
        breadUnits: note.breadUnits,
        insulin: note.insulin,
        longInsulin: note.longInsulin,
        commentary: note.commentary,
        tagIds: note.tagIds, 
        userId: note.userId,
    });
}

module.exports = NoteController;
