// attribute vec2 position;
// attribute vec2 texture;


// varying vec2 pixelCoord;
// varying vec2 texCoord;


uniform vec2 viewOffset; //Difference between the top left corner of our screen and top left corner of the coordinate system for sprite positioning
// uniform vec2 viewportSize;

// uniform spriteSize;
attribute vec2 spritePosition;
attribute float spriteSize;
attribute vec2 texOffset;
attribute vec2 flip;


varying vec2 fTexOffset;
varying float fSpriteSize;
varying vec2 vflip;


uniform vec2 inverseViewportSize;

void main() {
    fTexOffset = texOffset;// * (1.0 / spriteSize);
    fSpriteSize = spriteSize;
    vflip = flip;
    vec4 screenTransform = vec4(2.0 * inverseViewportSize.x, -2.0 * inverseViewportSize.y, -1.0, 1.0);
    vec2 sizeAdjust = vec2(0.5 * screenTransform.xy * spriteSize); // Points are specified by their center, sprites position is top-left corner.
    // (16, 0) - (16, 0) * 
    gl_Position = vec4((spritePosition - viewOffset) * screenTransform.xy + screenTransform.zw + sizeAdjust, 0.0, 1.0);
    gl_PointSize = spriteSize; // set this with a buffer
}