import React from 'react';
import maps from '../../maps';
import Spritesheet from '../../Spritesheet';
import Tilemap from '../../Tilemap';
import { Sprite } from '../../Sprite';
import Texture from '../../Texture';
import Player from '../../actors/Player';
// import directions from '../../directions';
import styles from './Game.module.css';
import Creature from '../../actors/Creature';
import SocketEnum from '../../SocketEnum';

class Game extends React.PureComponent {

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
    });

    setupCanvas = (element) => {
        this.canvas = element;
        console.log(element);
        this.gl = this.gl || element.getContext('webgl');
        this.setup();
    };

    playerAvatars = {};

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
        this.actors.push(new Creature(13, 13, 'youngster', 'west', this.maps['Route 1']));

        this.bindPlayerEvents();
        // await Promise.all(this.maps.map(map => map.ready));
        // await actorSpritesPromise;

        this.bindSocketListeners();

        // ask the server for the other players in our map.
        this.props.socket.emit('populate request', {
            [SocketEnum.MAP]: this.currentMap
        });

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

    unloadMap(name) {
        delete this.maps[name];
    }

    bindPlayerEvents() {
        const { socket } = this.props;
        this.player.on('walk', e => {
            socket.emit('move', {
                [SocketEnum.MOVE_TYPE]: SocketEnum.WALK,
                [SocketEnum.DIRECTION]: SocketEnum[e.facing],
                [SocketEnum.X]: e.x,
                [SocketEnum.Y]: e.y
            });
        });
        this.player.on('hop', e => {
            socket.emit('move', {
                [SocketEnum.MOVE_TYPE]: SocketEnum.HOP,
                [SocketEnum.DIRECTION]: SocketEnum[e.facing],
                [SocketEnum.X]: e.x,
                [SocketEnum.Y]: e.y,
            });
        });
        this.player.on('bonk', e => {
            socket.emit('move', {
                [SocketEnum.MOVE_TYPE]: SocketEnum.BONK,
                [SocketEnum.DIRECTION]: SocketEnum[e.facing],
                [SocketEnum.X]: e.x,
                [SocketEnum.Y]: e.y,
            });
        });
    }

    bindSocketListeners() {
        const { socket } = this.props;
        socket.on('player update', this.handlePlayerUpdate);
        socket.on('spawn', this.handlePlayerTrainerSpawn);
        socket.on('move', this.handleMove);
        socket.on('populate', this.handlePopulate);
        socket.on('despawn', this.handleDespawn);
    }

    handleMove = (data) => {
        const player = this.playerAvatars[data[SocketEnum.TRAINER_ID]];
        if (!player) {
            return; // can ask the server to do a mass spawn event here
        }
        switch (data[SocketEnum.MOVE_TYPE]) {
            case SocketEnum.WALK:
                player.walkTo(
                    data[SocketEnum.X],
                    data[SocketEnum.Y],
                    SocketEnum.directions[data[SocketEnum.DIRECTION]]
                );
                break;
            case SocketEnum.HOP:
                // player.turn('south');
                player.hopTo(
                    data[SocketEnum.X],
                    data[SocketEnum.Y],
                );
                break;
            case SocketEnum.BONK:
                player.bonkFrom(
                    data[SocketEnum.X],
                    data[SocketEnum.Y],
                    SocketEnum.directions[data[SocketEnum.DIRECTION]]
                );
                break;
            // TODO: add a case for turning in place
            default:
                console.log('stuff');
        }
    }

    handlePlayerTrainerSpawn = (player) => {
        const newPlayer = new Creature(
            player[SocketEnum.X],
            player[SocketEnum.Y],
            player[SocketEnum.SKIN],
            SocketEnum.directions[player[SocketEnum.DIRECTION]],
            this.maps[player[SocketEnum.MAP]]);
        newPlayer.setSpeed(3);
        this.playerAvatars[player[SocketEnum.TRAINER_ID]] = newPlayer;
    }

    handlePopulate = (data) => {
        this.playerAvatars = {};
        data.forEach(this.handlePlayerTrainerSpawn);
    }

    handleDespawn = (player) => {
        // Despawn animation?
        delete this.playerAvatars[player[SocketEnum.TRAINER_ID]];
    }

    gameLoop = () => {
        const keys = this.pressedKeys;
        if (Date.now() > this.movementDelay) {
            if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) {
                this.player.walk('north');
            } else if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) {
                this.player.walk('south');
            } else if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) {
                this.player.walk('west');
            } else if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) {
                this.player.walk('east');
            }
        } else {
            if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) {
                this.player.turn('north');
            } else if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) {
                this.player.turn('south');
            } else if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) {
                this.player.turn('west');
            } else if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) {
                this.player.turn('east');
            }
        }

        [this.coords.x, this.coords.y] = [this.player.x, this.player.y];

        // If the player moved, subtract the movement from the offset of all loaded maps
        for (let mapName in this.maps) { // eslint-disable-line
            this.maps[mapName].offset = { x: (this.coords.x - 4) * 16, y: (this.coords.y - 4) * 16 }
            this.maps[mapName].draw(this.gl);
        }

        const sprites = [];
        for (let [_, value] of Object.entries(this.playerAvatars)) {
            sprites.push(...value.update());
        }

        for (let actor of this.actors) { //eslint-disable-line
            const update = actor.update();
            sprites.push(...update);
            // sprites.push(...(Array.isArray(update) ? update : [update]));
        }

        Sprite.drawSprites(this.gl, sprites, { x: this.coords.x * 16 - 64, y: this.coords.y * 16 - 64 }, this.actorSpriteSheet);

        requestAnimationFrame(this.gameLoop);
    }

    handleKeyDown = (e) => {
        if (!this.pressedKeys.size) this.movementDelay = Date.now() + 70;
        this.pressedKeys.add(e.key);
    }

    handleKeyUp = (e) => {
        this.pressedKeys.delete(e.key);
    }

    render() {
        return <canvas key="game-canvas" className={styles["game-screen"]} tabIndex="0" width="160" height="144" ref={this.setupCanvas} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} />;
    }
}

export default Game;
