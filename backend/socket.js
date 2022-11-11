// socket.io is a third party
const { Server } = require("socket.io");
// creating socketio connection using node server to the cliebt server
const io = new Server(3001, { cors: { origin: "*" } });
const chatNamespace = io.of("/chat");
const convNamespace = io.of("/conv");

module.exports = { chatNamespace, convNamespace };
require("./controllers/chat");
require("./controllers/conversation");
