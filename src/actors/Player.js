
// import directions from '../directions';
import Creature from './Creature';
import directions from '../directions';

class Player extends Creature {
    constructor(x, y, map, skin = "player_default") {
        super(x, y, skin, 'north', map);

        this.setSpeed(3);
        //need to adjust sprites framerate to 4 * this.speed
        this.on('move', this.handleMove);
    }

    stepNumber = 0;

    getEvent(direction, distance = 1) {
        const nextTile = this.nextTile(direction, distance);
        //eslint-disable-next-line
        for (let event of nextTile.events) {
            const result = event(this);
            if (result === true) return true; // event has taken control.
            else if (result) { // executed after the walk finishes
                return result;
            }
        }
    }

    walk(direction) {
        if (this.walking) return;
        const cb = this.getEvent(direction) || (() => { });
        if (cb === true) return; // event has taken control

        super.walk(direction, cb);
    }

    hop() {
        const cb = this.getEvent('south', 2) || (() => { });
        super.hop(cb);
    }

    handleMove = (e) => {
        let dx, dy;
        switch (e.type) {
            case 'bonk':
                [dx, dy] = [0, 0];
                break;
            case 'walk':
                [dx, dy] = directions[this.facing];
                break;
            case 'hop':
                [dx, dy] = [0, 2];
                break;
            default:
                console.log('If you\'re reading this, something has gone horribly wrong');
        }
        const [x, y] = [e.x + dx, e.y + dy];
        this.emit(e.type, {
            step: ++this.stepNumber,
            map: e.map,
            x: x,
            y: y,
            facing: this.facing
        });
    }
}

export default Player;