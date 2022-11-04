const express = require("express");

const messageRouter = express.Router();
const { createMessage, getAllMessages } = require("../controllers/message");
module.exports = messageRouter;

messageRouter.post("/", createMessage);
messageRouter.get("/", getAllMessages);
