const express = require("express");

const messageRouter = express.Router();
const {
  createMessage,
  getAllMessagesByConversationId,
} = require("../controllers/message");
module.exports = messageRouter;

messageRouter.post("/", createMessage);
messageRouter.get("/:id", getAllMessagesByConversationId);
