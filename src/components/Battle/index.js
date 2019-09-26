import React from 'react';
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

// @keydown
class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.textRef = React.createRef();
        this.drawSprites = Sprite.drawSpritesFactory(160, 144);
        this.text = new Textbox(16, 116, 144, 136);
        this.actorSprites = [];
    }

    componentDidMount() {
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

        this.background = new Texture(
            this.gl,
            '../spritesheets/battle base.png'
        );

        this.actorSpritesheet = new Texture(
            this.gl,
            '../spritesheets/battle actors.png'
            // './spritesheets/overworld-actors.png'
        );

        this.backgroundSprite = new Sprite({
            x: 0,
            y: 0,
            frames: [{ x: 0, y: 0 }],
            frameRate: 1,
            size: 160
        });
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
            scale: 2
        });

        const enemyData = getSpecies(introData.species);
        this.opponentSprite = new Sprite({
            x: -56,
            y: 0,
            frames: [enemyData],
            frameRate: 1,
            size: 56
        });

        this.actorSprites.push(this.opponentSprite, this.mySprite);

        this.mySprite.animate(slide(160, 32, 0, 32, linear(1000)));
        this.opponentSprite.animate(slide(-56, 0, 96, 0, linear(1000)));

        await new Promise(response => setTimeout(response, 1000));

        this.text.printString(
            this.textCtx,
            introData ? introData.introText : 'Debug'
        );

        // wait for text advance
        await this.awaitTextAdvance();

        console.log('advance text');

        this.text.clear(this.textCtx);
        this.mySprite.animate(slide(0, 32, -64, 32, linear(300)));

        await new Promise(response => setTimeout(response, 300));

        const myPokemon = introData.myPokemon;

        await this.text.printString(
            this.textCtx,
            `Go! ${myPokemon.name}`
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

        const speciesData = getSpecies(myPokemon.species)

        this.mySprite = new Sprite({
            x: 16,
            y: 64,
            size: 32,
            scale: 2,
            frames: [speciesData.backsprite]
        });

        await this.awaitTextAdvance();





    };

    awaitTextAdvance() {
        if (!this.textAdvance) {
            this.textAdvance = new Promise(resolve => {
                this.textAdvanceFunction = resolve;
            });
        }
        this.textAdvance.then(() => delete this.textAdvance);

        return this.textAdvance;
    }

    handleKeyDown = e => {
        console.log(e);
        switch (e.key) {
            case 'f':
            case 'F':
                if (this.textAdvance) {
                    this.textAdvanceFunction();
                }
        }
    };

    draw = () => {
        const gl = this.canvasRef.current.getContext('webgl');

        // if (!this.gl) this.gl = this.canvasRef.current.getContext('gl');
        // Tilemap.useShader(this.gl);

        // this.tilemap.draw(this.gl);
        this.drawSprites(
            gl,
            [this.backgroundSprite],
            { x: 0, y: 0 },
            this.background
        );

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

    render() {
        return (
            <>
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
                    width="160"
                    height="144"
                    ref={this.textRef}
                    onKeyDown={this.handleKeyDown}
                />
            </>
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

export default Battle;
