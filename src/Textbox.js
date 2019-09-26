class Textbox {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.cursor = 0;
        this.width = Math.floor((x2 - x1) / 8);
        this.height = Math.floor((y2 - y1) / 8);
        console.log(this.width, this.height);
    }

    get bounds() {
        return [this.x1, this.y1, this.x2, this.y2];
    }

    clear(ctx) {
        this.stopText();
        console.log(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
        ctx.clearRect(
            this.x1 - 1,
            this.y1 - 1,
            this.x2 - this.x1 + 1,
            this.y2 - this.y1 + 16
        );
        this.cursor = 0;
    }

    stopText() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }
    }

    cursorCoords() {
        const x = this.x1 + (this.cursor % this.width) * 8;
        const y = this.y1 + Math.floor(this.cursor / this.width) * 16 + 7;
        return [x, y];
    }

    printChar(ctx, char) {
        ctx.font = '8px Pokemon';
        ctx.fillText(char, ...this.cursorCoords());
        this.cursor++;
    }

    printString(ctx, string, speed = 50, i = 0, nested = false) {
        let promise;
        if (!nested) {
            promise = new Promise(resolve => this._resolve = resolve);
        }
        if (string[i]) {
            this.printChar(ctx, string[i]);
            if (string[i] === ' ') {
                let j = 1;
                while (string[j + i] && string[j + i] !== ' ') {
                    // console.log(j);
                    j++;
                }
                if (j + (this.cursor % this.width) > this.width) {
                    this.cursor =
                        Math.floor(this.cursor / this.width + 1) * this.width;
                }
            }

            // instant text if speed is 0;
            if (speed) {
                setTimeout(
                    () => this.printString(ctx, string, speed, i + 1, true),
                    speed
                );
            } else {
                this.printString(ctx, string, speed, i + 1, true);
            }
        } else {
            this._resolve();
        }
        return promise;
    }
}

export default Textbox;
