precision mediump float;

uniform sampler2D spritesheet;
uniform vec2 inverseTextureSize;

varying vec2 fTexOffset;
varying float fSpriteSize;
varying vec2 vflip;


void main() {
    // vec2 offset = vec2()
    // gl_FragColor = texture2D(spritesheet, gl_PointCoord + fTexOffset); 
    
    gl_FragColor = texture2D(spritesheet, (abs(vflip - gl_PointCoord) * fSpriteSize + fTexOffset) * inverseTextureSize);
    // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}