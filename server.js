const express = require('express');
const socket = require('socket.io');
const bindGameEvents = require('./game/bindSocketEvents');
const mongoose = require('mongoose');
const db = require('./models')
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/project3")

// app setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const server = app.listen(PORT, function() {
    console.log('listening to requests on port ' + PORT);
    console.log('http://localhost:' + PORT);
});

require('./routes/api/user')(app, db);

// socket setup
const io = socket(server);
// console.log(io)
const connectedUsers = {};
io.on('connection', bindGameEvents(io, connectedUsers));
