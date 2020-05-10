const UserModel = require('../models/userModel');
const NoteModel = require('../models/noteModel');

class PingController {
    static async clearNobody(req, res) {
        try {
            const appUsers = await UserModel.find({});
            const appUserIds = appUsers.reduce((aUIs, next) => {
                return {
                    ...aUIs,
                    [next.id]: true
                };
            }, {});
            const appNotes = await NoteModel.find({});
            const noteUserIdsToDelete = appNotes.reduce((nUIsTD, next) => {
                if (!appUserIds[next.userId]) {
                    return {
                        ...nUIsTD,
                        [next.userId]: next.userId
                    };
                }
                return nUIsTD
            }, {});
            const clearingResult = await NoteModel
                .deleteMany({ userId: { $in: Object.values(noteUserIdsToDelete) } });
            res.type('application/json');
            res.send(clearingResult);
            return;
        } catch (e) {
            res.send(e.message)
        }
    }

    static async ping(req, res) {
        try {
            res.type('application/json');
            res.send('ОК');
            return;
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = PingController;
