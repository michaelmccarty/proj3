const maps = require('./maps');
const SocketEnum = require('../SocketEnum');
const validateMove = require('./validateMove');

function processMove (user, data) {
    const nextMove = unpackData(data);
    const validate = validateMove(user, nextMove, user.previousMove);
}

function unpackData(data) {
    // un-enumerate the socket values
}

module.exports = processMove;