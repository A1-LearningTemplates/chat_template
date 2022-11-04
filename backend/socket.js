// socket.io is a third party
const socket = require("socket.io");
// creating socketio connection using node server to the cliebt server
const io = socket(3001, { cors: { origin: "http://localhost:3000" } });
const chatNamespace = io.of("/chat");
const convNamespace = io.of("/conv");

module.exports = { chatNamespace, convNamespace };
require("./controllers/chat");
require("./controllers/conversation");

