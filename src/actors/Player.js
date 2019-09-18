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
            shadow: new Sprite({
                x: 64,
                y: 64,
                size: 16,
                framerate: 1,
                frames: [
                    {
                        "x": 32,
                        "y": 0,
                        "flip_h": false,
                        "flip_v": false
                    },
                ]
            })
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

    vOffset = 4;// how far in the tile we stand.  Changes during jumps, always 4 while walking

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

        let cb = () => { }; // callback after walk cycle
        //eslint-disable-next-line
        for (let event of nextTile.events) {
            const result = event(this);
            if (result === true) return; // if true, the event has taken control.
            else if (result) { // if the event fired, but wants the default walk behavior, it returns a callback
                cb = result;
                break;
            }
        }

        this.sprites[this.facing].playOnce();

        this.walking = true;
        // this.emit('walk', direction);
        this.step(16, cb);
    }

    step = (steps, cb) => {
        const [dx, dy] = directions[this.facing].map(n => n * this.stepDistance);
        this.x += dx;
        this.y += dy;
        // console.log(this.x, this.y)
        if (--steps) return setTimeout(() => this.step(steps, cb), this.stepPeriod);
        this.walking = false;
        cb();
    }

    hop = () => {
        console.log('hop');
        this.walking = true;
        this.sprites.south.play(2);
        let counter = 16;
        const nextTile = this.map.getTile(this.x, this.y + 2);
        let cb = () => { }; // callback after walk cycle
        //eslint-disable-next-line
        for (let event of nextTile.events) {
            const result = event(this);
            if (typeof result === 'function') { //events can't take control until after the movement is finished
                cb = result;
                break;
            }
        }

        const hopFrame = () => {
            const frameData = hopAnimation[16 - counter];
            // console.log(frameData);
            if (frameData.shadow) this.toggleShadow();
            this.y += frameData.south * 0.0625;
            this.vOffset += frameData.offset || 0;

            if (--counter) return setTimeout(hopFrame, this.stepPeriod * 2);
            console.log('done: ', this.x, this.y);
            this.walking = false;
            cb();
        }
        hopFrame();
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

    toggleShadow() {
        this.shadow = !this.shadow;
    }

    update() {
        const sprite = this.sprites[this.facing];
        sprite.framerate = this.speed * 4;
        sprite.x = Math.floor(this.x * 16); // multiply by 16 to translate from actor coords to world coords
        sprite.y = Math.floor(this.y * 16 - this.vOffset);
        if (this.shadow) {
            const shadow = this.sprites.shadow;
            shadow.x = Math.floor(this.x * 16);
            shadow.y = Math.floor(this.y * 16 + 8);
        return [shadow, sprite];
        }
        return sprite;
        // Possibly have a way to return multiple sprites, to add a shadow to jumping
    }
}

const hopAnimation = [
    {south: 2, offset: 0, shadow: true},
    {south: 2, offset: 4},
    {south: 2, offset: 2},
    {south: 2, offset: 2},
    {south: 2, offset: 3},
    {south: 2, offset: 1},
    {south: 2, offset: 0},
    {south: 2, offset: 0},
    {south: 2, offset: -1},
    {south: 2, offset: -1},
    {south: 2, offset: -1},
    {south: 2, offset: -1},
    {south: 2, offset: -4},
    {south: 2, offset: -4},
    {south: 2},
    {south: 2, offset: 0, shadow: true},
];

export default Player;