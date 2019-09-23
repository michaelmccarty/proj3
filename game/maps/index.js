const fsp = require('fs').promises;
const GameMap = require('./GameMap');

const maps = {};
fsp.readdir('./').then(file => {
    const map = require(file);
    maps[map.name] = new GameMap(map.connectoins, map.width, map.height, map.tiles);
});

module.exports = maps;
