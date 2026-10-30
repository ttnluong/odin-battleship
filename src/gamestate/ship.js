export class Ship {
  constructor(length) {
    this.length = length;
    this.hitcount = 0;
  }

  hit() {
    if (this.isSunk()) return;
    this.hitcount++;
  }

  isSunk() {
    return this.length === this.hitcount;
  }
}
