const Excel = require('exceljs');
const fs = require('fs');

const UserModel = require('../models/userModel');
const NoteModel = require('../models/noteModel');
const { title } = require('process');

class ExportController {
  static async download(req, res) {
    try {
      const userId = req.body.userId;

      res.status(200);
      res.download(__dirname, `${userId}.xlsx`);
      res.end();
    } catch (error) {
      console.log(__filename + " catch error: ", error && error.message);
      res.status(500);
      res.send(error);
    }
  };

  static async exportNotes(req, res) {
    try {
      const userId = req.body.userId;
      const titles = req.body.titles || {};
      const from = req.body.from;
      const to = req.body.to;
      const stats = req.body.stats || {};

      const user = await UserModel.findOne({ id: userId });
      const userNotes = await NoteModel.find({ userId });
      const sortedUserNotes = userNotes
        .sort((noteA, noteB) => noteB.date - noteA.date)
        .filter(note => note.date > from)
        .filter(note => note.date < to);

      const fileName = __dirname + `/${userId}.xlsx`;
      const options = {
        filename: fileName,
        useStyles: true,
        useSharedStrings: true
      };

      const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
      const statisticsSheet = workbook.addWorksheet('Statistics');
      statisticsSheet.columns = [
        { header: titles.statisticsName, key: 'name', width: 40 },
        { header: titles.statisticsNameValue, key: 'value', width: 10 },
      ];

      addGeneralStatistics(stats, titles, statisticsSheet, from, to);
      addStatsRows(stats, titles, statisticsSheet);
      statisticsSheet.commit();

      const worksheet = workbook.addWorksheet('Notes');

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

      var stat = fs.statSync(fileName);

      res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Length': stat.size
      });

      var readStream = fs.createReadStream(fileName);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.pipe(res);
      res.end();
    } catch (error) {
      console.log(__filename + " catch error: ", error && error.message);
      res.status(500);
      res.send(error);
    }
  }
}

function addGeneralStatistics(stats, titles, statisticsSheet, from, to) {
  statisticsSheet.addRow({
    name: titles.dateFrom,
    value: new Date(from),
  });
  statisticsSheet.addRow({
    name: titles.dateTo,
    value: new Date(to),
  });
  statisticsSheet.addRow({
    name: titles.totalNotes,
    value: stats.totalNotes,
  });
};

function addStatsRows(stats, titles, statisticsSheet) {
  statisticsSheet.addRow({
    name: titles.averageGlucose,
    value: stats.averageGlucose,
  });

  statisticsSheet.addRow({
    name: titles.dailyAverageBreadUnits,
    value: stats.dailyAverageBreadUnits,
  });

  statisticsSheet.addRow({
    name: titles.dailyAverageInsulin,
    value: stats.dailyAverageInsulin,
  });

  statisticsSheet.addRow({
    name: titles.dailyAverageLongInsulin,
    value: stats.dailyAverageLongInsulin,
  });
}

module.exports = ExportController;
