import Actor from './Actor';
import creatureSprites from './actors.json';
import shadowSprite from './shadow.json';
import {Sprite, AlternatingSprite} from '../Sprite';
import directions from '../directions';

import hopAnimation from './animations/hop';


class Creature extends Actor {
    constructor(x, y, skin, facing = 'north', map) {
        const sprites = {
            south: new AlternatingSprite(creatureSprites[skin].south),
            north: new AlternatingSprite(creatureSprites[skin].north),
            east: new Sprite(creatureSprites[skin].east),
            west: new Sprite(creatureSprites[skin].west),
            shadow: new Sprite(shadowSprite)
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
        if (--steps) return setTimeout(() => this.step(steps, cb), this.stepPeriod);
        this.walking = false;
        cb && cb();
    }

    hop(cb) {
        console.log('hop');
        this.walking = true;
        this.sprites.south.play(2);
        let counter = 16;

        const hopFrame = () => {
            const frameData = hopAnimation[16 - counter];
            // console.log(frameData);
            if (frameData.shadow) this.toggleShadow();
            this.y += frameData.south * 0.0625;
            this.vOffset += frameData.offset || 0;

            if (--counter) return setTimeout(hopFrame, this.stepPeriod * 2);
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

    walk(direction, cb) {
        if (this.walking) return;
        this.turn(direction);

        const collision = this.checkCollision(direction);

        if (collision === true) {
            this.bonk();
        } else if (collision === 'hop') {
            this.hop();
        } else {
            this.sprites[this.facing].play(1);
            this.walking = true;
            this.step(16, cb || (() => { }));
        }
    }

    bonk() {
        return null;
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

    toggleShadow() {
        this.shadow = !this.shadow;
    }

    update() {
        const sprite = this.sprites[this.facing];
        sprite.framerate = this.speed * 2;
        sprite.x = Math.floor(this.x * 16); // multiply by 16 to translate from actor coords to world coords
        sprite.y = Math.floor(this.y * 16 - this.vOffset);
        if (this.shadow) {
            const shadow = this.sprites.shadow;
            shadow.x = Math.floor(this.x * 16);
            shadow.y = Math.floor(this.y * 16 + 8);
            return [shadow, sprite];
        }
        return sprite;
    }
}

export default Creature;