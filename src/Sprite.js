import spriteVS from './shaders/sprite.vert';
import spriteFS from './shaders/sprite.frag';

import { vec2 } from './utils/gl-matrix-min';
import GLUtil from './utils/gl-utils';

class Sprite {
    constructor(gl, options) {
        this.currentFrame = 0;
        this.sheet = options.spriteSheet;
        this.size = options.size || 16;
        this.frames = options.frames || [{ x: 0, y: 0 }]; // [{x, y}]
        this.framerate = options.framerate || 2;

        // Sprites position in the world
        this.position = vec2.create();
        this.position[0] = options.x || 0;
        this.position[1] = options.y || 0;

        this.gl = gl;
        Sprite.program = Sprite.program || GLUtil.createProgram(gl, spriteVS, spriteFS);

        
        this.frameGen = (function* (frames, framerate, isPlaying) {
            const frameInterval = 1 / framerate * 1000;
            while (true) {
                for (let frame of frames) {
                    // Advance frames every frameInterval milliseconds
                    const last = Date.now();
                    while (Date.now() - last < frameInterval) {
                        if (isPlaying) yield frame;
                        else yield frames[0];
                    }
                }
            }
        })(this.frames, this.framerate, this.isPlaying);
    }
    
    get textureOffset() {
        return this.nextFrame();
    }

    _playing = false;
    isPlaying = () => this._playing;

    play() {
        this._playing = true;
    }

    pause() {
        this._playing = false;
    }
    
    nextFrame () {
        return this.frameGen.next().value;
    }

    advanceFrame() {
        this.currentFrame++;
        if (this.currentFrame > this.frames.length) {

        }
    }
}

Sprite.drawSprites = function (gl, sprites, offset, spritesheet) {
    const shader = Sprite.program;
    gl.useProgram(shader.program);
    gl.uniform2f(shader.uniform.inverseViewportSize, 1 / 160, 1 / 144);
    gl.uniform2f(shader.uniform.viewportOffset, offset.x, offset.y);
    gl.uniform2f(shader.uniform.inverseTextureSize, spritesheet.inverseWidth, spritesheet.inverseHeight);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, spritesheet.texture);

    const buffer = new Float32Array(192); // 64 sprites active at once;
    let i = 0;
    for (let sprite of sprites) {
        const textureOffset = sprite.textureOffset;
        buffer[i++] = sprite.position[0];
        buffer[i++] = sprite.position[1];
        buffer[i++] = sprite.size;
        buffer[i++] = textureOffset.x;
        buffer[i++] = textureOffset.y;
        buffer[i++] = textureOffset.flip_h ? 1.0 : 0.0;
        buffer[i++] = textureOffset.flip_v ? 1.0 : 0.0;
        // console.log(sprite.flip_h);
    }

    const glBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(shader.attribute.spritePosition);
    gl.enableVertexAttribArray(shader.attribute.spriteSize);
    gl.enableVertexAttribArray(shader.attribute.texOffset);
    gl.enableVertexAttribArray(shader.attribute.flip);

    gl.vertexAttribPointer(shader.attribute.spritePosition, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribPointer(shader.attribute.spriteSize, 1, gl.FLOAT, false, 0, 8);
    gl.vertexAttribPointer(shader.attribute.texOffset, 2, gl.FLOAT, false, 0, 12);
    gl.vertexAttribPointer(shader.attribute.flip, 2, gl.FLOAT, false, 0, 20);

    gl.drawArrays(gl.POINTS, 0, 1);

}

export default Sprite;