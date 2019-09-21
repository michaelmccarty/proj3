import Creature from './Creature';

class NPC extends Creature {
    constructor(id, x, y, skin, facing = 'north', map, isTrainer=false, sightRange=5) {
        super(x, y, skin, facing, map)
        this.id = id;
        this.isTrainer = isTrainer;
        this.sightRange = sightRange;
    }

    AI() {
        return null;
    }

    setAI(aiFunction) {
        this.AI = aiFunction;
    }

    wanderAI(intervalFunction, x1, y1, x2, y2) {
        let last = Date.now();
        return () => {
            if (intervalFunction(Date.now() - last)) {
                const options = [];
                if (this.x > x1) options.push('west');
                if (this.y > y1) options.push('north');
                if (this.x < x2) options.push('east');
                if (this.y < y2) options.push('south');
                const direction = options[Math.floor(Math.random() * options.length)];
                last = Date.now();
                this.walk(direction);
            }
        }
    }

    spinAI(intervalFunction) {
        let last = Date.now();
        return () => {
            if (intervalFunction(Date.now() - last)) {
                const direction = ['north', 'south', 'east', 'west'][Math.floor(Math.random() * 4)];
                last = Date.now();
                this.turn(direction);
            }
        }
    }

    // equal chance to activate at any point between min and max
    uniformInterval(min, max) {
        let next = Math.random() * (max - min) + min;
        return function(elapsedTime) {
            if (elapsedTime > next) {
                next = Math.random() * (max - min) + min;
                return true;
            }
        }
    }
}

export default NPC;