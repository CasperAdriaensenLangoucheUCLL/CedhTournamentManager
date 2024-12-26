"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor(game) {
        this.id = game.id;
        this.name = game.name;
        this.size = game.size;
        this.winnerId = game.winnerId;
    }
    static from({ id, name, winnerId, size, }) {
        return new Table({
            id,
            name,
            winnerId,
            size
        });
    }
}
exports.Table = Table;
