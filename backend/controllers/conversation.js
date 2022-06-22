conversationModle = require("../models/conversationSchema");
const createConversation = async (req, res, next) => {
  const { person_one, person_two } = req.body;
  try {
    const isData = await conversationModle.findOne({
      $or: [
        { $and: [{ person_one: person_one }, { person_two: person_two }] },
        { $and: [{ person_one: person_two }, { person_two: person_one }] },
      ],
    });
    if (isData) {
      return res.status(201).json({
        success: true,
        message: "Conversation already exist",
        isData,
      });
    } else {
      const data = conversationModle({ person_one, person_two });
      const newCreateConversation = await data.save();
      if (newCreateConversation) {
        return res.status(201).json({
          success: true,
          message: "New conversation created",
          data: newCreateConversation,
        });
      }
      throw Error;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
const getConversationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await conversationModle
      .find({
        $or: [{ person_one: id }, { person_two: id }],
      })
      .populate({
        path: "person_one",
        match: { _id: { $ne: id } },
      })
      .populate({
        path: "person_two",
        match: { _id: { $ne: id } }
      });

    if (data) {
      return res.status(201).json({
        success: true,
        message: " the Conversation",
        data,
      });
    }
    throw Error;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
module.exports = { createConversation, getConversationById };
