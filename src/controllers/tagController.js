const UserModel = require('../models/userModel');

class TagController {
  static async sync(req, res) {
    try {
      const userId = req.body.userId;
      const tagList = req.body.tagList;

      const user = await UserModel.findOne({ id: userId });

      if (user) {
        user.set('tagList', tagList);

        await user.save();

        res.status(200);
        res.send("OK");
        return;
      }

      res.send();

    } catch (error) {
      console.log(__filename + " catch error: ", error && error.message);
      res.status(503);
      res.send(error);
    }
  }
}

module.exports = TagController;
