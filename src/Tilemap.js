import tilemapVS from './shaders/tilemap.vert';
import tilemapFS from './shaders/tilemap.frag';

import { vec2 } from './utils/gl-matrix-min';
import GLUtil from './utils/gl-utils';


// https://github.com/toji/webgl-samples/blob/master/js/webgl-tilemap.js#L217
// A lot of the webgl is from here
// Tilemap is rendered by generating an RGBA texture with the coordinates of the sprite in the R and G channels (B and A channels are available, if we want to use more data, or have bigger spritesheets)
// Then that texture is used for the map.
// When the fragment shader goes to color in that texture, instead of using its RGBA channels for color, it uses them to look up the sprites in the spritesheet

class Tilemap extends Function {
    constructor(gl, { width, height, tiles, spritesheet }) {
        super((x, y) => this.tiles[y * this.width + x]);
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.spritesheet = spritesheet; //spritesheet object

        this.gl = gl;
        this.viewportSize = vec2.create();
        this.scaledViewportSize = vec2.create();
        this.inverseTileTextureSize = vec2.create();
        this.inverseSpriteTextureSize = vec2.create();


        this.viewportSize[0] = 160;
        this.viewportSize[1] = 144;

        // this.tileScale = 3.0;
        this.tileScale = 1.0;
        this.tileSize = 16;

        // this.scaledViewportSize[0] = 480 / this.tileScale;
        // this.scaledViewportSize[1] = 432 / this.tileScale;
        this.scaledViewportSize[0] = 160 / this.tileScale;
        this.scaledViewportSize[1] = 144 / this.tileScale;


        this.filtered = false;

        // this.spriteSheet = gl.createTexture();

        
        this.quadVerts = [
            //x  y  u  v
            -1, -1, 0, 1,
            1, -1, 1, 1,
            1, 1, 1, 0,
            
            -1, -1, 0, 1,
            1, 1, 1, 0,
            -1, 1, 0, 0
        ];
        
        this.quadVertBuffer = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadVertBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.quadVerts), gl.STATIC_DRAW);

        this.scrollScaleX = 1;
        this.scrollScaleY = 1;
        this.inverseTextureSize = vec2.create();

        Tilemap.shader = Tilemap.shader || GLUtil.createProgram(gl, tilemapVS, tilemapFS);

        this.ready = this.prerender(this.gl);
    }


    frames = []
    offset = { x: 0, y: 0 } // change to scroll the map

    async prerender(gl) {
        this.frameCount = this.tiles.reduce((a, { frames }) => a * frames / gcd(a, frames), 1);
        console.log(this.frameCount);
        // for each frame we need to render
        await this.spritesheet.loaded;

        // const pixel = 1 / this.spritesheet.size;

        const shift = Math.log2(this.spritesheet.size);
        const mask = this.spritesheet.size - 1;
        console.log(mask);

        const mapSize = this.spritesheet.size * this.spritesheet.size * 4;    // r, g, b, a

        for (let frameIndex = 0; frameIndex < this.frameCount; frameIndex++) {
            const pixels = new Uint8Array(mapSize);
            this.tiles.forEach((tile, index) => {
                // const x = index % this.width;
                // const y = Math.floor(index / this.width);
                // (x, y) of tile in the map
                const offset = frameIndex % tile.frames;
                const tileIndex = tile.id + offset;

                // Bitmagic optimizations since spritesheets are power-of-two
                // console.log(mask);
                pixels[index * 4] = tileIndex & mask; // tileIndex % spritesheet.size
                pixels[index * 4 + 1] = tileIndex >> shift; // tileIndex / this.spritesheet.size
            });
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels, 0);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            console.log(pixels);
            this.inverseTextureSize[0] = 1 / this.width;
            this.inverseTextureSize[1] = 1 / this.height;

            this.frames[frameIndex] = texture;
        }

        this.frameGen = (function* (frames) {
            const frameInterval = 1 / 2 * 1000;
            while (true) {
                for (let frame of frames) {
                    // Advance frames every frameInterval milliseconds
                    const last = Date.now();
                    while (Date.now() - last < frameInterval) {
                        yield frame;
                    }
                }
            }
        })(this.frames);

        console.log('map loaded');
    }

    draw() {
        const { x, y } = this.offset;
        const gl = this.gl;
        const shader = Tilemap.shader;

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(shader.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadVertBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.quadVerts), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(shader.attribute.position);
        gl.enableVertexAttribArray(shader.attribute.texture);
        gl.vertexAttribPointer(shader.attribute.position, 2, gl.FLOAT, false, 16, 0);
        gl.vertexAttribPointer(shader.attribute.texture, 2, gl.FLOAT, false, 16, 8);

        gl.uniform2fv(shader.uniform.viewportSize, this.scaledViewportSize);
        gl.uniform2fv(shader.uniform.inverseSpriteTextureSize, this.spritesheet.inverseSpriteTextureSize);
        gl.uniform1f(shader.uniform.tileSize, this.tileSize);
        gl.uniform1f(shader.uniform.inverseTileSize, 1 / this.tileSize);

        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(shader.uniform.sprites, 0);
        gl.bindTexture(gl.TEXTURE_2D, this.spritesheet.texture);

        gl.activeTexture(gl.TEXTURE1);
        gl.uniform1i(shader.uniform.tiles, 1);

        const frame = this.frameGen.next().value;

        gl.uniform2f(shader.uniform.viewOffset, Math.floor(x), Math.floor(y));
        gl.uniform2fv(shader.uniform.inverseTileTextureSize, this.inverseTextureSize);

        gl.bindTexture(gl.TEXTURE_2D, frame);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

    }
}

// Euclid's algorithm
const gcd = (a, b) => {
    while (a !== b) {
        if (a > b) {
            a -= b;
        } else {
            b -= a;
        }
    }
    return a;
}

export default Tilemap;