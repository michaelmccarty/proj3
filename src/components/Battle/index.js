import React from 'react';
// import Tilemap from '../../Tilemap';
import styles from './Battle.module.css';
import { Sprite } from '../../Sprite';
// import Spritesheet from '../../Spritesheet';
import Texture from '../../Texture';

class Battle extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.drawSprites = Sprite.drawSpritesFactory();
    }

    componentDidMount() {
        this.startBattle();
    }

    startBattle() {
        this.gl = this.canvasRef.current.getContext('webgl');
        console.log(this.gl);
        const { socket } = this.props;

        this.background = new Texture(
            this.gl,
            './spritesheets/battle base.png'
        );

        this.backgroundSprite = new Sprite({
            x: 0,
            y: 0,
            frames: [{x: 0, y: 0}],
            frameRate: 1,
            size: 160,
        })
        // socket.once('battle intro', this.playIntro);
        // const tiles = backdrop.map( id => ({id: id, frames: 3}))
        // this.spritesheet = new Spritesheet(this.gl, './spritesheets/battle hud.png');
        // this.tilemap = new Tilemap(this.gl, {spritesheet: this.spritesheet, width: 160, height: 144, tiles});

        // this.tilemap.spritesheet.loaded.then( () => {
            requestAnimationFrame(this.draw);
        // })
    }



    playIntro = (introData) => {

    }



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

        requestAnimationFrame(this.draw);
    }

    render() {
        return (
            <canvas
                key="battle-canvas"
                className={styles['game-screen']}
                tabIndex="0"
                width="160"
                height="144"
                ref={this.canvasRef}
            />
        );
    }
}

const backdrop = [
    0, 0, 26, 0, 0, 0, 0, 0, 0, 0,
    56, 57, 58, 58, 58, 59, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24, 25, 25, 25, 26,
    0, 0, 0, 0, 49, 50, 50, 50, 50, 51,
    9, 1, 1, 1, 1, 1, 1, 1, 1, 2,
    8, 0, 0, 0, 0, 0, 0, 0, 0, 10,
    16, 17, 17, 17, 17, 17, 17, 17, 17, 18,
]

const mainBattleMenu = [
    9, 1, 1, 1, 1, 2,
    8, 0, 0, 0, 0, 10,
    16, 17, 17, 17, 17, 18,
]

export default Battle;
