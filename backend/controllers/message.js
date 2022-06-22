const messageModle = require("../models/messageSchema");
const createMessage = async (req, res, next) => {
  const { message, conversation_id } = req.body;
  try {
    const data = messageModle({ message, conversation_id });
    const newCreateMessage = await data.save();
    console.log(newCreateMessage);
    if (newCreateMessage) {
      return res.status(201).json({
        success: true,
        message: "New message created",
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
  const { conversation_id } = req.body;
  try {
    const data = await messageModle.find({
      conversation_id: id ? id : conversation_id,
    });
    if (data) {
      return res.status(200).json({
        success: true,
        message: " All messages with id " + id,
        data,
      });
    } else {
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
module.exports = { createMessage, getAllMessagesByConversationId };
