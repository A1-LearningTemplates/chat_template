const express = require("express");

const loginRouter = express.Router();
const { login, addUser } = require("../controllers/login");
module.exports = loginRouter;

loginRouter.post("/", login, addUser);
