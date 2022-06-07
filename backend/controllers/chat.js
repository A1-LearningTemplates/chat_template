const io = require("../index");
io.on("connection", (socket) => {
  console.log("hello");
  socket.on("disconnect",()=> {
  console.log("bye");

  })
});
console.log(io);