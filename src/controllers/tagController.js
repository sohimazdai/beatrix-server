const UserModel = require('../models/userModel');
const TagModel = require('../models/tagModel');

class TagController {
  static async sync(req, res) {
    try {
      const userId = req.body.userId;
      const tagList = req.body.tagList;
      const user = await UserModel.findOne({ id: userId });

      if (user) {
        for (let tagKey in tagList) {
          const tagFromReq = tagList[tagKey];
          const tag = await TagModel.findOne({ id: tagKey });

          if (!tag) {
            const newTag = new TagModel({
              id: tagKey,
              userId: userId,
              name: tagFromReq.name,
              bgColor: tagFromReq.bgColor,
              color: tagFromReq.color,
            });
            await newTag.save();
            user.tagList.set(tagKey, newTag);
          } else {
            user.tagList.set(tagKey, tagFromReq);
          }

          const userTagList = await TagModel.find({ userId });
          const tagKeysRequest = Object.keys(tagList);

          for await (let userTag of userTagList) {
            const isExist = !!tagKeysRequest.find((tagKey) => userTag.id === tagKey);
            if (!isExist) {
              const tagToDelete = await TagModel.findOne({ id: userTag.id });
              await TagModel.findOneAndRemove({ id: userTag.id })

              user.tagList.set(`${tagToDelete.id}`);
              await user.save();
            }
          }

        }

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

module.exports = TagController;
