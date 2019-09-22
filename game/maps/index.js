const fs = require('fs')
const GameMap = require('../GameMap');

const maps = {};
fs.readdirSync('./game/maps')
    .forEach(file => {
        if (file !== 'index.js') {
            const map = require('./' + file);
            maps[map.name] = new GameMap(map.connections, map.width, map.height, map.encounterParams, map.tiles, maps);
        }
    });
module.exports = maps;
