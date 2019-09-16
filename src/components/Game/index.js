import React from 'react';
import * as PIXI from 'pixi.js';
import maps from '../../maps';
import Spritesheet from '../../Spritesheet';
import Tilemap from '../../Tilemap';
import Sprite from '../../Sprite';
import Texture from '../../Texture';

// overworld actor sprites
import actors from '../../actors.json';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.pixi_cnt = null;
    }

    state = {
        app: new PIXI.Application({
            width: 160,
            height: 144,
            transparent: false,
            antialias: false,
        })
    }

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

    updatePixiCnt = (element) => {
        // the element is the DOM object that we will use as container to add pixi stage(canvas)
        this.pixi_cnt = element;
        //now we are adding the application to the DOM element which we got from the Ref.
        if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
            this.pixi_cnt.appendChild(this.state.app.view);
            // this.gl = this.state.app.renderer.gl;
            // eslint-disable-next-line
            this.state.app.renderer.clearBeforeRender = false;
            console.log(document.getElementsByClassName('test')[0])
            this.gl = document.getElementsByClassName('test')[0].getContext('webgl');
            this.setup();
        }
    };

    setup = async () => {
        // Make some sprites, load a map, whatever
        // const actorSpritesPromise = new Promise(resolve => PIXI.Loader.shared.add('./spritesheets/overworld-actors.json').load(resolve));
        this.coords = { x: 4, y: 4 };
        await this.loadMap('Route 1', (this.coords.x - 4) * 16, (this.coords.y - 4) * 16);
        this.currentMap = 'Route 1';

        this.state.app.ticker.add(this.gameLoop);

        this.player = new Sprite(this.gl, {
            x: 64,
            y: 64,
            size: 16,
            frames: [
                {
                    "x": 64,
                    "y": 0,
                    "flip_h": false,
                    "flip_v": false
                },
                {
                    "x": 48,
                    "y": 0,
                    "flip_h": false,
                    "flip_v": false
                },
                {
                    "x": 64,
                    "y": 0,
                    "flip_h": true,
                    "flip_v": false
                },
                {
                    "x": 48,
                    "y": 0,
                    "flip_h": false,
                    "flip_v": false
                }
            ]
        });

        this.actorSpriteSheet = new Texture(this.gl, './spritesheets/overworld-actors.png');

        this.player.playOnce();
        // this.actorSpriteSheet = new Texture(this.gl, './spritesheets/test-sprite.png');



        // await Promise.all(this.maps.map(map => map.ready));
        // await actorSpritesPromise;
        // this.actorSprites = PIXI.Loader.shared.resources['./spritesheets/overworld-actors.json'].spritesheet;
        // this.playerSprite = new PIXI.AnimatedSprite(this.actorSprites.animations['player_south']);
        // let id = PIXI.Loader.shared.resources['./spritesheets/overworld-actors.json'].textures; 
        // const playerSouth = new PIXI.Sprite(id['player_south.png'])
        // this.playerSprite.x = 4 * 16;
        // this.playerSprite.y = 4 * 16;
        // playerSouth.x = 64;
        // playerSouth.y = 64;
        // this.state.app.stage.addChild(this.playerSprite);
        // this.playerSprite.animationSpeed = 1/15;
        // this.playerSprite.play();

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

    gameLoop = (delta) => {
        // If the player moved, subtract the movement from the offset of all loaded maps
        for (let mapName in this.maps) {
            this.maps[mapName].draw();
        }

        // Sprite.drawSprites(this.gl, [this.player], {x: (this.coords.x - 4) * 64, y: (this.coords.y - 4) * 64}, this.actorSpriteSheet);
        Sprite.drawSprites(this.gl, [this.player], { x: this.coords.x * 16 - 64, y: this.coords.y *16 - 64 }, this.actorSpriteSheet);

        // this.gl.useProgram(this.state.app.renderer.shader.program.glProgram);
        // if (this.state.app.renderer.shader.program && this.state.app.renderer.shader.program.glPrograms) {
        //     this.gl.useProgram(this.state.app.renderer.shader.program.glPrograms.program);
        // }
        // console.log(this.state.app.renderer.shader.program && this.state.app.renderer.shader.program.glPrograms);
    }

    render() {
        return <div style={{ width: this.props.width, height: this.props.height }} ref={this.updatePixiCnt} />;
    }
}

export default Game;