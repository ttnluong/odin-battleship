export class Ship {
    constructor(length) {
        this.length = length;
        this.hitcount = 0;
        this.sunk = false;
    }

    hit() {
        const count = this.hitcount;
        count++
        return count;
    }

    isSunk() {
        if (this.length === this.hitcount) {
            this.sunk = true;
        }
    }
}