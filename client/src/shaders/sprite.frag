precision mediump float;

uniform sampler2D spritesheet;
uniform vec2 inverseTextureSize;

varying vec2 fTexOffset;
varying float fSpriteSize;
varying vec2 vflip;
varying vec2 maskOut;
varying float monochrome;


void main() {
    vec2 texPixel = pow(vec2(2), floor(gl_PointCoord * 16.0));
    vec2 computedMask = floor(mod((maskOut / texPixel), 2.0) * 2.0);

    // if gl_PointCoord.y is masked, gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    // mask is 16 bit number
    // mask >> floor(gl_PointCoord.y * 16) & 1;
    gl_FragColor = texture2D(spritesheet, (abs(vflip - gl_PointCoord) * fSpriteSize + fTexOffset) * inverseTextureSize);

    // monochrome effect
    gl_FragColor.rgb = monochrome * floor(gl_FragColor.rgb * 1.8) + (1.0 - monochrome) * gl_FragColor.rgb;
    
    
    gl_FragColor.a = gl_FragColor.a * computedMask.x * computedMask.y;
}