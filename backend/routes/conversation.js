const express = require("express");

const conversationRouter = express.Router();
const {
  createConversation,
  getConversationById,
  updateConversation,
} = require("../controllers/conversation");
const { getAllMessages } = require("../controllers/message");
module.exports = conversationRouter;

conversationRouter.post("/", createConversation, getAllMessages);
conversationRouter.get("/:user_id", getConversationById);
conversationRouter.put("/", updateConversation);
