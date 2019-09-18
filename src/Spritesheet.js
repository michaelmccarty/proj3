import { vec2 } from './utils/gl-matrix-min';

class Spritesheet {
    constructor(gl, src) {
        this.size = 1;

        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        const level = 0;
        const internalFormat = gl.RGBA;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        this.inverseSpriteTextureSize = vec2.create();

        const image = new Image();
        this.loaded = new Promise(resolve => {
            image.onload = () => {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

                this.size = image.height / 16;
                this.inverseSpriteTextureSize[0] = 1 / image.width;
                this.inverseSpriteTextureSize[1] = 1 / image.height;

                console.log(this.size);
                resolve();
            };
        });
        image.src = src;
    }
}

export default Spritesheet;