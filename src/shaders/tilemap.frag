precision mediump float;

varying vec2 pixelCoord;
varying vec2 texCoord;

uniform sampler2D tiles;
uniform sampler2D sprites;

uniform vec2 inverseSpriteTextureSize;
uniform float tileSize;
    
void main(void) {
    vec4 tile = texture2D(tiles, texCoord);
    if(tile.x == 1.0 && tile.y == 1.0) { discard; }
    // if(tile.x == 1.0 || tile.y == 1.0) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); }
    vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;
    vec2 spriteCoord = mod(pixelCoord, tileSize);
    gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}