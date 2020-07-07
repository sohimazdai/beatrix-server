const fs = require("fs");
const Excel = require('exceljs');


const UserModel = require('../models/userModel');
const NoteModel = require('../models/noteModel');

class ExportController {
  static async exportNotes(req, res) {
    try {
      const userId = req.body.userId;
      const titles = req.body.titles || {};
      const from = req.body.from;
      const to = req.body.to;

      const user = await UserModel.findOne({ id: userId });
      const userNotes = await NoteModel.find({ userId });
      const sortedUserNotes = userNotes
        .sort((noteA, noteB) => noteB.date - noteA.date)
        .filter(note => note.date > from)
        .filter(note => note.date < to);

      if (user) {
        const options = {
          filename: `./temp/${userId}.xlsx`,
          useStyles: true,
          useSharedStrings: true
        };

        const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
        const worksheet = workbook.addWorksheet('My Sheet');
        worksheet.columns = [
          { header: titles.date, key: 'date', width: 12 },
          { header: titles.time, key: 'time', width: 12 },
          { header: titles.glucose, key: 'glucose', width: 12 },
          { header: titles.breadUnits, key: 'breadUnits', width: 12 },
          { header: titles.insulin, key: 'insulin', width: 12 },
          { header: titles.longInsulin, key: 'longInsulin', width: 12 },
          { header: titles.comment, key: 'comment', width: 12 },
        ];

        sortedUserNotes.map(note => {
          const date =
            (new Date(note.date).getDate() < 10 ? '0' + new Date(note.date).getDate() : new Date(note.date).getDate()) +
            '.' +
            (new Date(note.date).getMonth() < 9 ? '0' + (new Date(note.date).getMonth() + 1) : (new Date(note.date).getMonth() + 1)) +
            '.' +
            (new Date(note.date).getFullYear());
          const time =
            (new Date(note.date).getHours() < 10 ? '0' + (new Date(note.date).getHours()) : (new Date(note.date).getHours())) +
            ':' +
            (new Date(note.date).getMinutes() < 10 ? '0' + (new Date(note.date).getMinutes()) : (new Date(note.date).getMinutes()));

          worksheet.addRow({
            date,
            time,
            glucose: note.glucose,
            breadUnits: note.breadUnits,
            insulin: note.insulin,
            longInsulin: note.longInsulin,
            comment: note.comment,
          })
        })
        worksheet.commit();

        workbook.commit().then(function () {
          console.log('xls file is written.');
        });
      }

      res.type('application/json');
      res.status(200);
      res.send('OK');
    } catch (error) {
      console.log(__filename + " catch error: ", error && error.message);
      res.status(500);
      res.send(error);
    }
  }
}

module.exports = ExportController;

// const allUsers = require('./sample.json');
// const fs = require('fs');
// const app = require('express')();
// const json2xls = require('json2xls');
// const filename = 'sample.xlsx';
// app.listen(5050, () => {
//   console.log("app is running on port 5050");
//   convert();
// })
// const convert = function () {
//   const xls = json2xls(allUsers);
//   fs.writeFileSync(filename, xls, 'binary', (err) => {
//     if (err) {
//       console.log("writeFileSync :", err);
//     }
//     console.log(filename + " file is saved!");
//   });
// }