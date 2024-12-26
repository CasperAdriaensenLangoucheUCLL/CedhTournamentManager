"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Table_1 = require("./Table");
class Player {
    constructor(player) {
        this.id = player.id;
        this.firstName = player.firstName;
        this.lastName = player.lastName;
        this.wins = player.wins;
        this.draws = player.draws;
        this.byes = player.byes;
        this.losses = player.losses;
        this.opponentScore = player.opponentScore;
        this.dropped = player.dropped;
        this.tables = player.tables;
    }
    static from({ id, firstName, lastName, wins, draws, losses, byes, opponentScore, dropped, tables }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Player({
                id,
                firstName,
                lastName,
                wins,
                draws,
                losses,
                byes,
                opponentScore,
                dropped,
                tables: tables.map(table => Table_1.Table.from(table))
            });
        });
    }
    getScore() {
        return this.wins * 4 + this.draws;
    }
    getOpponentWinRate() {
        return this.opponentScore / this.tables.length;
    }
}
exports.Player = Player;
