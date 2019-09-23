const maps = require('./maps');
const $$ = require('../SocketEnum');
const validateMove = require('./validateMove');
const encounterTable = require('./encounterTable');

function processMove(user, data, socket) {
    const nextMove = unpackData(data);
    const validate = validateMove(user, nextMove, user.previousMove);
    if (!validate) {
        const reject = { ...packData(user.previousMove), [$$.REJECTED]: true };
        user.socket.emit('move response', reject)
        // Send rejection chunk to client
        console.log('rejected');
        return true;
    };

    // update the user's state
    user.previousMove = nextMove;
    user.x = nextMove.x;
    user.y = nextMove.y;
    user.map = nextMove.map;
    user.facing = nextMove.facing;

    // calculate events

    // calculate trainer line of sight

    // check random encounters
    // console.log(user.encounterGenerator(nextMove.stepNumber));
    // console.log(maps[user.map]);
    user.stepsSinceLastEncounter++;
    const rand = user.encounterGenerator(nextMove.stepNumber);
    const currentMap = maps[user.map]

    if ( currentMap.getTile(user.x, user.y).flags.encounter && rand < currentMap.encounterParams.density && 
        user.stepsSinceLastEncounter > 2) {
            user.stepsSinceLastEncounter = 0;
            const roll = Math.floor(Math.random() * 256);
            const slot = 9 - encounterTable.findIndex(a => a < roll );
            const encounter = currentMap.encounterParams.encounters[slot];
            console.log(`Encountered a level ${encounter.lvl} ${encounter.species}`);

            // Create a room name for the random battle
            // send 'random encounter' event to the socket
            // initialize a server side battle with the room name

            socket.emit('random encounter', encounter);
    }

    /* 
        event {
            newPosition: [x, y],
            blockMovement: true,
            response: socket chunk
        }
    */

    return false;
}

function unpackData(data) {
    // un-enumerate the socket values
    return {
        x: data[$$.X],
        y: data[$$.Y],
        facing: $$.directions[data[$$.DIRECTION]],
        stepNumber: data[$$.STEP],
        type: $$.types[data[$$.MOVE_TYPE]],
        map: data[$$.MAP]
    }
}

function packData(data) {
    return {
        [$$.X]: data.x,
        [$$.Y]: data.y,
        [$$.DIRECTION]: data.facing,
        [$$.MAP]: data.map,
        [$$.STEP]: data.stepNumber
    }
}

module.exports = processMove;