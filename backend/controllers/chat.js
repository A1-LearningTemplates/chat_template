const io = require("../index");
io.on("connection", (socket) => {
  console.log("hello");
});
