const maps = require('./maps');
const $$ = require('../SocketEnum');
const validateMove = require('./validateMove');

function processMove(user, data) {
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
    console.log(user.encounterGenerator(nextMove.stepNumber));

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