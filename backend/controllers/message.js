const messageModle = require("../models/chatSchema");
conversationModle = require("../models/conversationSchema");
const createMessage = async (req, res, next) => {
  const { message, conversation_id } = req.body;
  try {
    const data = messageModle({ message, conversation_id });
    const newCreateMessage = await data.save();
    if (newCreateMessage) {
      return res.status(201).json({
        success: true,
        message: "new Message created",
        data: newCreateMessage,
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
const getAllMessagesByConversationId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await messageModle.find({ conversation_id: id });
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
module.exports = { createMessage, getAllMessagesByConversationId };
