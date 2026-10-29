import { describe, expect, test, beforeEach } from '@jest/globals'
import { Gameboard } from "./gameboard.js"; 

let gameboard;

beforeEach(() => {
    gameboard = new Gameboard();
})

describe("grid", () => {
    test("check square in grid with coordinates", () => {
        expect(gameboard.getSquare([0, 9])).toEqual(null);
    });

    test("check square outside of grid", () => {
        expect(gameboard.getSquare([10, 0])).toEqual(undefined);
    });
})