import map from "../src/maps/Route1";

class GameMap {
    constructor(connections, width, height, tiles, mapDictionary) {
        this.connections = connections;
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.mapDictionary = mapDictionary
    }

    getTile(x, y) {
        let map;
        if (x < 0) {
            map = this.connections['west'];
        } else if (x > this.width) {
            map = this.connections['east'];
        } else if (y < 0) {
            map = this.connections['north'];
        } else if (y > this.height) {
            map = this.connectoins['south'];
        } else {
            return this.tiles[this.width * y + x];
        }
        if (map) {
            const [dx, dy] = map.offset;
            return this.mapDictionary[map.name].getTile(x - dx, y - dy);
        }
    }

    // transforms given coords to this map's coords
    transformCoordinates(mapName, x, y) {
        // if mapName is this map's name, just return x and y
        for (let [direction, map] of Object.entries(this.connections)) {
            if (map.name === mapName) {
                return {x: x + map.offset.x, y: y + map.offset.y};
            }
        }
        // Maybe error if x, y are out of range
        return {x: x, y: y}
    }
}

module.exports = GameMap;