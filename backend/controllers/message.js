const messageModle = require("../models/messageSchema");
const createMessage = async (req, res, next) => {
  const { message, conversation_id, sender, receiver } = req.body;
  // try {
  const data = messageModle({ message, conversation_id, sender, receiver });
  const newCreateMessage = await data.save();
  res.json(newCreateMessage);
};
const getAllMessages = async (req, res) => {
  const { sender, receiver } = req.query;
  try {
    const data = await messageModle
      .find({
        $and: [
          { $or: [{ sender: sender }, { sender: receiver }] },
          { $or: [{ receiver: sender }, { receiver: receiver }] },
        ],
      })
      .populate({
        path: "sender",
        select: "userName",
      })
      .populate({
        path: "receiver",
        select: "userName",
      });
    if (data) {
      return res.status(200).json({
        success: true,
        message: " All messages",
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
module.exports = { createMessage, getAllMessages };
