const $$ = require('../SocketEnum');
const processMove = require('./processMove');
const makeEncounterGenerator = require('../utils/random');
const Pokemon = require('./battle/Pokemon');
const db = require('./../models');
const handlePoke = require('./npc/pokeNPC');

module.exports = function (io, connectedUsers) {
    const trainerMap = {};
    return function (socket) {
        console.log('session: ', ...Object.keys(socket.handshake.session));
        // const claims = authenticateSocket(socket);
        // console.log(socket.handshake.headers);
        console.log('made socket connection', socket.id);
        // console.log(socket)
        socket.on('load game', function () {
            db.User.findById(socket.handshake.session.userId)
                .then(function ({ username: name, party, inventory, badges, caught, money, skin, facing, map, x, y, trainerId }) {
                    const user = {
                        trainerId,
                        name,
                        map,
                        x,
                        y,
                        socket,
                        skin,
                        facing,
                        pokemon: party.map(
                            ({ name, species, level, ivs, evs, moves, status }) => (
                                new Pokemon(species, level, ivs, evs, null, moves, status, name)
                            )),
                        inventory,
                        badges,
                        money,
                        previousMove: {
                            x,
                            y,
                            facing,
                            stepNumber: 0,
                            type: 'walk',
                            map
                        },
                        seed: Math.random(),
                        rngOffset: Math.floor(Math.random() * 233280),
                        stepsSinceLastEncounter: 0
                    }
                    user.encounterGenerator = makeEncounterGenerator(
                        user.seed,
                        null,
                        user.rngOffset
                    );

                    trainerMap[user.trainerId] = socket.id;

                    // Should be their user object, loaded from the database, plus the socket.
                    connectedUsers[socket.id] = user;

                    socket.emit('player data', {
                        trainerId: user.trainerId,
                        name: user.name,
                        map: user.map,
                        skin: user.skin,
                        x: user.x,
                        y: user.y,
                        facing: user.facing,
                        party: user.pokemon
                    });

                    // user = connectedUsers[socket.id];
                    console.log('spawning ' + user.trainerId);
                    socket.join(user.map); // Need to join adjacent maps as well
                    socket.to(user.map).broadcast.emit('spawn', {
                        //TODO broadcast name
                        [$$.MAP]: user.map,
                        [$$.DIRECTION]: $$[user.facing],
                        [$$.SKIN]: user.skin,
                        [$$.X]: user.x,
                        [$$.Y]: user.y,
                        [$$.TRAINER_ID]: user.trainerId
                    });

                    socket.on('move', data => {
                        if (processMove(user, data, socket)) return; // return if move is rejected;

                        socket.to(user.map).broadcast.emit('move', {
                            [$$.MOVE_TYPE]: data[$$.MOVE_TYPE],
                            [$$.DIRECTION]: $$[user.facing],
                            [$$.X]: user.x,
                            [$$.Y]: user.y,
                            [$$.TRAINER_ID]: user.trainerId
                        });
                    });

                    socket.on('poke', ({id}) => {
                        handlePoke(user, id);
                    });

                    socket.on('populate request', data => {
                        const sender = connectedUsers[socket.id];
                        const output = Object.entries(connectedUsers)
                            .filter(
                                ([_, user]) =>
                                    user.map === data[$$.MAP] &&
                                    user.socket.id !== sender.socket.id
                            )
                            .map(([_, user]) => ({
                                [$$.MAP]: user.map,
                                [$$.DIRECTION]: $$[user.facing],
                                [$$.SKIN]: user.skin,
                                [$$.X]: user.x,
                                [$$.Y]: user.y,
                                [$$.TRAINER_ID]: user.trainerId
                            }));
                        socket.emit('populate', output);
                    });

                    socket.on('seed me', data => {
                        socket.emit('reseed', {
                            seed: user.seed,
                            offset: user.rngOffset
                        });
                    });

                    socket.on('disconnect', data => {
                        console.log(socket.id + 'disconnected');
                        socket.broadcast.emit('despawn', {
                            [$$.TRAINER_ID]: connectedUsers[socket.id].trainerId
                        });
                        delete connectedUsers[socket.id];
                    });

                    socket.on('chat', function (data) {
                        // const user = connectedUsers[socket.id];
                        data.userName = getDisplayName(user);
                        io.sockets.emit('chat', data);
                        io.sockets.emit('chat2', data);
                    });

                    socket.on('typing', function (data) {
                        socket.broadcast.emit('typing', data);
                    });

                    socket.on('connectedUserCheck', data => {
                        // console.log(connectedUsers);

                        const srvSockets = io.sockets.sockets;
                        const onlineUsers = Object.entries(srvSockets)
                            .map(([socketId]) => connectedUsers[socketId])
                            .map(user => ({
                                name: user.name,
                                userName: getDisplayName(user),
                                trainerId: user.trainerId
                            }));

                        io.sockets.emit('connectedUserCheck', { onlineUsers });
                    });
                });
        });
    };
};

function getDisplayName(user) {
    return (displayName =
        user.name +
        '&' +
        user.trainerId
            .toString()
            .padStart(15, '0')
            .substring(0, 5));
}
