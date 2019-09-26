import Tilemap from '../Tilemap';
export const wildFieldWeak = function() {
    let start = Date.now();
    let resolved = false;

    let animation;

    const p = new Promise(resolve => {
        animation = function() {
            const diff = Date.now() - start;
            if (diff < 1200) {
                this.effectFlags = Tilemap.flash;
                return (3 * diff * Math.PI) / 600;
            } else if (diff < 2400) {
                this.effectFlags = Tilemap.doubleSwipe;
                // console.log(this.effectFlags);
                return ((diff - 1200) * Math.PI) / 600;
            } else if (!resolved) {
                resolve();
                resolved = true;
            } else {
                return 2 * Math.PI;
            }
        };
    });

    animation.promise = p;

    return animation;
};
