import React from 'react';
import * as PIXI from 'pixi.js';
import maps from '../../maps';
import Spritesheet from '../../Spritesheet';
import Tilemap from '../../Tilemap';

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
            this.gl = this.state.app.renderer.gl;
            // eslint-disable-next-line
            this.state.app.renderer.clearBeforeRender = false;
            // console.log(document.getElementsByClassName('test')[0])
            // this.gl = document.getElementsByClassName('test')[0].getContext('webgl');
            this.setup();
        }
    };

    setup = async () => {
        // Make some sprites, load a map, whatever
        await this.loadMap('Route 1', 6*16, 26*16);
        this.currentMap = 'Route 1';
        this.coords = { x: 10, y: 10 };

        this.state.app.ticker.add(this.gameLoop);
        // await Promise.all(this.maps.map(map => map.ready));
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
    }

    render() {
        return <div style={{ width: this.props.width, height: this.props.height }} ref={this.updatePixiCnt} />;
    }
}

export default Game;