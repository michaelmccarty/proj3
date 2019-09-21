import Creature from './Creature';
import directions from '../directions';

class CollidableCreature extends Creature {
    constructor(x, y, skin, facing, map, siblings) {
        super(x, y, skin, facing, map);
        this.siblings = siblings;
        this.collisionX = x;
        this.collisionY = y;
        this.on('move', this.updateCollision);
    }

    // check siblings for collisions, then call the creature collision function
    checkCollision(direction) {
        const [dx, dy] = directions[direction];
        const [newx, newy] = [this.x + dx, this.y + dy];

        for (let sibling of this.siblings()) {
            const x = sibling.collisionX || Math.floor(sibling.x);
            const y = sibling.collisionY || Math.floor(sibling.y);
            if (x === newx && y === newy && sibling.id !== this.id) {
                return true;
            }
        }

        return super.checkCollision(direction);
    }

    updateCollision = (e) => {
        // e has the map name, so we could check if it's a transition.
        // It shouldn't matter if it is inaccurate for one cell at a transition
        if (e.type === 'walk') {
            const [dx, dy] = directions[this.facing];
            [this.collisionX, this.collisionY] = [e.x + dx, e.y + dy];
        } else if (e.type === 'hop') {
            this.collisionY = e.y + 2;
        }
    }
}

export default CollidableCreature;