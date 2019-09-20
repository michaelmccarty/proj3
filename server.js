const express = require("express");
const socket = require("socket.io");
const bindGameEvents = require('./game/bindSocketEvents');

// app setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

const server = app.listen(PORT, function () {
  console.log("listening to requests on port " + PORT);
  console.log("http://localhost:" + PORT);
});

require("./routes/api/user")(app);

// socket setup
const io = socket(server);
// console.log(io)
const connectedUsers = {};
io.on("connection", bindGameEvents(io, connectedUsers));