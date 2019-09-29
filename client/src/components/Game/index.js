import React from 'react';
import maps from '../../maps';
import Spritesheet from '../../Spritesheet';
import Tilemap from '../../Tilemap';
import { Sprite } from '../../Sprite';
import Texture from '../../Texture';
import Player from '../../actors/Player';
import directions from '../../directions';
import styles from './Game.module.css';
import Creature from '../../actors/Creature';
import SocketEnum from '../../SocketEnum';
import NPC from '../../actors/NPC';
import makeEncounterGenerator from '../../utils/random';
import * as battleTransitions from '../../battle transitions';
// import Textbox from '../../Textbox';
import playDialog from './dialogBox';

import { withRouter } from 'react-router-dom';

import gameDPad from '../../gamepad-imgs/d-pad-element-01.svg';
import gameActionA from '../../gamepad-imgs/action-button-01.svg';
import gameActionB from '../../gamepad-imgs/action-button-02.svg';

let gamepads = {};

class Game extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.textRef = React.createRef();

        this.currentContext = 'default';
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
    });

    playerAvatars = {};
    _NPCs = {};
    NPCs = new Proxy(this._NPCs, {
        get: function (target, prop, receiver) {
            if (!target[prop]) {
                target[prop] = [];
            }
            return Reflect.get(...arguments);
        },

        set: function (target, prop, receiver) {
            if (!target[prop]) {
                target[prop] = [];
            }
            return Reflect.set(...arguments);
        }
    });

    setup = async () => {
        this.currentContext = 'default';
        this.ctx = this.textRef.current.getContext('2d');

        // Make some sprites, load a map, whatever
        this.coords = { x: 4, y: 4 };
        this.currentMap = 'Route 1';

        this.actorSpriteSheet = new Texture(
            this.gl,
            './spritesheets/overworld-actors.png'
        );

        this.menuSprites = new Texture(
            this.gl,
            './spritesheets/battle-base.png'
        );

        this.dialogBox = new Sprite({
            x: 0,
            y: 96,
            frames: [{ x: 160, y: 208 }],
            // mask: [0xFFFF, 0xFA00],
            framerate: 1,
            size: 160
        });

        this.drawSprites = Sprite.drawSpritesFactory(160, 144);
        {
            const playerDataPromise = new Promise(resolve =>
                this.props.socket.once('player data', data => resolve(data))
            );

            // signal the server to spawn us in
            this.props.socket.emit('load game');
            const {
                x,
                y,
                map,
                skin,
                facing,
                party,
                trainerId
            } = await playerDataPromise;

            this.currentMap = map;
            this.coords = { x, y };

            await this.loadMap(
                'Route 1',
                (this.coords.x - 4) * 16,
                (this.coords.y - 4) * 16
            );

            console.log(x, y, map, skin, facing, party, trainerId);

            this.player = new Player(
                x,
                y,
                this.maps[map],
                this.getCollidables,
                skin,
                facing
            );

            this.player.party = party;
        }

        // this.player = new Player(
        //     this.coords.x,
        //     this.coords.y,
        //     this.maps[this.currentMap],
        //     'player_default',
        //     this.getCollidables
        // );
        this.actors = [this.player];

        // {
        //     const youngster = new NPC(
        //         1,
        //         13,
        //         13,
        //         'youngster',
        //         'west',
        //         this.maps['Route 1'],
        //         this.getCollidables
        //     );
        //     youngster.setAI(
        //         youngster.wanderAI(
        //             youngster.uniformInterval(2000, 6000),
        //             12,
        //             12,
        //             15,
        //             15
        //         )
        //     );
        //     youngster.setSpeed(1.5);
        //     this.NPCs['Route 1'].push(youngster);
        // }

        this.maps[this.currentMap].npcs.forEach((npc, i) => {
            console.log(npc);
            if (npc.actor) {
                this.maps[this.currentMap].npcs[i] = new NPC(
                    i,
                    npc.x,
                    npc.y,
                    npc.skin,
                    npc.facing,
                    this.maps[this.currentMap],
                    this.getCollidables
                )
                const newNPC = this.maps[this.currentMap].npcs[i]
                if (npc.ai) {
                    newNPC.setAI(
                        newNPC[npc.ai.type](
                            newNPC[npc.ai.timing.type](...npc.ai.timing.args),
                            ...npc.ai.args
                        )
                    )
                }
                console.log(newNPC);
                newNPC.setSpeed(npc.speed);
                this.NPCs[this.currentMap].push(newNPC);
                console.log(this.NPCs[this.currentMap]);
            }
        })

        this.collidables = [this.player, ...this.NPCs[this.currentMap]];
        console.log('collision', this.collidables);

        this.bindPlayerEvents();
        // await Promise.all(this.maps.map(map => map.ready));
        // await actorSpritesPromise;

        this.bindSocketListeners();

        // ask the server for the other players in our map.
        this.props.socket.emit('populate request', {
            [SocketEnum.MAP]: this.currentMap
        });

        this.player.encounterGenerator = makeEncounterGenerator(
            0,
            this.props.socket
        );

        requestAnimationFrame(this.gameLoop);
    };

    getCollidables = () => {
        // Need to get item balls and stuff in here too
        return [this.player, ...this.NPCs[this.currentMap]];
    };

    async loadMap(name, relX, relY) {
        const map = maps[name];
        const spritesheet = this.spritesheetCache[map.spritesheet];
        this.maps[name] = new Tilemap(this.gl, {
            mapName: name,
            ...map,
            spritesheet
        });

        this.maps[name].offset = { x: relX, y: relY };
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
                [SocketEnum.STEP]: e.step,
                [SocketEnum.DIRECTION]: SocketEnum[e.facing],
                [SocketEnum.MAP]: e.map,
                [SocketEnum.X]: e.x,
                [SocketEnum.Y]: e.y
            });
        });
        this.player.on('hop', e => {
            socket.emit('move', {
                [SocketEnum.MOVE_TYPE]: SocketEnum.HOP,
                [SocketEnum.STEP]: e.step,
                [SocketEnum.DIRECTION]: SocketEnum[e.facing],
                [SocketEnum.MAP]: e.map,
                [SocketEnum.X]: e.x,
                [SocketEnum.Y]: e.y
            });
        });
        this.player.on('bonk', e => {
            socket.emit('move', {
                [SocketEnum.MOVE_TYPE]: SocketEnum.BONK,
                [SocketEnum.STEP]: e.step,
                [SocketEnum.DIRECTION]: SocketEnum[e.facing],
                [SocketEnum.MAP]: e.map,
                [SocketEnum.X]: e.x,
                [SocketEnum.Y]: e.y
            });
        });
        this.player.on('random encounter', e => {
            if (!this.transitionAnimation) {
                this.determineEncounterAnimation();
            }
            // console.log(this.transitionAnimation, battleTransitions);
            this.animationPromise = this.maps[this.currentMap].playAnimation(
                battleTransitions[this.transitionAnimation]
            );
            // Play encounter animation
        });
    }

    bindSocketListeners() {
        const { socket } = this.props;
        socket.on('player update', this.handlePlayerUpdate);
        socket.on('spawn', this.handlePlayerTrainerSpawn);
        socket.on('move', this.handleMove);
        socket.on('populate', this.handlePopulate);
        socket.on('despawn', this.handleDespawn);
        socket.on('move response', this.handleMoveResponse);
        socket.on('dialog', this.handleDialog);
        this.listenForEncounters();
        // socket.on('random encounter', this.handleEncounter);
    }

    listenForEncounters() {
        const serverEncounterEvent = new Promise(resolve =>
            this.props.socket.once('random encounter', resolve)
        );
        const clientEncounterEvent = new Promise(resolve =>
            this.player.once('random encounter', () => {
                this.shouldBeFocused = false;
                this.props.socket.once('battle end', () => {
                    this.player.inBattle = false;
                    this.shouldBeFocused = true;
                });
                resolve();
            })
        );

        // serverEncounterEvent.catch(() => {});
        // clientEncounterEvent.catch(() => {});

        Promise.race([serverEncounterEvent, clientEncounterEvent]).then(
            this.determineEncounterAnimation
        );

        Promise.all([serverEncounterEvent, clientEncounterEvent]).then(
            this.handleEncounter
        );
    }

    tryPoke() {
        console.log('poke');
        const [dx, dy] = directions[this.player.facing];
        const [newx, newy] = [this.player.x + dx, this.player.y + dy];
        const npc = this.player.map.npcs.findIndex(npc => {
            console.log(npc);
            return npc.x === newx && npc.y === newy
        });
        console.log(npc);
        console.log(newx, newy);
        if (npc > -1) {
            this.props.socket.emit('poke', { id: npc });
            this.player.map.npcs[npc].busy = true;
            this.player.map.npcs[npc].turn(
                { north: 'south', south: 'north', east: 'west', west: 'east' }[this.player.facing]
            )
            this.busyNPC = npc;
        }
    }

    determineEncounterAnimation = data => {
        if (data) console.log(data);
        if (this.player.map.type === 'field') {
            // if (data.lvl && this.player.pokemon[0].lvl + 3 <= data.lvl) {
            this.transitionAnimation = 'wildFieldWeak';
            // }
        } else {
            this.transitionAnimation = 'wildFieldWeak';
        }
    };

    handleMove = data => {
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
                player.hopTo(data[SocketEnum.X], data[SocketEnum.Y]);
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
    };

    handleDialog = text => {
        this.currentContext = 'dialog';
        this.ctx = this.ctx || this.textRef.current.getContext('2d');
        this.dialogAdvance = playDialog(text, this.ctx, this.gl);
        console.log(text);
    }

    handlePlayerTrainerSpawn = player => {
        const newPlayer = new Creature(
            player[SocketEnum.X],
            player[SocketEnum.Y],
            player[SocketEnum.SKIN],
            SocketEnum.directions[player[SocketEnum.DIRECTION]],
            this.maps[player[SocketEnum.MAP]]
        );
        newPlayer.setSpeed(3);
        this.playerAvatars[player[SocketEnum.TRAINER_ID]] = newPlayer;
    };

    handlePopulate = data => {
        // TODO: only clear out avatars in the route we're populating;
        this.playerAvatars = {};
        data.forEach(this.handlePlayerTrainerSpawn);
    };

    handleDespawn = player => {
        // Despawn animation?
        delete this.playerAvatars[player[SocketEnum.TRAINER_ID]];
    };

    handleMoveResponse = data => {
        if (!data[SocketEnum.REJECTED]) return; // everything is daijoubu

        // We're not where we should be.  Revert the state given by the server.
        const response = {
            rejected: data[SocketEnum.REJECTED],
            x: data[SocketEnum.X],
            y: data[SocketEnum.Y],
            facing: data[SocketEnum.DIRECTION],
            step: data[SocketEnum.STEP]
        };
        this.player.stepNumber = response.step;

        this.player.overridePosition(response.x, response.y);
    };

    handleEncounter = async ([data]) => {
        this.listenForEncounters(); // set up the listeners again
        // go into battle context
        console.log(data);
        await this.animationPromise;
        this.props.history.push('/game/battle');
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.maps[this.currentMap].resetAnimation();
    };

    gameLoop = () => {
        if (!this.canvasRef.current) {
            return requestAnimationFrame(this.gameLoop);
        }
        this.gl = this.canvasRef.current.getContext('webgl');
        const keys = this.pressedKeys;

        if (navigator.getGamepads()[0]) {
            this.gamepadEvents();
        }

        console.log(this.currentContext);
        if (this.currentContext === 'default') {
            if (Date.now() > this.movementDelay) {
                if (
                    keys.has('ArrowUp') ||
                    keys.has('w') ||
                    keys.has('W') ||
                    keys.has('mobileUp')
                ) {
                    this.player.walk('north');
                } else if (
                    keys.has('ArrowDown') ||
                    keys.has('s') ||
                    keys.has('S') ||
                    keys.has('mobileDown')
                ) {
                    this.player.walk('south');
                } else if (
                    keys.has('ArrowLeft') ||
                    keys.has('a') ||
                    keys.has('A') ||
                    keys.has('mobileLeft')
                ) {
                    this.player.walk('west');
                } else if (
                    keys.has('ArrowRight') ||
                    keys.has('d') ||
                    keys.has('D') ||
                    keys.has('mobileRight')
                ) {
                    this.player.walk('east');
                }
            } else {
                if (
                    keys.has('ArrowUp') ||
                    keys.has('w') ||
                    keys.has('W') ||
                    keys.has('mobileUp')
                ) {
                    this.player.turn('north');
                } else if (
                    keys.has('ArrowDown') ||
                    keys.has('s') ||
                    keys.has('S') ||
                    keys.has('mobileDown')
                ) {
                    this.player.turn('south');
                } else if (
                    keys.has('ArrowLeft') ||
                    keys.has('a') ||
                    keys.has('A') ||
                    keys.has('mobileLeft')
                ) {
                    this.player.turn('west');
                } else if (
                    keys.has('ArrowRight') ||
                    keys.has('d') ||
                    keys.has('D') ||
                    keys.has('mobileRight')
                ) {
                    this.player.turn('east');
                }
            }
        }

        [this.coords.x, this.coords.y] = [this.player.x, this.player.y];

        Tilemap.useShader(this.gl);
        // If the player moved, subtract the movement from the offset of all loaded maps
        for (let mapName in this.maps) {
            // eslint-disable-line
            this.maps[mapName].offset = {
                x: (this.coords.x - 4) * 16,
                y: (this.coords.y - 4) * 16
            };
            this.maps[mapName].draw(this.gl);
        }

        const sprites = [];
        for (let [_, value] of Object.entries(this.playerAvatars)) {
            //eslint-disable-line
            sprites.push(...value.update());
        }

        // extend logic to adjacent maps

        const npcs = this.getVisibleMaps().flatMap(map => this.NPCs[map]);
        for (let npc of npcs) {
            //eslint-disable-line
            npc.AI();
            sprites.push(...npc.update());
        }

        for (let actor of this.actors) {
            //eslint-disable-line
            const update = actor.update();
            sprites.push(...update);
            // sprites.push(...(Array.isArray(update) ? update : [update]));
        }

        this.drawSprites(
            this.gl,
            sprites,
            { x: this.coords.x * 16 - 64, y: this.coords.y * 16 - 64 },
            this.actorSpriteSheet
        );

        if (this.currentContext == 'dialog') {
            this.drawSprites(
                this.gl,
                [this.dialogBox],
                { x: 0, y: 0 },
                this.menuSprites
            );
        }

        requestAnimationFrame(this.gameLoop);
    };

    render() {
        return (
            <div id="game-canvas-container" className={styles['game-screen']}>
                <canvas
                    key="game-canvas"
                    className={styles['game-canvas']}
                    tabIndex="0"
                    width="160"
                    height="144"
                    ref={this.canvasRef}
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                />
                <canvas
                    className={styles['game-canvas']}
                    tabIndex="1"
                    width="160"
                    height="144"
                    ref={this.textRef}
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                />
                <div
                    className={styles['game-mobile-controls']}
                    id="mobile-controls"
                >
                    <div className={styles['left-controls']}>
                        <button
                            onTouchStart={() => {
                                if (!this.pressedKeys.size)
                                    this.movementDelay = Date.now() + 70;
                                this.pressedKeys.add('mobileUp');
                            }}
                            onTouchEnd={() => {
                                this.pressedKeys.delete('mobileUp');
                            }}
                        >
                            <img src={gameDPad} alt="Up" />
                        </button>
                        <button
                            onTouchStart={() => {
                                if (!this.pressedKeys.size)
                                    this.movementDelay = Date.now() + 70;
                                this.pressedKeys.add('mobileDown');
                            }}
                            onTouchEnd={() => {
                                this.pressedKeys.delete('mobileDown');
                            }}
                        >
                            <img src={gameDPad} alt="Down" />
                        </button>
                        <button
                            onTouchStart={() => {
                                if (!this.pressedKeys.size)
                                    this.movementDelay = Date.now() + 70;
                                this.pressedKeys.add('mobileLeft');
                            }}
                            onTouchEnd={() => {
                                this.pressedKeys.delete('mobileLeft');
                            }}
                        >
                            <img src={gameDPad} alt="Left" />
                        </button>
                        <button
                            onTouchStart={() => {
                                if (!this.pressedKeys.size)
                                    this.movementDelay = Date.now() + 70;
                                this.pressedKeys.add('mobileRight');
                            }}
                            onTouchEnd={() => {
                                this.pressedKeys.delete('mobileRight');
                            }}
                        >
                            <img src={gameDPad} alt="Right" />
                        </button>
                        {/* <button onClick={this.pressedKeys.add("mobileUp")}>Left</button>    
                    <button onClick={this.pressedKeys.add("mobileUp")}>Right</button>     */}
                    </div>
                    <div className={styles['right-controls']}>
                        <button
                            className={styles['game-action-buttons']}
                            onTouchStart={() => {
                                // Run 'a' button
                            }}
                        >
                            <img src={gameActionA} alt="A" />
                        </button>
                        <button
                            className={styles['game-action-buttons']}
                            onTouchStart={() => {
                                // Run 'b' button
                            }}
                        >
                            <img src={gameActionB} alt="B" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    getVisibleMaps() {
        return [this.currentMap];
    }

    gamepadHandler = (event, connecting) => {
        const gamepad = event.gamepad;

        if (connecting) {
            gamepads[gamepad.index] = gamepad;
            console.log('gamepad is connected! :', gamepad);
        } else {
            delete gamepads[gamepad.index];
            alert('gamepad is disconnected!');
        }
    };

    handleKeyDown = e => {
        if (!this.pressedKeys.size) this.movementDelay = Date.now() + 70;
        this.pressedKeys.add(e.key);
        if (e.key === 'f' || e.key === 'F') {
            this.contextButton();
        }
    };

    handleKeyUp = e => {
        this.pressedKeys.delete(e.key);
    };

    // context sensitive button
    contextButton() {
        switch (this.currentContext) {
            case 'dialog':
                if (this.dialogAdvance()) {
                    this.currentContext = 'default';
                    this.player.map.npcs[this.busyNPC].busy = false;
                }
                break;
            default:
                this.tryPoke();
        }
    }

    gamepadEvents = () => {
        const mainGamepad = navigator.getGamepads()[0];

        if (gamepads[0]) {
            const { axes: joy, buttons: btn } = mainGamepad;

            if (btn[0].pressed === true) {
                this.contextButton();
            } else if (btn[1].pressed === true) {
                alert(
                    'pressed B! add this to game loop when we use A/B Buttons'
                );
            }

            // axes[0] is x-axis
            // axes[1] is y-axis
            // axes[2,3] are the second joystick
            const axisThreshold = 0.75;

            if (joy[0] > axisThreshold) {
                if (!this.pressedKeys.size)
                    this.movementDelay = Date.now() + 70;
                this.pressedKeys.add('ArrowRight');
            } else if (joy[0] < -1 * axisThreshold) {
                if (!this.pressedKeys.size)
                    this.movementDelay = Date.now() + 70;
                this.pressedKeys.add('ArrowLeft');
            } else if (
                joy[0] <= axisThreshold &&
                joy[0] >= -1 * axisThreshold
            ) {
                this.pressedKeys.delete('ArrowRight');
                this.pressedKeys.delete('ArrowLeft');
            }

            if (joy[1] > axisThreshold) {
                if (!this.pressedKeys.size)
                    this.movementDelay = Date.now() + 70;
                this.pressedKeys.add('ArrowDown');
            } else if (joy[1] < -1 * axisThreshold) {
                if (!this.pressedKeys.size)
                    this.movementDelay = Date.now() + 70;
                this.pressedKeys.add('ArrowUp');
            } else if (
                joy[1] <= axisThreshold &&
                joy[1] >= -1 * axisThreshold
            ) {
                this.pressedKeys.delete('ArrowDown');
                this.pressedKeys.delete('ArrowUp');
            }
        }
    };

    componentDidMount = () => {
        this.gl =
            this.canvasRef.current &&
            this.canvasRef.current.getContext('webgl');
        window.addEventListener(
            'gamepadconnected',
            event => {
                this.gamepadHandler(event, true);
            },
            false
        );

        window.addEventListener(
            'gamepaddisconnected',
            event => {
                this.gamepadHandler(event, false);
            },
            false
        );

        document.getElementById(
            'game-canvas-container'
        ).oncontextmenu = new Function('return false;');
        this.setup();
    };

    componentDidUpdate() {
        if (this.shouldBeFocused) {
            this.canvasRef.current.focus();
        }
    }
}

export default withRouter(Game);
