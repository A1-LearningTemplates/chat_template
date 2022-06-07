const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const PORT = 5000;

const newServer = server.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
module.exports = server
require("./controllers/chat")
