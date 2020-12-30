const UserModel = require('../models/userModel');

class SheduleController {
  static async change(req, res) {
    try {
      const userId = req.body.userId;
      const shedule = req.body.shedule;

      if (!userId) throw new Error('userId field is not provided');
      if (!shedule) throw new Error('shedule field is not provided');

      const user = await UserModel.findOne({ id: userId });
      const sheduleType = shedule.type;

      if (user) {
        user.shedules.set(sheduleType, shedule);

        await user.save();
      }

      res.status(200);
      res.send("OK");
      return;
    } catch (error) {
      console.log(__filename + " catch error: ", error && error.message);
      res.status(503);
      res.send(error);
    }
  }
}

module.exports = SheduleController;
