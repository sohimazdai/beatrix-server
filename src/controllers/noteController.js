const NoteModel = require('../models/noteModel');
const UserModel = require('../models/userModel');

class NoteController {
    static async importNotes(req, res) {
        try {
            if (!req.body.userId) throw new Error('Where is user Id?')
            if (!req.body.notes) throw new Error('Where is notes hah?')
            const targetUserId = req.body.userId;
            const notesToImport = Object.values(req.body.notes);
            const user = await UserModel.findOne({ id: targetUserId });

            const notesMap = new Map();

            notesToImport.forEach((note) => {
                notesMap.set(`${note.id}`, {
                    ...note,
                    userId: targetUserId,
                });
            });

            for (const noteEntities of notesMap) {
                const note = noteEntities[1];
                const newNote = createNote(note);
                await newNote.save();
                user.notes.set(`${newNote.id}`, newNote);
            }

            await user.save();

            res.type('application/json');
            res.status(200);
            res.send({ success: true });
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.status(400);
            res.send(e.message)
        }
    }

    static async getNotesRange(req, res) {
        try {
            const userId = req.body.userId;

            if (!req.body.userId) throw new Error('There are not userId in body');
            if (!req.body.endDate && !req.body.limit) throw new Error('There are not end of range');
            if (!req.body.startDate && typeof req.body.offset === 'undefined') throw new Error('There are not start of range');
            const user = await UserModel.findOne({ id: userId });

            const endDate = req.body.endDate;

            let notes = new Map();

            if (!endDate) {
                notes = await NoteModel
                    .find({ userId: user.id })
                    .sort({ date: 'desc' })
                    .skip(req.body.offset)
                    .limit(req.body.limit);
            } else {
                notes = await NoteModel
                    .find({ userId: user.id, date: { $gte: endDate } })
                    .sort({ date: 'desc' })
                    .skip(req.body.offset);
            }

            const newOffset = !endDate
                ? req.body.offset + req.body.limit
                : req.body.offset + Object.values(notes).length;

            res.type('application/json');
            res.status(200);
            res.send({ notes, noteListSize: user.notes.size, offset: newOffset });
        } catch (e) {
            console.log(__dirname + '/' + __filename + " catch error: ", e);
            res.status(400);
            res.send(e.message);
        }
    }

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

    static async syncUserNotesV2(req, res) {
        try {
            const notesToSync = req.body.notes;
            const userId = req.body.userId;

            const user = await UserModel.findOne({ id: userId });

            for (const note of notesToSync) {
                if (note.reason == 'delete') {
                    const noteToDelete = await NoteModel.findOne({ id: note.id });

                    if (noteToDelete) {
                        await NoteModel.findOneAndRemove({ id: note.id })

                        user.notes.delete(noteToDelete.id);

                        await user.save();
                    }
                } else {
                    const newNote = createNote(note);

                    await newNote.save();

                    user.notes.set(`${newNote.id}`, newNote);
                }
            }

            await user.save();

            const notes = await NoteModel
                .find({ userId: user.id })
                .sort({ date: 'desc' })
                .limit(100);

            res.type('application/json');
            res.status(200);
            res.send({
                notes,
                noteListSize: user.notes.size,
                offset: Object.values(notes).length,
            });
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

            user.notes.delete(noteToDelete.id);

            await user.save();

            res.status(200);
            res.send({
                success: true,
                result: { noteListSize: user.notes.size },
            });
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
            res.send({
                success: true,
                result: {
                    noteListSize: user.notes.size,
                },
            });
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
            res.send({
                success: true,
                result: {
                    noteListSize: user.notes.size,
                },
            });
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
