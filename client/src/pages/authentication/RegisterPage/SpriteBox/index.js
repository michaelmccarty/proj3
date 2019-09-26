import React from 'react';
import actors from '../../../../actors/actors.json';
import { Sprite, AlternatingSprite } from '../../../../Sprite';
import Texture from '../../../../Texture';
import styles from './SpriteBox.module.css';

class SpriteBox extends React.Component {
    constructor(props) {
        super(props);
        this.myCanvasRef = React.createRef();
        this.sprite = new AlternatingSprite(actors[this.props.actorName].south);
        this.isHovered = false;
    }

    state = {
        isHovered: false
    }

    gameLoop = () => {
        
        if (this.stopGameLoop) return;

        const canvas = this.myCanvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        this.drawSprites(gl, [this.sprite], {x: 0, y: 0}, this.actorSpriteSheet);
        requestAnimationFrame(this.gameLoop);
    }

    componentDidMount() {
        this.drawSprites = Sprite.drawSpritesFactory(16, 16);
        const gl = this.myCanvasRef.current.getContext('webgl');

        this.actorSpriteSheet = new Texture(gl, './spritesheets/overworld-actors.png');
            
        this.sprite.pause();
        requestAnimationFrame(this.gameLoop);
    }

    componentWillUnmount() {
        this.stopGameLoop = true;
    }

    render() {
        const isActive = this.props.selected === this.props.actorName ? true : false;

        if ((isActive || this.state.isHovered) && !this.sprite.isPlaying()) this.sprite.play();
        else if (isActive && this.state.isHovered);
        else if ((!isActive || this.state.isHovered) && this.sprite.isPlaying()) this.sprite.pause();

        return (
            <figure
                onClick={() => (this.props.handleActorSelect(this.props.actorName))}
                className={styles['actor-figure']}
                >
                <canvas
                    onMouseOver={()=> {
                        this.setState({isHovered: true})
                    }}
                    onMouseLeave={()=> {
                        this.setState({isHovered: false})
                    }}
                    width="16"
                    height="16"
                    ref={this.myCanvasRef}
                    className={styles['actor-canvas']}
                    data-active={isActive}
                />
            </figure>
        )
    }
}

export default SpriteBox;