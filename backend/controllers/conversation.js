conversationModle = require("../models/conversationSchema");
const { chatNamespace } = require("../socket");

const createConversation = async (req, res, next) => {
  const { user_id, socket_id } = req.body;
  const newConv = conversationModle({ user_id });
  try {
    const newCreateConversation = await newConv.save();
    await newCreateConversation.populate("persons.person", "userName");
    if (newCreateConversation) {
      chatNamespace.to(socket_id).emit("conv", newCreateConversation);
      return res.status(201).json({
        success: true,
        message: "New conversation created",
      });
    }
    throw Error;
  } catch (error) {
    if (error.keyPattern.user_id) {
      res.status(500).json({
        success: false,
        message: `Conversation with user id :${user_id} already exist`,
        error,
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
const updateConversation = async (req, res, next) => {
  const { person, user_id, socket_id } = req.body;
  try {
    const newCreateConversation = await conversationModle
      .findOneAndUpdate(
        { user_id: user_id },
        { $addToSet: { persons: { person } } },
        { new: true }
      )
      .select({ persons: { $elemMatch: { person: person } } });
    await newCreateConversation.populate("persons.person", "userName");
    if (newCreateConversation) {
      chatNamespace.to(socket_id).emit("conv", newCreateConversation[0]);
      return res.status(201).json({
        success: true,
        message: "New conversation created",
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
  const { user_id } = req.params;
  try {
    const data = await conversationModle
      .findOne({ user_id })
      .populate("persons.person", "userName");

    if (data) {
      return res.status(200).json({
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
module.exports = {
  createConversation,
  getConversationById,
  updateConversation,
};
