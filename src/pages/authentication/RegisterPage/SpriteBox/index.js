import React from 'react';
import actors from '../../../../actors/actors.json';
import { Sprite, AlternatingSprite } from '../../../../Sprite';
import Texture from '../../../../Texture';
import styles from './SpriteBox.module.css';

class SpriteBox extends React.Component {
    constructor(props) {
        super(props);
        this.myCanvasRef = React.createRef();
    }

    gameLoop = () => {
        
        const gl = this.myCanvasRef.current.getContext('webgl');

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        this.drawSprites(gl, [this.sprite], {x: 0, y: 0}, this.actorSpriteSheet);
        requestAnimationFrame(this.gameLoop)
    }

    componentDidMount = () => {
        this.drawSprites = Sprite.drawSpritesFactory(16, 16);
        const gl = this.myCanvasRef.current.getContext('webgl');

        this.actorSpriteSheet = new Texture(gl, './spritesheets/overworld-actors.png');
        
        console.log("ACtor: ", this.props.actorName)
        this.sprite = new AlternatingSprite(actors[this.props.actorName].south);
    
        this.sprite.play();
        requestAnimationFrame(this.gameLoop);
    }

    render() {
        return (
            <figure
                onClick={() => (this.props.handleActorSelect(this.props.actorName))}
                key={this.props.key}
                className={styles['actor-figure']}
            >
                <canvas
                    width="64"
                    height="64"
                    ref={this.myCanvasRef}
                    className={styles['actor-canvas']}
                    data-active={this.props.selected === this.props.actorName ? "true" : "false"}
                />
            </figure>
        )
    }
}

export default SpriteBox;