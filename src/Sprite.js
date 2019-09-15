import spriteVS from './shaders/sprite.vert';
import spriteFS from './shaders/sprite.frag';

import { vec2 } from './utils/gl-matrix-min';
import GLUtil from './utils/gl-utils';

class Sprite {
    constructor(gl, options) {
        this.currentFrame = 0;
        this.sheet = options.spriteSheet;
        this.size = options.size || 16;
        this.frames = options.frames || [{x: 0, y: 0}]; // [{x, y}]

        // Sprites position in the world
        this.position = vec2.create();
        this.position[0] = options.x || 0;
        this.position[1] = options.y || 0;

        this.gl = gl;
        console.log(spriteVS, spriteFS);
        Sprite.program = Sprite.program || GLUtil.createProgram(gl, spriteVS, spriteFS);
    }

    // draw() {
        
    //     gl.uniform2f(shader.uniform.position, this.position);
        
    // }
}

// All sprites drawn in each batch need the same spritesheet
Sprite.drawSprites = function(gl, sprites) {
    const shader = Sprite.program;
    gl.useProgram(shader.program);
    gl.uniform2f(shader.uniform.inverseViewportSize, 1/160, 1/144);

    const buffer = new Float32Array(512); // 256 sprites active at once;
    let i = 0;
    for (let sprite of sprites) {
        buffer[i++] = sprite.position[0];
        buffer[i++] = sprite.position[1];
    }

    const glBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(shader.attribute.spritePosition);
    gl.vertexAttribPointer(shader.attribute.spritePosition, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.POINTS, 0, 1);

}

export default Sprite;