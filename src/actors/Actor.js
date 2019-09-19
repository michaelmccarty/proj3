import EventEmitter from 'events';

class Actor extends EventEmitter {
    constructor(x, y, sprites) {
        super();
        this.sprites = sprites;
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {

    }

    moveTo(x, y) {

    }

    // Needs to be able to listen to events

    // Called every frame
    // Returns a Sprite or null
    update() {
        return null;
    }

    destroy() {

    }
}

export default Actor;