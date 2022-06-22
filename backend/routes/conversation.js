const express = require("express");

const conversationRouter = express.Router();
const {
  createConversation,
  getConversationById,
} = require("../controllers/conversation");
const { getAllMessagesByConversationId } = require("../controllers/message");
module.exports = conversationRouter;

conversationRouter.post(
  "/",
  createConversation,
  getAllMessagesByConversationId
);
conversationRouter.get("/:id", getConversationById);
