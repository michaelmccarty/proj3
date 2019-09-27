function slide(x1, y1, x2, y2, timingfunction) {
    return function () {
        const elapsed = Math.floor(timingfunction() * 160) / 160;
        if (elapsed <= 1) {   
            this.x = x1 + elapsed * (x2 - x1);
            this.y = y1 + elapsed * (y2 - y1);
            // console.log(this.position);
        } else {
            delete this.updateAnimationFrame;
        }
    }
}

export default slide;