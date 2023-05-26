const express = require("express");

const conversationRouter = express.Router();
const {
  getConversationById,
  updateConversation,
  updateState,
} = require("../controllers/conversation");
const { deleteNotification } = require("../controllers/notification");
conversationRouter.get("/:user_id", getConversationById);
conversationRouter.put("/:id", updateConversation, deleteNotification);

module.exports = conversationRouter;
