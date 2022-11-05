const express = require("express");

const conversationRouter = express.Router();
const {
  getConversationById,
  updateConversation,
} = require("../controllers/conversation");

conversationRouter.get("/:user_id", getConversationById);
conversationRouter.put("/", updateConversation);
module.exports = conversationRouter;
