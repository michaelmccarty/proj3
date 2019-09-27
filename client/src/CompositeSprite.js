import { Sprite } from './Sprite.js';

class CompositeSprite extends Sprite {
    constructor(options) {
        super(options);

        this.frameGen = (function*(sprite) {
            // const frameInterval = 1 / sprite.framerate * 1000;
            restingFrame: while (true) {
                sprite._resetAnimation = false;
                while (!sprite._playing) {
                    yield sprite.frames[
                        sprite.defaultFrame && sprite.frames.length - 1
                    ];
                }

                for (let frame of sprite.frames) {
                    //eslint-disable-line
                    // Advance frames every frameInterval milliseconds
                    const last = Date.now();
                    while (Date.now() - last < 1000 / sprite.framerate) {
                        // Maybe test if a _resetAnimation flag is set and continue
                        yield frame;
                        if (!sprite._playing || sprite._resetAnimation)
                            continue restingFrame;
                    }
                    // if (sprite._resetAnimation) continue restingFrame;
                }

                if (sprite._repeat && !--sprite._repeat) {
                    // decrement only if nonzero
                    sprite.pause();
                }
            }
        })(this);
    }

    customDraw(buffer, i) {
        for (let sprite of this.textureOffset) {
            buffer[i++] = this.position[0] + sprite.dx;
            buffer[i++] = this.position[1] + sprite.dy;
            buffer[i++] = this.size;
            buffer[i++] = sprite.x;
            buffer[i++] = sprite.y;
            buffer[i++] = sprite.flip_h ? 1.0 : 0.0;
            buffer[i++] = sprite.flip_v ? 1.0 : 0.0;
            buffer[i++] = this.mask[0];
            buffer[i++] = this.mask[1];
            buffer[i++] = this.scale;
            buffer[i++] = this.filters.monochrome ? 1.0 : 0.0;
        }

        return i;
    }
}

export default CompositeSprite;
