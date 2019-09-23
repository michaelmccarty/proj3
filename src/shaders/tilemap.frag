precision mediump float;

varying vec2 pixelCoord;
varying vec2 texCoord;

uniform sampler2D tiles;
uniform sampler2D sprites;

uniform vec4 effectFlags;
uniform float effectAnimationFrame;

uniform vec2 inverseSpriteTextureSize;
uniform float tileSize;

const float PI = 3.1415926535897932384626433832795;
const float PIx2 = PI * 2.0;
const float angleAdjustment = 0.00390625;
const vec4 screenCenterOffset = vec4(9.5, 8.5, 0.0, 0.0);
    
void main(void) {
    vec4 flashMod = vec4(0.0);
    vec4 spinMod = vec4(0.0);
    if(effectAnimationFrame > 0.0) {
        vec4 block = floor(gl_FragCoord * 0.125) - screenCenterOffset;
        // if(effectFlags.x) { // dungeon
        // if (effectFlags.y) { // trainer
        // if (effectFlags.z) { // strong

        float flash = floor(cos(effectAnimationFrame)* effectFlags.w * 3.0) / 3.0;
        flashMod = vec4(vec3(flash), 0.0);

        // radial swipe
        float angle =  mod(atan(block.y, block.x) , PI * (1.0 + effectFlags.z)) - angleAdjustment;
        spinMod = (1.0 - effectFlags.x) * (1.0 - effectFlags.y) * (1.0 - effectFlags.w) * vec4(-1.0 * vec3(effectAnimationFrame - angle > 0.0), 0.0);
    }

    vec4 tile = texture2D(tiles, texCoord);
    if(tile.x == 1.0 && tile.y == 1.0) { discard; }
    // if(tile.x == 1.0 || tile.y == 1.0) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); }
    vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;
    vec2 spriteCoord = mod(pixelCoord, tileSize);
    gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize) + spinMod + flashMod;
    gl_FragColor.a = 1.0;
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}