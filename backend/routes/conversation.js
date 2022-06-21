const express = require("express");

const conversationRouter = express.Router();
const { createConversation,getConversationById } = require("../controllers/conversation");
module.exports = conversationRouter;

conversationRouter.post("/", createConversation);
conversationRouter.get("/:id", getConversationById);

