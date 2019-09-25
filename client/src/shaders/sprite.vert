uniform vec2 viewOffset; //Difference between the top left corner of our screen and top left corner of the coordinate system for sprite positioning

attribute vec2 spritePosition;
attribute float spriteSize;
attribute vec2 texOffset;
attribute vec2 flip;
attribute vec2 mask;

varying vec2 fTexOffset;
varying float fSpriteSize;
varying vec2 vflip;
varying vec2 maskOut;

uniform vec2 inverseViewportSize;

void main() {
    maskOut = mask;
    fTexOffset = texOffset;// * (1.0 / spriteSize);
    fSpriteSize = spriteSize;
    vflip = flip;
    vec4 screenTransform = vec4(2.0 * inverseViewportSize.x, -2.0 * inverseViewportSize.y, -1.0, 1.0);
    vec2 sizeAdjust = vec2(0.5 * screenTransform.xy * spriteSize); // Points are specified by their center, sprites position is top-left corner.
    // (16, 0) - (16, 0) * 
    gl_Position = vec4((spritePosition - viewOffset) * screenTransform.xy + screenTransform.zw + sizeAdjust, 0.0, 1.0);
    gl_PointSize = spriteSize; // set this with a buffer
}