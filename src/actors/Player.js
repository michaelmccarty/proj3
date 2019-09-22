
// import directions from '../directions';
import CollidableCreature from './CollidableCreature';
import directions from '../directions';

class Player extends CollidableCreature {
    constructor(x, y, map, skin = "player_default", siblings) {
        super(x, y, skin, 'north', map, siblings);

        this.setSpeed(3);
        //need to adjust sprites framerate to 4 * this.speed
        this.on('move', this.handleMove);
    }

    stepNumber = 0;
    stepsSinceLastEncounter = 0;

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

    checkEncounter(direction, distance = 1, offset = 1) {
        const rand = this.encounterGenerator(this.stepNumber + offset)
        if (this.nextTile(direction, distance).flags.encounter) {
            // console.log(rand, this.map.encounterParams.density)
            if (rand < this.map.encounterParams.density && this.stepsSinceLastEncounter > 2) {
                return () => console.log('encounter!');
            }
        }
    }

    walk(direction) {
        this.stepsSinceLastEncounter ++;
        if (this.walking) return;
        const cb = this.getEvent(direction) || this.checkEncounter(direction) || (() => { });
        if (cb === true) return; // event has taken control

        super.walk(direction, cb);
    }

    hop() {
        const cb = this.getEvent('south', 2) || this.checkEncounter('south', 2, 0) || (() => { });
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