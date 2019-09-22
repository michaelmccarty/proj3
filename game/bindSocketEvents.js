const SocketEnum = require('../SocketEnum');
const attackPhase = require('../battle/attack-phase');

module.exports = function (io, connectedUsers) {
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
            facing: 'south'
        };

        // Should be their user object, loaded from the database, plus the socket.
        connectedUsers[socket.id] = user;

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
                    trainerId: user.trainerId,
                    socket: user.socket.id
                }));

            io.sockets.emit('connectedUserCheck', {onlineUsers} );
        });

        socket.on('battle/fight', data => {
            // game logic goes here
            data = attackPhase(data.yourPokemon, data.theirPokemon);
            socket.emit('battle/fight', data);
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
        
        socket.on('battleplayer', trainerId => {
            // game logic goes here
            console.log(trainerId)
            let room = "";
            for(let i = 0; i<10; i++) {
                room += Math.floor(Math.random() *10)
            }
            dataToSend= {
                player1: socket.id,
                player2: trainerId,
                room: room
            }
            socket.to(`${trainerId}`).emit('askotherplayers', dataToSend)

            io.sockets.emit('battleplayer', trainerId);
 
        });

        socket.on('formalinvite', data => {
            socket.to(`${data.player1}`).emit('assign room', data.room)
            socket.emit('assign room', data.room)
        })
    
        socket.on('start battle', room =>{
            console.log("we assigned " + socket.id + " to room", room)
            socket.join(room)
            // socket.emit()
        })

        socket.on('which room am i in', room => {
            console.log("I am in this room", room)
        })

    };
};

function getDisplayName(user) {
    return displayName = user.name + '@' + user.trainerId.toString().padStart(15, '0').substring(0, 5)
}