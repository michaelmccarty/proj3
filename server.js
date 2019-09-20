const express = require("express");
const socket = require("socket.io");
const SocketEnum = require('./SocketEnum');

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
io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  // For now, create a dummy user to simulate logging them in
  let user = {
    trainerId: Math.floor(100000000000000 * Math.random()),
    map: 'Route 1',
    x: 4,
    y: 4,
    socket: socket,
    skin: 'gary',
    facing: 'south'
  };

  // Should be their user object, loaded from the database, plus the socket.  
  connectedUsers[socket.id] = user;

  // For now, 

  console.log("======================================\nsockets online");
  for (let property in connectedUsers) {
    console.log(property);
  }


  // socket.on("connect", () => {
  user = connectedUsers[socket.id];
  console.log('spawning ' + user.trainerId);
  socket.join(user.map); // Need to join adjacent maps as well
  socket.to(user.map).broadcast.emit('spawn', {
    [SocketEnum.MAP]: user.map,
    [SocketEnum.DIRECTION]: SocketEnum[user.facing],
    [SocketEnum.SKIN]: user.skin,
    [SocketEnum.X]: user.x,
    [SocketEnum.Y]: user.y,
    [SocketEnum.TRAINER_ID]: user.trainerId
  });
  // });

  // console.log(user);

  socket.on('move', data => {
    user = connectedUsers[socket.id];
    console.log('move', socket.id, data)
    user.facing = SocketEnum.directions[data[SocketEnum.DIRECTION]];
    user.x = data[SocketEnum.X];
    user.y = data[SocketEnum.Y];

    socket.to(user.map).broadcast.emit('move', {
      [SocketEnum.MOVE_TYPE]: data[SocketEnum.MOVE_TYPE],
      [SocketEnum.DIRECTION]: SocketEnum[user.facing],
      [SocketEnum.X]: user.x,
      [SocketEnum.Y]: user.y,
      [SocketEnum.TRAINER_ID]: user.trainerId
    })
    // io.sockets.emit('move', data);
  });

  socket.on('populate request', data => {
    const sender = connectedUsers[socket.id];
    const output = Object.entries(connectedUsers)
      .filter(([_, user]) => user.map === data[SocketEnum.MAP] && user.socket.id !== sender.socket.id)
      .map(([_, user]) => ({
        [SocketEnum.MAP]: user.map,
        [SocketEnum.DIRECTION]: SocketEnum[user.facing],
        [SocketEnum.SKIN]: user.skin,
        [SocketEnum.X]: user.x,
        [SocketEnum.Y]: user.y,
        [SocketEnum.TRAINER_ID]: user.trainerId
      }));
    socket.emit('populate', output);
  });

  socket.on("disconnect", data => {
    console.log(socket.id + "disconnected");
    socket.broadcast.emit('despawn', {
      [SocketEnum.TRAINER_ID]: connectedUsers[socket.id].trainerId
    });
    delete connectedUsers[socket.id];
  });

  socket.on("chat", function (data) {
    console.log(data);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
