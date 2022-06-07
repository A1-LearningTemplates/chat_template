const express = require("express");
const { Server } = require("socket.io");
var http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
module.exports = io;
