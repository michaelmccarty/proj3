require("dotenv").config();

const path = require("path");
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const socket = require('socket.io');
const bindGameEvents = require('./game/bindSocketEvents');
const mongoose = require('mongoose');
const db = require('./models');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project3');
mongoose.set('useFindAndModify', false);

// app setup
const app = express();
const server = require("http").Server(app);
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//serve up static assets (on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, './client/build')));
}

const LocalStrategy = require('passport-local').Strategy;

const sessionMW = session({
    secret: process.env.SESSIONKEY,
    resave: false,
    saveUninitialized: true
});

app.use(sessionMW);

app.use(passport.initialize());
const passportSession = passport.session();
app.use(passportSession);

require('./routes/api/user')(app, passport, db);

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function (req, email, password, done) {
            db.User.findOne({
                email: email
            }).then(function (user) {
                if (!user) {
                    console.log('\n\nuser not found. login failed');
                } else if (user) {

                    // hashing taking place
                    bcrypt.compare(password, user.password, function (err, res) {
                        if (res) {
                            console.log('\n\nsuccessful login, ' + user.username + '\n\n');
                            // console.log(user);
                            req.session.userId = user._id;
                            return done(null, user);
                        }
                        else {
                            console.log('\n\nbad password. login failed');
                        }
                    });

                }
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.User.findById(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(function (err) {
            done(err);
        });
});

if (process.env.NODE_ENV === "production") {
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/client/build/index.html"));
    });
}

// socket setup
const io = socket(server);

server.listen(PORT, function () {
    console.log('listening to requests on port ' + PORT);
    console.log('http://localhost:' + PORT);
});

var sharedsession = require("express-socket.io-session");

// Use shared session middleware for socket.io
io.use(sharedsession(sessionMW), {
    autoSave: true
});

// console.log(io)
const connectedUsers = {};
io.on('connection', bindGameEvents(io, connectedUsers));
