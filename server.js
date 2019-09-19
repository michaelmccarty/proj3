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

require('./routes/api/user')(app);

// socket setup
const io = socket(server);

io.on("connection", function(socket) {
  console.log(socket);
  console.log("made socket connection", socket.id);
  socket.on('connect', data=>{
    io.sockets.emit('connect');
  })
  socket.on("disconnect", data => {
    console.log(socket.id + "disconnected");
  });

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
