const express = require("express");

const conversationRouter = express.Router();
const {
  getConversationById,
  updateConversation,
  updateState,
} = require("../controllers/conversation");

conversationRouter.get("/:user_id", getConversationById);
conversationRouter.put("/", updateConversation);
conversationRouter.put("/state", updateState);

module.exports = conversationRouter;
