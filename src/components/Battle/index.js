import React from 'react';
// import Tilemap from '../../Tilemap';
import styles from './Battle.module.css';
import { Sprite } from '../../Sprite';
// import Spritesheet from '../../Spritesheet';
import Texture from '../../Texture';

import Textbox from '../../Textbox';

import slide from '../../animations/slide';
import linear from '../../animations/timings/linear';

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.textRef = React.createRef();
        this.drawSprites = Sprite.drawSpritesFactory();
        this.text = new Textbox(16, 112, 144, 128);
    }
    
    componentDidMount() {
        this.startBattle();
        this.playIntro();
    }
    
    startBattle() {
        this.gl = this.canvasRef.current.getContext('webgl');
        this.textCtx = this.textRef.current.getContext('2d')
        const { socket } = this.props;

        this.background = new Texture(
            this.gl,
            './spritesheets/battle base.png'
        );

        this.actorSpritesheet = new Texture(
            this.gl,
            './spritesheets/battle actors.png'
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
    }

    playIntro = introData => {
        this.mySprite = new Sprite({
            x: 160,
            y: 32,
            frames: [{ x: 0, y: 0 }],
            frameRate: 1,
            size: 32,
            scale: 2
        });

        // this.backgroundSprite = new Sprite({
        //     x: 0,
        //     y: 0,
        //     frames: [{ x: 0, y: 0 }],
        //     frameRate: 1,
        //     size: 160
        // });

        this.mySprite.animate(slide(160, 32, 0, 32, linear(1000)));
        this.text.printString(this.textCtx, 'A wild Rattata appears!');
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

        if (this.mySprite) {
            this.drawSprites(
                gl,
                [this.mySprite],
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
                    tabIndex="0"
                    width="160"
                    height="144"
                    ref={this.canvasRef}
                />
                <canvas
                    key="battle-text"
                    className={styles['game-screen']}
                    width="160"
                    height="144"
                    ref={this.textRef}
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
