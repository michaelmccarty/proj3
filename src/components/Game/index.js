import React from 'react';
import maps from '../../maps';
import Spritesheet from '../../Spritesheet';
import Tilemap from '../../Tilemap';
import Sprite from '../../Sprite';
import Texture from '../../Texture';
import Player from '../../actors/Player';
// import directions from '../../directions';
import './style.css';

// overworld actor sprites
// import actors from '../../actors.json';

class Game extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
    }

    pressedKeys = new Set();

    maps = {};
    _spritesheetCache = {};
    spritesheetCache = new Proxy(this._spritesheetCache, {
        get: (target, key, ...rest) => {
            if (!target[key]) {
                target[key] = new Spritesheet(this.gl, key);
            }
            return Reflect.get(target, key, ...rest);
        }
    })

    setupCanvas = (element) => {
        this.canvas = element;
        this.gl = element.getContext('webgl');
        this.setup();
    };

    setup = async () => {
        // Make some sprites, load a map, whatever
        // const actorSpritesPromise = new Promise(resolve => PIXI.Loader.shared.add('./spritesheets/overworld-actors.json').load(resolve));
        this.coords = { x: 4, y: 4 };
        await this.loadMap('Route 1', (this.coords.x - 4) * 16, (this.coords.y - 4) * 16);
        this.currentMap = 'Route 1';

        requestAnimationFrame(this.gameLoop);

        this.actorSpriteSheet = new Texture(this.gl, './spritesheets/overworld-actors.png');

        this.player = new Player(this.coords.x, this.coords.y, this.maps[this.currentMap]);
        this.actors = [this.player];
        console.log(this.player.sprites['east'].position[0])

        // this.player.on('walk', this.scrollScreen);

        this.player.walk('east');

        // await Promise.all(this.maps.map(map => map.ready));
        // await actorSpritesPromise;
    }

    async loadMap(name, relX, relY) {
        const map = maps[name];
        const spritesheet = this.spritesheetCache[map.spritesheet];
        this.maps[name] = new Tilemap(this.gl, {
            width: map.width,
            height: map.height,
            tiles: map.tiles,
            spritesheet
        });

        this.maps[name].offset = { x: relX, y: relY }
        return this.maps[name].ready;
    }

    // scrollScreen = direction => {
    //     const [dx, dy] = directions[direction].map(n => n * 0.0625); // -1 / 16
    //     this.coords.x += dx;
    //     this.coords.y += dy;

    //     this.scrollTimer = setInterval(() => {
    //         const [dx, dy] = directions[direction].map(n => n * 0.0625); // -1 / 16
    //         this.coords.x += dx;
    //         this.coords.y += dy;

    //         if (Number.isInteger(this.coords.x) && Number.isInteger(this.coords.y)) {
    //             clearInterval(this.scrollTimer);
    //         }
    //     }, 1000 / (this.player.speed * 16));
    // }

    unloadMap(name) {
        delete this.maps[name];
    }

    gameLoop = (delta) => {
        const keys = this.pressedKeys;
        if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) {
            this.player.walk('north');
        } else if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) {
            this.player.walk('south');
        } else if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) {
            this.player.walk('west');
        } else if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) {
            this.player.walk('east');
        }


        [this.coords.x, this.coords.y] = [this.player.x, this.player.y];

        // If the player moved, subtract the movement from the offset of all loaded maps
        for (let mapName in this.maps) { // eslint-disable-line
            this.maps[mapName].offset = { x: (this.coords.x - 4) * 16, y: (this.coords.y - 4) * 16 }
            this.maps[mapName].draw();
        }

        const sprites = [];
        for (let actor of this.actors) { //eslint-disable-line
            const update = actor.update();

            // console.log(Array.isArray(update) ? update : [update])
            sprites.push(...(Array.isArray(update) ? update : [update]));
        }

        Sprite.drawSprites(this.gl, sprites, { x: this.coords.x * 16 - 64, y: this.coords.y * 16 - 64 }, this.actorSpriteSheet);

        requestAnimationFrame(this.gameLoop);
    }

    handleKeyDown = (e) => {
        this.pressedKeys.add(e.key);
    }

    handleKeyUp = (e) => {
        this.pressedKeys.delete(e.key);
    }

    render() {
        return <canvas className="game-content game-screen" tabIndex="0" width="160" height="144" ref={this.setupCanvas} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} />;
    }
}

export default Game;
