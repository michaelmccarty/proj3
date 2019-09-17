import Sprite from '../Sprite';
import Actor from './Actor';
import directions from '../directions';

class Player extends Actor {
    constructor(x, y, map) {
        const sprites = {
            south: new Sprite({
                x: 64,
                y: 64,
                size: 16,
                framerate: 4,
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
            north: new Sprite({
                x: 64,
                y: 64,
                size: 16,
                framerate: 4,
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
            east: new Sprite({
                x: 64,
                y: 64,
                size: 16,
                framerate: 4,
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
            west: new Sprite({
                x: 64,
                y: 64,
                size: 16,
                framerate: 4,
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
        super(x, y, sprites);
        this.facing = 'north';
        this.walking = false;
        this.map = map;
        this.speed = 3; // tile per second
        this.stepDistance = 1 / 16;
        this.stepPeriod = 1000 * this.stepDistance / this.speed; // one tile per second.  Walk speed * step distance.  1000 walk speed is 1 tile per second;
        //need to adjust sprites framerate to 4 * this.speed
    }

    turn(direction) {
        if (!this.walking) {
            this.facing = direction
        };
    }

    walk(direction) {
        if (this.walking) return;
        this.turn(direction);
        const [dx, dy] = directions[direction];

        const [newx, newy] = [this.x + dx, this.y + dy];
        // console.log(this.map(newx, newy));
        const nextTile = this.map.getTile(newx, newy);
        if (nextTile.collision !== direction && nextTile.collision) {
            return this.bonk();
        }
        for (let event of this.map.getTile(newx, newy).events) {
            // Events can trigger at different times in the walk.
            // for example, ledge jumps happen near the start, and encounters happen when fully in the new tile
            // Maybe figure out what step number the event happens on and have our step function activate it.
            event();
        }
        this.sprites[this.facing].playOnce();
        console.log('walk '+ direction);

        this.walking = true;
        this.emit('walk', direction);
        this.step(16);
    }

    step = (steps) => {
        const [dx, dy] = directions[this.facing].map(n => n * this.stepDistance);
        this.x += dx;
        this.y += dy;
        // console.log(this.x, this.y)
        if (--steps) return setTimeout(() => this.step(steps), this.stepPeriod);
        this.walking = false;
    }

    setSpeed(speed) {
        this.speed = speed;
    }
    resetSpeed() {
        this.speed = 2; // 2 is normal movement, 1 is for cutscenes.  other actors move at 1.
    }

    bonk() {
        return null;
    }

    update() {
        const sprite = this.sprites[this.facing];
        sprite.framerate = this.speed * 4;
        sprite.x = Math.floor(this.x * 16); // multiply by 16 to translate from actor coords to world coords
        sprite.y = Math.floor(this.y * 16);
        return sprite;
    }

}

export default Player;