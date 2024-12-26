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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../util/database"));
const Table_1 = require("../model/Table");
const getAllTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tablesPrisma = yield database_1.default.table.findMany({
            include: { round: true, players: true },
        });
        return tablesPrisma.map((tablesPrisma) => Table_1.Table.from(tablesPrisma));
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
});
const getTableById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tablePrisma = yield database_1.default.table.findUnique({
            where: { id: id }
        });
        return Table_1.Table.from(tablePrisma);
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
});
const addTable = (name, round, players, winner) => __awaiter(void 0, void 0, void 0, function* () {
    const playerIds = players.map((player) => ({ id: player.id }));
    //create a new table
    const table = yield database_1.default.table.create({
        data: {
            name,
            size: players.length,
            roundId: round.getId(),
            players: { connect: playerIds },
            winnerId: winner
        }
    });
    // add Table To players
    players.forEach((player) => __awaiter(void 0, void 0, void 0, function* () {
        return (yield database_1.default.player.update({
            where: { id: player.id },
            data: {
                tables: {
                    connect: { id: table.id }
                }
            }
        }));
    }));
    //add Table to Round
    yield database_1.default.round.update({
        where: { id: round.id },
        data: {
            tables: {
                connect: { id: table.id }
            }
        }
    });
    return (Table_1.Table.from(table));
});
const updateWonPlayerId = (tableId, playerId) => __awaiter(void 0, void 0, void 0, function* () {
    return Table_1.Table.from(yield database_1.default.table.update({
        where: { id: tableId },
        data: {
            winnerId: playerId
        }
    }));
});
const updateDraw = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Table_1.Table.from(yield database_1.default.table.update({
        where: { id: id },
        data: {
            winnerId: -1
        }
    }));
});
const updateClear = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Table_1.Table.from(yield database_1.default.table.update({
        where: { id: id },
        data: {
            winnerId: null
        }
    }));
});
exports.default = {
    getAllTables,
    getTableById,
    addTable,
    updateWonPlayerId,
    updateDraw,
    updateClear,
};
