import { describe, expect, test, beforeEach } from '@jest/globals'
import { Gameboard } from "./gameboard.js"; 

let gameboard;

beforeEach(() => {
    gameboard = new Gameboard();
})

test("create grid with coordinates", () => {
    expect(gameboard.createBoard(2, 2)).toEqual([[null, null], [null, null]]);
});