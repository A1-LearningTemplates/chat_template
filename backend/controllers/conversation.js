conversationModel = require("../models/conversationSchema");

const createConversation = async (req, res) => {
  const { _id } = req.body;
  const newConv = conversationModel({ user_id: _id });
  try {
    const newCreateConversation = await newConv.save();
    if (newCreateConversation) {
      return res.status(201).json({
        success: true,
        message: "user created",
        data: req.body,
      });
    }
    throw Error;
  } catch (error) {
    if (error.keyPattern.user_id) {
      res.status(500).json({
        success: false,
        message: `Conversation with user id :${id} already exist`,
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
const updateConversation = async (req, res) => {
  const { person, user_id } = req.body;
  try {
    const result = await conversationModel
      .findOneAndUpdate(
        { user_id: user_id },
        { $addToSet: { persons: { person: person } } },
        { new: true }
      )
      .select({ persons: { $elemMatch: { person: person } }, user_id });
    await result.populate("user_id", "userName");
    await result.populate("persons.person", "userName");
    if (result) {
      return res.status(201).json({
        success: true,
        message: "New conversation created",
        data: result.persons[0].person,
      });
    }
    throw error;
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
    const data = await conversationModel
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
