import Actor from './Actor';
import creatureSprites from './actors.json';
import shadowSprite from './shadow.json';
import grassOverlay from './grass.json';
import { Sprite, AlternatingSprite } from '../Sprite';
import directions from '../directions';

import hopAnimation from './animations/hop';


class Creature extends Actor {
    constructor(x, y, skin, facing = 'north', map) {
        const sprites = {
            south: new AlternatingSprite(creatureSprites[skin].south),
            north: new AlternatingSprite(creatureSprites[skin].north),
            east: new Sprite(creatureSprites[skin].east),
            west: new Sprite(creatureSprites[skin].west),
            shadow: new Sprite(shadowSprite),
        }
        super(x, y, sprites);

        this.skin = skin;
        this.facing = facing;
        this.map = map;
    }

    walking = false;
    vOffset = 4;

    stepDistance = 1 / 16;
    speed = 1;
    stepPeriod = 1000 / 16;

    step = (steps, cb) => {
        const [dx, dy] = directions[this.facing].map(n => n * this.stepDistance);
        this.x += dx;
        this.y += dy;
        if (--steps) return this.moveTimeout = setTimeout(() => this.step(steps, cb), this.stepPeriod);
        this.walking = false;
        cb && cb();
    }

    hop(cb) {
        this.walking = true;
        this.sprites.south.play(2);
        let counter = 16;

        const hopFrame = () => {
            const frameData = hopAnimation[16 - counter];
            if (frameData.shadow) this.toggleShadow();
            this.y += frameData.south * 0.0625;
            this.vOffset += frameData.offset || 0;

            if (--counter) return this.moveTimeout = setTimeout(hopFrame, this.stepPeriod * 2);
            this.walking = false;
            cb && cb();
        }
        hopFrame();
    }

    setSpeed(speed) {
        this.speed = speed;
        this.stepPeriod = 1000 * this.stepDistance / this.speed;
    }

    turn(direction) {
        if (!this.walking) {
            this.facing = direction
        };
    }

    turnInPlace(direction) {
        this.turn(direction);
        this.emit('move', { type: 'hop', x: this.x, y: this.y });
    }

    // TODO: have walks go to a queue, to prevent weird latency issues
    walk(direction, cb) {
        if (this.walking) return;
        this.turn(direction);

        const collision = this.checkCollision(direction);

        const event = { x: this.x, y: this.y }
        if (collision === true) {
            this.emit('move', { type: 'bonk', ...event });
            this.bonk();
        } else if (collision === 'hop') {
            this.emit('move', { type: 'hop', ...event });
            this.hop();
        } else {
            this.sprites[this.facing].play(1);
            this.walking = true;
            this.emit('move', { type: 'walk', ...event });
            this.step(16, cb || (() => { }));
        }
    }

    walkFrom(x, y, direction) {
        this.overridePosition(x, y);
        this.walk(direction);
    }

    hopFrom(x, y) {
        this.overridePosition(x, y);
        this.turn('south');
        this.hop();
    }

    bonkFrom(x, y, direction) {
        this.overridePosition(x, y);
        this.bonk(direction);
    }

    walkTo(x, y, direction) {
        const [dx, dy] = directions[direction];
        this.walkFrom(x - dx, y - dy, direction);
    }

    hopTo(x, y) {
        this.hopFrom(x, y - 2);
    }

    overridePosition(x, y) {
        if (this.walking) {
            clearTimeout(this.moveTimeout);
            this.walking = false;
        }
        this.x = x;
        this.y = y;
    }

    bonk(direction) {
        if (direction) this.turn(direction);
        this.walking = true;
        // Play bonk sound
        this.sprites[this.facing].play(1);
        setTimeout(() => this.walking = false, 1000 / this.speed);
    }

    nextTile(direction, distance = 1) {
        const [dx, dy] = directions[direction].map(n => n * distance);
        const [newx, newy] = [this.x + dx, this.y + dy];
        return this.map.getTile(newx, newy);
    }

    checkCollision(direction) {
        const nextTile = this.nextTile(direction);

        if (nextTile.collision !== direction && nextTile.collision) {
            return true;
        } else if (nextTile.collision === direction) {
            return 'hop';
        } else {
            return false;
        }
    }

    // returns an array of every tile the player is on
    standingOn() {
        if (this.x - Math.floor(this.x)) {
            return [
                { ...this.map.getTile(Math.floor(this.x), this.y), x: Math.floor(this.x), y: this.y },
                { ...this.map.getTile(Math.ceil(this.x), this.y), x: Math.ceil(this.x), y: this.y }
            ];
        } else if (this.y - Math.floor(this.y)) {
            return [
                { ...this.map.getTile(this.x, Math.floor(this.y)), x: this.x, y: Math.floor(this.y) },
                { ...this.map.getTile(this.x, Math.ceil(this.y)), x: this.x, y: Math.ceil(this.y) }
            ];
        }
        return [{ ...this.map.getTile(this.x, this.y), x: this.x, y: this.y }];
    }

    generateGrassEffects() {
        const tiles = this.standingOn();
        return tiles.map(tile => {
            // console.log(tile);
            if (tile.flags.grass) {
                let mask_h = 0x7FFE;
                let mask_v = 0x0FF0;
                if (this.x > tile.x) {
                    mask_h = 0x7FFE << (this.x - tile.x) * 16;
                } else if (this.x < tile.x) {
                    mask_h = 0x7FFE >> (tile.x - this.x) * 16;
                } else if (this.y > tile.y) {
                    mask_v = 0x0FF0 << (this.y - tile.y) * 16;
                } else if (this.y < tile.y) {
                    mask_v = 0x0FF0 >> (tile.y - this.y) * 16;
                }
                const sprite = new Sprite(grassOverlay);
                sprite.mask = [mask_h, mask_v];
                sprite.x = tile.x * 16;
                sprite.y = tile.y * 16;
                return sprite;
            }
            return null;
        });
    }

    toggleShadow() {
        this.shadow = !this.shadow;
    }


    update() {
        const sprite = this.sprites[this.facing];
        sprite.framerate = this.speed * 2;
        sprite.x = Math.floor(this.x * 16); // multiply by 16 to translate from actor coords to world coords
        sprite.y = Math.floor(this.y * 16 - this.vOffset);

        const grass = this.generateGrassEffects().filter(x => x);

        let shadows = [];
        if (this.shadow) {
            const shadow = this.sprites.shadow;
            shadow.x = Math.floor(this.x * 16);
            shadow.y = Math.floor(this.y * 16 + 4);
            shadows = [shadow];
        }

        return [...shadows, sprite, ...grass];
    }
}

export default Creature;