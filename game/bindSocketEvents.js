const $$ = require('../SocketEnum');
const processMove = require('./processMove');
const makeEncounterGenerator = require( '../utils/random');


module.exports = function (io, connectedUsers) {
    const trainerMap = {};
    return function (socket) {
        console.log('made socket connection', socket.id);

        // For now, create a dummy user to simulate logging them in
        let user = {
            trainerId: Math.floor(100000000000000 * Math.random()),
            name: 'Ash',
            map: 'Route 1',
            x: 4,
            y: 4,
            socket: socket,
            skin: 'player_default',
            facing: 'south',
            previousMove: {
                x: 4,
                y: 4,
                facing: 'south',
                stepNumber: 0,
                type: 'walk',
                map: 'Route 1',
            },
            // Parameters for random encounters
            seed: Math.random(),
            rngOffset: Math.floor(Math.random() * 233280),
            stepsSinceLastEncounter: 0
        };

        user.encounterGenerator = makeEncounterGenerator(user.seed, null, user.rngOffset);

        trainerMap[user.trainerId] = socket.id;



        // Should be their user object, loaded from the database, plus the socket.
        connectedUsers[socket.id] = user;

        // socket.on("connect", () => {
        user = connectedUsers[socket.id];
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
            user = connectedUsers[socket.id];
            // console.log('move', socket.id, data);
            if (processMove(user, data, socket)) return; // return if move is rejected;

            // user.facing = $$.directions[data[$$.DIRECTION]];
            // user.x = data[$$.X];
            // user.y = data[$$.Y];

            // console.log(user.facing);

            socket.to(user.map).broadcast.emit('move', {
                [$$.MOVE_TYPE]: data[$$.MOVE_TYPE],
                [$$.DIRECTION]: $$[user.facing],
                [$$.X]: user.x,
                [$$.Y]: user.y,
                [$$.TRAINER_ID]: user.trainerId
            }); 
            // io.sockets.emit('move', data);
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
            const user = connectedUsers[socket.id];
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
            // const onlineUsers = 
            // console.log(srvSockets);
            const onlineUsers = Object.entries(srvSockets)
                .map(([socketId]) => connectedUsers[socketId])
                .map(user => ({
                    name: user.name,
                    userName: getDisplayName(user),
                    trainerId: user.trainerId
                }));

            io.sockets.emit('connectedUserCheck', { onlineUsers });
        });
    };
};

function getDisplayName(user) {
    return displayName = user.name + '@' + user.trainerId.toString().padStart(15, '0').substring(0, 5)
}