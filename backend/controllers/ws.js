// const http = require("http");
// const ws = require("ws");
// const server = http.createServer((req, res) => {
//   res.end("i am connected");
// });
// const wss = new ws.Server({ server });
// wss.on("headers", (headers, req) => {
//   console.log(headers);
// });
// wss.on("connection", (ws, req) => {
//   ws.on("message", (msg) => {
//     console.log(msg.toString());
//   });

//   ws.send("welcome to the websocket server");
//   // console.log(req);
// });
// server.listen(8000);
