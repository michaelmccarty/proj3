const SocketEnum = require('../SocketEnum');

module.exports = function(io, connectedUsers) {
    return function(socket) {
        console.log('made socket connection', socket.id);

        // For now, create a dummy user to simulate logging them in
        let user = {
            trainerId: Math.floor(100000000000000 * Math.random()),
            map: 'Route 1',
            x: 4,
            y: 4,
            socket: socket,
            skin: 'player_default',
            facing: 'south'
        };

        // Should be their user object, loaded from the database, plus the socket.
        connectedUsers[socket.id] = user;

        // For now,

        console.log('======================================\nsockets online');
        for (let property in connectedUsers) {
            console.log(property);
        }

        // socket.on("connect", () => {
        user = connectedUsers[socket.id];
        console.log('spawning ' + user.trainerId);
        socket.join(user.map); // Need to join adjacent maps as well
        socket.to(user.map).broadcast.emit('spawn', {
            //TODO broadcast name
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
            console.log('move', socket.id, data);
            user.facing = SocketEnum.directions[data[SocketEnum.DIRECTION]];
            user.x = data[SocketEnum.X];
            user.y = data[SocketEnum.Y];

            socket.to(user.map).broadcast.emit('move', {
                [SocketEnum.MOVE_TYPE]: data[SocketEnum.MOVE_TYPE],
                [SocketEnum.DIRECTION]: SocketEnum[user.facing],
                [SocketEnum.X]: user.x,
                [SocketEnum.Y]: user.y,
                [SocketEnum.TRAINER_ID]: user.trainerId
            });
            // io.sockets.emit('move', data);
        });

        socket.on('populate request', data => {
            const sender = connectedUsers[socket.id];
            const output = Object.entries(connectedUsers)
                .filter(
                    ([_, user]) =>
                        user.map === data[SocketEnum.MAP] &&
                        user.socket.id !== sender.socket.id
                )
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

        socket.on('disconnect', data => {
            console.log(socket.id + 'disconnected');
            socket.broadcast.emit('despawn', {
                [SocketEnum.TRAINER_ID]: connectedUsers[socket.id].trainerId
            });
            delete connectedUsers[socket.id];
        });

        socket.on('chat', function(data) {
            console.log(data);
            io.sockets.emit('chat', data);
            io.sockets.emit('chat2', data);
        });

        socket.on('typing', function(data) {
            socket.broadcast.emit('typing', data);
        });

        socket.on('connectedUserCheck', data => {
            // console.log(connectedUsers);

            const srvSockets = io.sockets.sockets;
            onlineUsers = Object.keys(srvSockets);
            console.log(onlineUsers);
            io.sockets.emit('connectedUserCheck', { onlineUsers });
        });

        socket.on('battle/fight', data => {
            // game logic goes here

            socket.emit('battle/fight', 'fight');
        });

        socket.on('battle/bag', data => {
            // game logic goes here

            socket.emit('battle/bag', 'bag');
        });

        socket.on('battle/run', data => {
            // game logic goes here

            socket.emit('battle/run', 'run');
        });

        socket.on('battle/switch', data => {
            // game logic goes here
            
            socket.emit('battle/switch', 'switch');
        });
    };
};
