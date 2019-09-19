precision mediump float;

uniform sampler2D spritesheet;
uniform vec2 inverseTextureSize;

varying vec2 fTexOffset;
varying float fSpriteSize;
varying vec2 vflip;


void main() {
    // if gl_PointCoord.y is masked, gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    // mask is 16 bit number
    // mask >> floor(gl_PointCoord.y * 16) & 1;
    gl_FragColor = texture2D(spritesheet, (abs(vflip - gl_PointCoord) * fSpriteSize + fTexOffset) * inverseTextureSize);
}