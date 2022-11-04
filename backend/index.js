const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;
const server = http.createServer(app);
// import the routers
require("./socket");
const loginRouter = require("./routes/login");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");

mongoose.connect("mongodb://localhost:27017/Chat_app").then(
  () => {
    console.log("database connected");
  },
  (err) => {
    console.log(err);
  }
);
// endpoints Router
app.use("/user", loginRouter);
app.use("/message", messageRouter);
app.use("/conversation", conversationRouter);

server.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
