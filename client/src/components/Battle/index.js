import React from 'react';
import { withRouter } from 'react-router-dom';
// import Tilemap from '../../Tilemap';
import styles from './Battle.module.css';
import { Sprite } from '../../Sprite';
import CompositeSprite from '../../CompositeSprite';
// import Spritesheet from '../../Spritesheet';
import Texture from '../../Texture';

import Textbox from '../../Textbox';

import slide from '../../animations/slide';
import linear from '../../animations/timings/linear';

import getSpecies from '../../pokedex/getSpecies';

// import keydown from 'react-keydown';

import effectSprites from '../../battle-sprites/sprites.json';

import gameDPad from '../../gamepad-imgs/d-pad-element-01.svg';
import gameActionA from '../../gamepad-imgs/action-button-01.svg';
import gameActionB from '../../gamepad-imgs/action-button-02.svg';

// @keydown
class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.textRef = React.createRef();
        this.drawSprites = Sprite.drawSpritesFactory(160, 144);

        this.text = {};

        this.text.log = new Textbox(8, 108, 144, 128);
        this.text.enemyName = new Textbox(8, 0, 72, 8);
        this.text.enemyLevel = new Textbox(40, 8, 56, 16);

        this.text.myName = new Textbox(80, 56, 160, 64);
        this.text.myLevel = new Textbox(120, 64, 136, 72);
        this.text.myHP = new Textbox(88, 80, 156, 88);

        this.text.battleMenu = new Textbox(80, 112, 156, 140);
        this.text.moveMenu = new Textbox(48, 104, 156, 140, 0);
        this.text.moveDetails = new Textbox(8, 64, 89, 89);

        this.actorSprites = [];
        this.hudSprites = [];
        this.cursorSettings = {};

        this.boxes = {};

        this.boxes.battleMenu = new Sprite({
            x: 64,
            y: 96,
            frames: [{ x: 160, y: 0 }],
            frameRate: 1,
            size: 96
        });

        this.boxes.moveMenu = new Sprite({
            x: 32,
            y: 96,
            frames: [{ x: 32, y: 160 }],
            frameRate: 1,
            size: 160
        });

        this.boxes.moveDetails = new Sprite({
            x: 0,
            y: 56,
            frames: [{ x: 160, y: 96 }],
            frameRate: 1,
            size: 80
        });

        this.hpBars = {};

        {
            const xCoords = [96, 112, 128]
            this.hpBars.player = xCoords.map(x => new Sprite({
                x,
                y: 75,
                frames: [{ x: 0, y: 160 }],
                frameRate: 1,
                size: 16
            }));
            console.log(this.hpBars.player);
        }

        {
            const xCoords = [32, 48, 64]
            this.hpBars.enemy = xCoords.map(x => new Sprite({
                x,
                y: 19,
                frames: [{ x: 0, y: 160 }],
                frameRate: 1,
                size: 16
            }));
        }
    }

    componentDidMount() {
        this.stopDrawLoop = false;
        this.startBattle();
        this.canvasRef.current.focus();
        // this.playIntro();
    }

    startBattle() {
        this.gl = this.canvasRef.current.getContext('webgl');
        this.textCtx = this.textRef.current.getContext('2d', {
            antialias: false
        });
        const { socket } = this.props;

        socket.on('battle update opponent', this.handleUpdateOpponent);

        socket.once('battle end', this.battleEnd);

        this.background = new Texture(this.gl, '/spritesheets/battle-base.png');

        this.actorSpritesheet = new Texture(
            this.gl,
            // '/spritesheets/battle actors.png'
            '/spritesheets/battle-actors.png'
        );

        this.backgroundSprite = new Sprite({
            x: 0,
            y: 0,
            frames: [{ x: 0, y: 0 }],
            frameRate: 1,
            size: 160
        });

        this.selectArrow = new Sprite({
            x: 0,
            y: 0,
            frames: [{ x: 240, y: 96 }],
            frameRate: 1,
            size: 8
        });

        this.configureCursor('inactive');

        this.hudSprites.push(this.backgroundSprite);
        requestAnimationFrame(this.draw);

        socket.once('battle intro', this.playIntro);
        socket.emit('battle ready');
    }

    playIntro = async introData => {
        console.log('battle intro', introData);
        this.mySprite = new Sprite({
            x: 160,
            y: 32,
            frames: [{ x: 0, y: 0 }],
            frameRate: 1,
            size: 32,
            scale: 2,
            filters: { monochrome: true }
        });

        this.enemy = this.enemy || {};
        this.enemy.previous = this.enemy.previous || { pctHP: 1 };
        this.enemy.current = this.enemy.current || { pctHP: 1 };
        const enemyData = getSpecies(introData.species);
        this.opponentSprite = new Sprite({
            x: -56,
            y: 0,
            frames: [enemyData],
            frameRate: 1,
            size: 56,
            filters: { monochrome: true }
        });

        this.actorSprites.push(this.opponentSprite, this.mySprite);

        this.mySprite.animate(slide(160, 32, 0, 32, linear(1000)));
        this.opponentSprite.animate(slide(-56, 0, 96, 0, linear(1000)));

        await new Promise(response => setTimeout(response, 1000));
        this.mySprite.filters.monochrome = false;
        this.opponentSprite.filters.monochrome = false;

        // this.text.log.printString(
        //     this.textCtx,
        //     introData ? introData.introText : 'Debug'
        // );

        // wait for text advance
        await this.awaitTextAdvance(
            this.text.log.printString(
                this.textCtx,
                introData ? introData.introText : 'Debug'
            )
        );

        // Enemy HP bar renders here
        this.hudSprites.push(...this.hpBars.enemy);
        this.updateHPBar('enemy', 1);

        this.text.enemyName.printString(this.textCtx, introData.pokemonName, 0);

        this.text.enemyLevel.printString(
            this.textCtx,
            introData.level.toString(),
            0
        );

        this.text.log.clear(this.textCtx);
        this.mySprite.animate(slide(0, 32, -64, 32, linear(300)));

        await new Promise(response => setTimeout(response, 300));

        // this.actorSprites = [this.opponentSprite];
        this.actorSprites.pop(); // player backsprite

        const myPokemon = introData.myPokemon;
        this.myPokemon = myPokemon;
        console.log(this.myPokemon);

        await this.text.log.printString(this.textCtx, `Go! ${myPokemon.name}`);

        this.text.myName.printString(this.textCtx, myPokemon.name, 0);

        this.hudSprites.push(...this.hpBars.player);
        this.updateHPBar('player', this.myPokemon.stats.hp / this.myPokemon.stats.maxHp);
        // this.updateHPBar('player', myPokemon.stats.hp / myPokemon.stats.maxHp);

        this.text.myLevel.printString(
            this.textCtx,
            myPokemon.level.toString(),
            0
        );

        this.text.myHP.printString(
            this.textCtx,
            myPokemon.stats.hp.toString().padStart(3, ' ') +
            '/' +
            myPokemon.stats.maxHp.toString().padStart(3, ' '),
            0
        );

        const poof = new CompositeSprite({
            ...effectSprites.poof,
            x: 32,
            y: 80
        });

        const pokeballAnimation = poof.play(1);

        this.actorSprites.push(poof);

        await pokeballAnimation;

        this.actorSprites.pop();

        const speciesData = getSpecies(myPokemon.species);
        console.log(myPokemon.species, speciesData);

        this.mySprite = new Sprite({
            x: 0,
            y: 32,
            size: 32,
            scale: 2,
            frameRate: 1,
            frames: [speciesData.backSprite]
        });

        this.actorSprites.push(this.mySprite);

        await this.awaitTextAdvance();

        // Draw the menu.

        // this.myPokemon = myPokemon;

        this.chooseAction();

        // The server is waiting for us to select our action
    };

    executeTurn = async turnData => {
        if (this.canExitBattle) this.exitBattle();
        console.log(turnData);
        const meFirst = turnData.script.whoFirst === 'me' ? 0 : 1;

        const updatedPokemon = turnData.pokemon1;
        this.myPokemonPrevious = { ...this.myPokemon };
        this.myPokemon.status = updatedPokemon.status;
        this.myPokemon.stats = updatedPokemon.stats;

        this.handleUpdateOpponent(turnData.pokemon2);

        if (meFirst) {
            // don't play the second if the first one feints
            if (await this.executeTurnAction(turnData.script[0]))
                await this.executeTurnAction(
                    turnData.script[1],
                    turnData.pokemon2.name
                );
        } else {
            if (
                await this.executeTurnAction(
                    turnData.script[1],
                    turnData.pokemon2.name
                )
            )
                await this.executeTurnAction(turnData.script[0]);
        }
        this.myPokemon.moves = updatedPokemon.moves;
        this.myPokemon.level = updatedPokemon.level;

        this.chooseAction();
    };

    async executeTurnAction(action, enemy) {
        if (action.type === 'fight') {
            // Pokemon used Move

            // sprite animation + screen effects
            // screen shake
            // HP bar
            const attackText = this.text.log.printString(
                this.textCtx,
                `${
                enemy ? `Enemy ${enemy}` : this.myPokemon.name
                } used ${action.move.toUpperCase()}!`
            )

            // we're taking damage
            if (enemy && this.myPokemonPrevious.stats.hp - this.myPokemon.stats.hp) {
                await Promise.all(
                    [
                        this.animateHealthText(
                            this.myPokemonPrevious.stats.hp,
                            this.myPokemon.stats.hp
                        ),
                        this.animateHPBar(
                            'player',
                            this.myPokemonPrevious.stats.hp / this.myPokemonPrevious.stats.maxHp,
                            this.myPokemon.stats.hp / this.myPokemon.stats.maxHp
                        )
                    ]);
            } else if (!enemy) {
                await this.animateHPBar(
                    'enemy',
                    this.enemy.previous.pctHP,
                    this.enemy.current.pctHP
                );
            }

            await this.awaitTextAdvance(attackText);

            if (action.miss) {
                const missText = this.text.log.printString(
                    this.textCtx,
                    enemy ? `Enemy ${this.enemy.current.name}` : this.myPokemon.name + '\'s attack missed.'
                )
                this.text.log.clear(this.textCtx);
                await this.awaitTextAdvance(missText);
                
            }

            this.text.log.clear(this.textCtx);

            // Critical Hit!
            if (action.crit) {
                await this.awaitTextAdvance(
                    this.text.log.printString(this.textCtx, 'Critical hit!')
                );
                this.text.log.clear(this.textCtx);
            }

            // super effective
            if (action.effectiveness > 1) {
                await this.awaitTextAdvance(
                    this.text.log.printString(
                        this.textCtx,
                        "It's super effective!"
                    )
                );
                this.text.log.clear(this.textCtx);

                // not very effective
            } else if (action.effectiveness < 1) {
                await this.awaitTextAdvance(
                    this.text.log.printString(
                        this.textCtx,
                        "It's not very effective..."
                    )
                );
                this.text.log.clear(this.textCtx);
            }

            if (action.effect == 'FNT') {
                // play feint animation
                await this.awaitTextAdvance(
                    this.text.log.printString(
                        this.textCtx,
                        `${
                        !enemy ? `Enemy ${this.enemy.current.name}` : this.myPokemon.name
                        } feinted!`
                    )
                );
                this.text.log.clear(this.textCtx);
            } else if (action.effect) {
                let adjective;
                switch (action.effect.value) {
                    case -2:
                        adjective = 'sharply';
                        break;
                    case 2:
                        adjective = 'greatly';
                        break;
                }
                await this.awaitTextAdvance(
                    this.text.log.printString(
                        this.textCtx,
                        (action.effect.target === 'enemy' &&
                            (!enemy ? `Enemy ${this.enemy.current.name}` : this.myPokemon.name)) +
                            '\'s ' + action.effect.stat +
                            (adjective || '') + ' ' +
                            (action.effect.value < 0 ? 'fell' : 'rose')
                    )
                )
                this.text.log.clear(this.textCtx);
            }
            // Pokemon was statused

            return !(action.effect === 'FNT');
        }
    }

    async chooseAction() {
        if (this.canExitBattle) this.exitBattle();

        // draw the battle menu
        this.text.log.clear(this.textCtx);
        this.hudSprites.push(this.boxes.battleMenu);
        const battleMenuString = 'FIGHT $%\n' + 'ITEM  RUN';
        this.text.battleMenu.printString(this.textCtx, battleMenuString, 0);

        // draw the cursor
        this.hudSprites.push(this.selectArrow);
        this.configureCursor('battle menu');

        const selection = new Promise(resolve => (this._select = resolve));
        this._instantExit = true;
        const action = await selection;
        this._instantExit = false;

        this.hudSprites.pop(); // battle menu
        this.props.socket.once('battle turn results', this.executeTurn);
        this.props.socket.emit('battle action', action);
    }

    battleEnd = ({ condition, winner }) => {
        console.log(condition, winner);
        if (winner === 'me') {
            this.canExitBattle = true;
            if (this._instantExit) {
                this.exitBattle();
            }
        } else {

            // respawn player with full health pokemon
            this.canExitBattle = true;
            if (this._instantExit) {
                this.exitBattle();
            }
        }
    };

    async exitBattle(code) {
        if (code) {
            await this.awaitTextAdvance(
                this.text.log.printString(
                    this.textCtx,
                    `Player has no more usable pokemon\nPlayer blacks out`
                )
            );
            await this.fadeToBlack();
        }
        // Play post battle message here
        Object.entries(this.text).map(([, textbox]) =>
            textbox.clear(this.textCtx)
        );
        this.hudSprites = [];
        this.actorSprites = [];
        this.props.history.goBack();
    }

    async fadeToBlack() {
        // need to do some canvas post processing here.
    }

    awaitTextAdvance(textboxPromise) {
        if (!this.textAdvance) {
            this.textAdvance = new Promise(resolve => {
                this.textAdvanceFunction = () => {
                    console.log('f');
                    if (!textboxPromise || textboxPromise.isResolved) {
                        resolve();
                        delete this.textAdvance;
                    } else {
                        console.log('advance');
                        textboxPromise.textbox.advance();
                    }
                };
            });
        }
        // this.textAdvance.then(() => delete this.textAdvance);

        return this.textAdvance;
    }

    animateHealthText(start, end) {
        const interval = (start - end) / 90;
        let current = start;
        let _resolve;
        const frame = () => {
            if (current === end) return _resolve();

            current -= interval;
            if (current < end) current = end;

            this.text.myHP.clear(this.textCtx);
            this.text.myHP.printString(
                this.textCtx,
                Math.floor(current).toString().padStart(3, ' ') +
                '/' +
                this.myPokemon.stats.maxHp.toString().padStart(3, ' '),
                0
            );
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        return new Promise(resolve => _resolve = resolve);
    }

    animateHPBar(target, start, end) {
        const interval = 1 / 48;
        let current = start;
        let _resolve;
        const frame = () => {
            current -= interval;
            if (current < end) return _resolve();
            this.updateHPBar(target, current);
            setTimeout(frame, 33);
        }
        setTimeout(frame, 0);
        return new Promise(resolve => _resolve = resolve);
    }

    configureCursor(preset) {
        console.log('configuring cursor to: ' + preset);
        switch (preset) {
            case 'battle menu':
                this.cursorSettings = {
                    active: true,
                    options: [
                        [
                            { x: 72, y: 112, cb: this.fightMenu },
                            { x: 120, y: 112, cb: this.pkmnMenu }
                        ],
                        [
                            { x: 72, y: 128, cb: this.itemMenu },
                            { x: 120, y: 128, cb: this.run }
                        ]
                    ],
                    current: [0, 0]
                };
                break;
            case 'move menu':
                this.cursorSettings = {
                    active: true,
                    options: [
                        ...this.myPokemon.moves.map((_, i) => [
                            { x: 40, y: 104 + 8 * i, cb: () => this.useMove(i) }
                        ])
                    ],
                    current: [0, 0]
                };
                break;
            case 'inactive':
                this.cursorSettings = {
                    active: false
                };
                return;
        }
        const options = this.cursorSettings.options;
        const current = this.cursorSettings.current;
        this.selectArrow.x = options[current[1]][current[0]].x;
        this.selectArrow.y = options[current[1]][current[0]].y;
    }

    selectOption() {
        if (!this.cursorSettings.active) return;
        const current = this.cursorSettings.current;
        const cb = this.cursorSettings.options[current[1]][current[0]].cb
        this.configureCursor('inactive');
        cb();
    }

    fightMenu = () => {
        // console.log(this.myPokemon);
        // const moves = this.myPokemon.moves;
        this.hudSprites.pop(); // cursor
        const moveString = this.myPokemon.moves
            .map(move => move.name.toUpperCase())
            .concat(
                Array(4)
                    .fill('-')
                    .slice(0, this.myPokemon.moves.length)
            )
            .join('\n');
        this.text.battleMenu.clear(this.textCtx);
        this.hudSprites.push(this.boxes.moveMenu);
        this.hudSprites.push(this.selectArrow);
        this.text.moveMenu.printString(this.textCtx, moveString, 0);
        this.configureCursor('move menu');
    };

    useMove = slot => {
        this.text.moveMenu.clear(this.textCtx);
        this.hudSprites.pop(); // cursor
        this.hudSprites.pop(); // move box
        this._select({
            type: 'fight',
            movename: this.myPokemon.moves[slot].name
        });
    };

    updateHPBar = (target, pct) => {
        // console.log(pct);
        const shift = Math.floor(48 * pct) || (pct > 0 ? 1 : 0);
        // console.log('shift', shift);
        this.hpBars[target].forEach((sprite, i) => {
            // console.log('hp bar shift: ', ((i + 1) * 16 > shift ? (i + 1) * 16 - shift : 0));
            let shiftBy = ((i + 1) * 16 > shift ? (i + 1) * 16 - shift : 0);
            shiftBy = shiftBy < 16 ? shiftBy : 16;
            sprite.mask = [0xFFFF >> shiftBy, 0xFFFF];
        });
    }

    handleUpdateOpponent = (data) => {
        console.log(data);
        this.enemy.previous = this.enemy.current;
        this.enemy.current = data;
    }

    handleKeyDown = e => {
        // console.log(e);
        switch (e.key) {
            case 'f':
            case 'F':
                if (this.textAdvance) {
                    this.textAdvanceFunction();
                } else {
                    this.selectOption();
                }
                break;
            case 'a':
            case 'A':
            case 'ArrowLeft':
                this.moveCursor('left');
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                this.moveCursor('down');
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                this.moveCursor('right');
                break;
            case 'w':
            case 'W':
            case 'ArrowUp':
                this.moveCursor('up');
                break;
        }
    };

    moveCursor(direction) {
        if (!this.cursorSettings.active) return;
        const settings = this.cursorSettings;
        console.log(settings.current);
        switch (direction) {
            case 'left':
                if (settings.current[0] > 0) settings.current[0]--;
                break;
            case 'right':
                if (settings.current[0] < settings.options[0].length - 1)
                    settings.current[0]++;
                break;
            case 'up':
                if (settings.current[1] > 0) settings.current[1]--;
                break;
            case 'down':
                if (settings.current[1] < settings.options.length - 1)
                    settings.current[1]++;
                break;
        }
        this.selectArrow.x =
            settings.options[settings.current[1]][settings.current[0]].x;
        this.selectArrow.y =
            settings.options[settings.current[1]][settings.current[0]].y;
    }

    draw = () => {
        if (this.stopDrawLoop) return;
        const gl = this.canvasRef.current.getContext('webgl');

        // if (!this.gl) this.gl = this.canvasRef.current.getContext('gl');
        // Tilemap.useShader(this.gl);

        // this.tilemap.draw(this.gl);
        this.drawSprites(gl, this.hudSprites, { x: 0, y: 0 }, this.background);

        if (this.actorSprites.length) {
            this.drawSprites(
                gl,
                this.actorSprites,
                { x: 0, y: 0 },
                this.actorSpritesheet
            );
        }

        requestAnimationFrame(this.draw);
    };

    componentWillUnmount() {
        this.stopDrawLoop = true;

        this.props.socket.removeAllListeners('battle update opponent');
    }

    render() {
        return (
            <div className={styles['battle-game-container']}>
                <canvas
                    key="battle-canvas"
                    className={styles['game-screen']}
                    tabIndex="1"
                    width="160"
                    height="144"
                    ref={this.canvasRef}
                    onKeyDown={this.handleKeyDown}
                />
                <canvas
                    key="battle-text"
                    className={styles['game-screen']}
                    tabIndex="2"
                    width="160"
                    height="144"
                    ref={this.textRef}
                    onKeyDown={this.handleKeyDown}
                />
                <div
                    className={styles['battle-mobile-controls']}
                    id="mobile-controls"
                >
                    <div className={styles['left-controls']}>
                        <button
                            onTouchStart={() => {
                                this.handleKeyDown(new KeyboardEvent('keydown', { 'key': 'ArrowUp' }));
                            }}
                        >
                            <img src={gameDPad} alt="Up" />
                        </button>
                        <button
                            onTouchStart={() => {
                                this.handleKeyDown(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
                            }}
                        >
                            <img src={gameDPad} alt="Down" />
                        </button>
                        <button
                            onTouchStart={() => {
                                this.handleKeyDown(new KeyboardEvent('keydown', { 'key': 'ArrowLeft' }));
                            }}
                        >
                            <img src={gameDPad} alt="Left" />
                        </button>
                        <button
                            onTouchStart={() => {
                                this.handleKeyDown(new KeyboardEvent('keydown', { 'key': 'ArrowRight' }));
                            }}
                        >
                            <img src={gameDPad} alt="Right" />
                        </button>
                    </div>
                    <div className={styles['right-controls']}>
                        <button
                            className={styles['game-action-buttons']}
                            onTouchStart={() => {
                                this.handleKeyDown(new KeyboardEvent('keydown', { 'key': 'f' }));
                            }}
                        >
                            <img src={gameActionA} alt="A" />
                        </button>
                        <button
                            className={styles['game-action-buttons']}
                            onTouchStart={() => {
                                this.handleKeyDown(new KeyboardEvent('keydown', { 'key': 'b' }));
                            }}
                        >
                            <img src={gameActionB} alt="B" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const backdrop = [
    0,
    0,
    26,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    56,
    57,
    58,
    58,
    58,
    59,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    25,
    25,
    25,
    26,
    0,
    0,
    0,
    0,
    49,
    50,
    50,
    50,
    50,
    51,
    9,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    8,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    10,
    16,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    18
];

const mainBattleMenu = [
    9,
    1,
    1,
    1,
    1,
    2,
    8,
    0,
    0,
    0,
    0,
    10,
    16,
    17,
    17,
    17,
    17,
    18
];

export default withRouter(Battle);
