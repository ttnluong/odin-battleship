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


describe("place ship", () => {
    test("place a ship horizontally", () => {
        const horShip = gameboard.placeShip([1, 1], 2, 'horizontal');
        expect(gameboard.getSquare([1, 1])).toBe(horShip);
        expect(gameboard.getSquare([1, 2])).toBe(horShip);
        expect(gameboard.getSquare([0, 1])).toBe(null);
        expect(gameboard.getSquare([1, 3])).toBe(null);
        expect(gameboard.getSquare([2, 1])).toBe(null);
        expect(gameboard.getSquare([1, 0])).toBe(null);
    });

    test("place a ship vertically", () => {
        const verShip = gameboard.placeShip([3, 3], 2, 'vertical');
        expect(gameboard.getSquare([3, 3])).toBe(verShip);
        expect(gameboard.getSquare([4, 3])).toBe(verShip);
        expect(gameboard.getSquare([2, 3])).toBe(null);
        expect(gameboard.getSquare([5, 3])).toBe(null);
        expect(gameboard.getSquare([3, 2])).toBe(null);
        expect(gameboard.getSquare([3, 4])).toBe(null);
    });
})