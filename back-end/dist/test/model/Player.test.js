"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("../../model/Player");
test("given: valid values for junior, when: junior is created, then: junior is created with those values", () => {
    const player = new Player_1.Player({ firstName: "Casper", lastName: "Adriaensen" });
    expect(player.firstName).toEqual("Casper");
    expect(player.lastName).toEqual("Adriaensen");
    expect(player.wins).toEqual(0);
});
