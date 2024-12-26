"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const Table_1 = require("./Table");
class Round {
    constructor(round) {
        this.id = round.id;
        this.behaviour = round.behaviour;
        this.createdAt = round.createdAt;
        this.name = round.name;
        this.numberOfTables = round.numberOfTables;
        this.ranked = round.ranked;
        this.tables = round.tables;
    }
    static from({ id, behaviour, createdAt, name, numberOfTables, ranked, tables }) {
        return new Round({
            id,
            behaviour,
            createdAt,
            name,
            numberOfTables,
            ranked,
            tables: tables.map(table => Table_1.Table.from(table))
        });
    }
    getId() {
        return this.id;
    }
}
exports.Round = Round;
