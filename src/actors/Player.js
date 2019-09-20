
// import directions from '../directions';
import Creature from './Creature';


class Player extends Creature {
    constructor(x, y, map, skin = "player_default") {
        super(x, y, skin, 'north', map);

        this.setSpeed(3);
        //need to adjust sprites framerate to 4 * this.speed
    }

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
        const cb = this.getEvent(direction) || (() => {});
        if (cb === true) return; // event has taken control

        super.walk(direction, cb);
        this.emit('walk')
    }

    hop() {
        const cb = this.getEvent('south' , 2) || (() => {});
        super.hop(cb);
    }
}

export default Player;