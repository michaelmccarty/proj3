import Sprite from '../Sprite';
import Actor from './Actor';

const player = new Actor();

const sprites = {
    south: new Sprite(gl, {
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
    }),
    north: new Sprite(gl, {
        x: 64,
        y: 64,
        size: 16,
        frames: [
            {
                "x": 16,
                "y": 0,
                "flip_h": false,
                "flip_v": false
            },
            {
                "x": 0,
                "y": 0,
                "flip_h": false,
                "flip_v": false
            },
            {
                "x": 16,
                "y": 0,
                "flip_h": true,
                "flip_v": false
            },
            {
                "x": 0,
                "y": 0,
                "flip_h": false,
                "flip_v": false
            }
        ]
    }),
    east: new Sprite(gl, {
        x: 64,
        y: 64,
        size: 16,
        frames: [
            {
                "x": 7 * 16,
                "y": 0,
                "flip_h": false,
                "flip_v": false
            },
            {
                "x": 6 * 16,
                "y": 0,
                "flip_h": false,
                "flip_v": false
            },
            {
                "x": 7 * 16,
                "y": 0,
                "flip_h": false,
                "flip_v": false
            },
            {
                "x": 6 * 16,
                "y": 0,
                "flip_h": false,
                "flip_v": false
            }
        ]
    }),
    west: new Sprite(gl, {
        x: 64,
        y: 64,
        size: 16,
        frames: [
            {
                "x": 7 * 16,
                "y": 0,
                "flip_h": true,
                "flip_v": false
            },
            {
                "x": 6 * 16,
                "y": 0,
                "flip_h": true,
                "flip_v": false
            },
            {
                "x": 7 * 16,
                "y": 0,
                "flip_h": true,
                "flip_v": false
            },
            {
                "x": 6 * 16,
                "y": 0,
                "flip_h": true,
                "flip_v": false
            }
        ]
    }),
}

