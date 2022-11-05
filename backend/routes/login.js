const express = require("express");

const loginRouter = express.Router();
const { login, addUser } = require("../controllers/login");
module.exports = loginRouter;
const { createConversation } = require("../controllers/conversation");
loginRouter.post("/", login, addUser, createConversation);
