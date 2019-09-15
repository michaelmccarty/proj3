// attribute vec2 position;
// attribute vec2 texture;


// varying vec2 pixelCoord;
// varying vec2 texCoord;


// uniform vec2 viewOffset; //Difference between the top left corner of our screen and top left corner of the coordinate system for sprite positioning
// uniform vec2 viewportSize;

// uniform spriteSize;
attribute vec2 spritePosition;
uniform vec2 inverseViewportSize;

void main() {
    vec4 screenTransform = vec4(2.0 * inverseViewportSize.x, -2.0 * inverseViewportSize.y, -1.0, 1.0);
    gl_Position = vec4(spritePosition * screenTransform.xy + screenTransform.zw, 0.0, 1.0);
    gl_PointSize = 16.0; // set this with a buffer
}