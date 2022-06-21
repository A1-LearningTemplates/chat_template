conversationModle = require("../models/conversationSchema");
const createConversation = async (req, res, next) => {
  const { person_one, person_two } = req.body;
  try {
    const data = conversationModle({ person_one, person_two });
    const newCreateConversation = await data.save();
    if (newCreateConversation) {
      return res.status(201).json({
        success: true,
        message: "newCreateConversation created",
        data: newCreateConversation,
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
const getConversationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await conversationModle.findOne({
      $or: [{ person_one: id }, { person_two: id }],
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
