import spriteVS from './shaders/sprite.vert';
import spriteFS from './shaders/sprite.frag';

import { vec2 } from './utils/gl-matrix-min';
import GLUtil from './utils/gl-utils';

class Sprite {
    constructor(options) {
        this.currentFrame = 0;
        this.sheet = options.spriteSheet;
        this.size = options.size || 16;
        this.frames = options.frames || [{ x: 0, y: 0 }]; // [{x, y}]
        this.framerate = options.framerate || 2;

        this.defaultFrame = options.restFrame === 'first' || 1;

        // Sprites position in the world
        this.position = vec2.create();
        this.position[0] = options.x || 0;
        this.position[1] = options.y || 0;

        this.frameGen = (function* (sprite) {
            // const frameInterval = 1 / sprite.framerate * 1000;
            restingFrame:
            while (true) {
                sprite._resetAnimation = false;
                while (!sprite._playing) {
                    yield sprite.frames[sprite.defaultFrame && sprite.frames.length - 1];
                }

                for (let frame of sprite.frames) { //eslint-disable-line
                    // Advance frames every frameInterval milliseconds
                    const last = Date.now();
                    while (Date.now() - last < 1000 / sprite.framerate) {
                        // Maybe test if a _resetAnimation flag is set and continue
                        yield frame;
                        if (!sprite._playing || sprite._resetAnimation) continue restingFrame;
                    }
                    // if (sprite._resetAnimation) continue restingFrame;
                }
 
                if (sprite._repeat && !--sprite._repeat){ // decrement only if nonzero
                    sprite.pause();
                }
            }
        })(this);
    }

    get textureOffset() {
        return this.nextFrame();
    }

    _playing = false;
    // _playOnce = false;

    play(n = null) {
        this._resetAnimation = true;
        this._playing = true;
        this._repeat = n;
    }

    pause() {
        this._playing = false;
        // this._playOnce = false;
        this._repeat = 0;
    }

    nextFrame() {
        return this.frameGen.next().value;
    }

    playOnce() {
        this._resetAnimation = true;
        this._playOnce = true;
        this.play(1);
    }

    get x() {
        return this.position[0];
    }

    set x(val) {
        this.position[0] = val;
    }

    get y() {
        return this.position[1];
    }

    set y(val) {
        this.position[1] = val;
    }
}

Sprite.drawSprites = function (gl, sprites, offset, spritesheet) {
    if (!Sprite.program) Sprite.program = GLUtil.createProgram(gl, spriteVS, spriteFS);
    // console.log(offset);
    const shader = Sprite.program;
    gl.useProgram(shader.program);
    gl.uniform2f(shader.uniform.inverseViewportSize, 1 / 160, 1 / 144);
    gl.uniform2f(shader.uniform.viewOffset, offset.x, offset.y);
    gl.uniform2f(shader.uniform.inverseTextureSize, spritesheet.inverseWidth, spritesheet.inverseHeight);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, spritesheet.texture);

    const buffer = new Float32Array(448); // 64 sprites active at once;
    let i = 0;
    let count = 0;
    for (let sprite of sprites) { //eslint-disable-line
        if (!sprite) continue;
        // console.log(i);
        const textureOffset = sprite.textureOffset;
        buffer[i++] = sprite.position[0];
        buffer[i++] = sprite.position[1];
        buffer[i++] = sprite.size;
        buffer[i++] = textureOffset.x;
        buffer[i++] = textureOffset.y;
        buffer[i++] = textureOffset.flip_h ? 1.0 : 0.0;
        buffer[i++] = textureOffset.flip_v ? 1.0 : 0.0;
        count++;
        // console.log(sprite.flip_h);
    }
    // if (sprites.length > 1) console.log(buffer);

    const glBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(shader.attribute.spritePosition);
    gl.enableVertexAttribArray(shader.attribute.spriteSize);
    gl.enableVertexAttribArray(shader.attribute.texOffset);
    gl.enableVertexAttribArray(shader.attribute.flip);

    gl.vertexAttribPointer(shader.attribute.spritePosition, 2, gl.FLOAT, false, 28, 0);
    gl.vertexAttribPointer(shader.attribute.spriteSize, 1, gl.FLOAT, false, 28, 8);
    gl.vertexAttribPointer(shader.attribute.texOffset, 2, gl.FLOAT, false, 28, 12);
    gl.vertexAttribPointer(shader.attribute.flip, 2, gl.FLOAT, false, 28, 20);

    gl.drawArrays(gl.POINTS, 0, count);

}

// flips left/right each time it plays all the way through
class AlternatingSprite extends Sprite {
    constructor(options) {
        super(options);

        this.frameGen = (function* (sprite) {
            restingFrame:
            while (true) {
                sprite.frames[0].flip_h = !sprite.frames[0].flip_h;
                sprite._resetAnimation = false;
                while (!sprite._playing) {
                    yield sprite.frames[sprite.defaultFrame && sprite.frames.length - 1];
                }

                for (let frame of sprite.frames) { //eslint-disable-line
                    // Advance frames every frameInterval milliseconds
                    const last = Date.now();
                    while (Date.now() - last < 1000 / sprite.framerate) {
                        // Maybe test if a _resetAnimation flag is set and continue
                        yield frame;
                        if (!sprite._playing || sprite._resetAnimation) continue restingFrame;
                    }
                    // if (sprite._resetAnimation) continue restingFrame;
                }
 
                if (sprite._repeat && !--sprite._repeat){ // decrement only if nonzero
                    sprite.pause();
                }
            }
        })(this);
    }
}

export {Sprite, AlternatingSprite};