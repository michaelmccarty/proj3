const express = require("express");
const socket = require("socket.io");

// app setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

const server = app.listen(PORT, function() {
  console.log("listening to requests on port " + PORT);
  console.log("http://localhost:" + PORT);
});

require("./routes/api/user")(app);

// socket setup
const io = socket(server);
// console.log(io)
const connectedUsers = {};
io.on("connection", function(socket) {
  console.log("made socket connection", socket.id);

  connectedUsers[socket.id] = socket;

  console.log("======================================\nsockets online");
  for (let property in connectedUsers) {
    console.log(property);
  }
  // connectedUsers.forEach(socket=>{
  //   console.log(socket.id)
  // })

  socket.on("connect", () => {
    // const packet = { socketId: socket.id, connectedUsers:connectedUsers };
    // io.sockets.emit("helloworld", packet);
  });

  socket.on("disconnect", data => {
    console.log(socket.id + "disconnected");
    socket.broadcast.emit("disconnection", socket.id);
  });

  socket.on("chat", function(data) {
    console.log(data);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
