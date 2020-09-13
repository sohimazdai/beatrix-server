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

          const tagKeysRequest = Object.keys(tagList);

          const userTagList = user.tagList;
          const iterator = userTagList.entries();
          let item = iterator.next();

          while (!item.done) {
            const userTagId = item.value[0];
            const isExist = !!tagKeysRequest.find((tagKey) => tagKey === userTagId);
            if (!isExist) {
              await TagModel.findOneAndRemove({ id: userTagId });
              user.tagList.set(`${userTagId}`);
            }
            item = await iterator.next();
            await user.save();
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
