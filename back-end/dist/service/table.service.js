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
const player_db_1 = __importDefault(require("../repository/player.db"));
const table_db_1 = __importDefault(require("../repository/table.db"));
const player_service_1 = __importDefault(require("./player.service"));
const getAllTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const tables = yield table_db_1.default.getAllTables();
    return tables;
});
const tableWonByPlayer = (tableId, playerId) => __awaiter(void 0, void 0, void 0, function* () {
    const tablePlayers = yield player_service_1.default.getPlayersByTableId(tableId);
    if (!tablePlayers.some(player => player.id == playerId))
        throw new Error("no players with that id at table with that id");
    const updatedTable = table_db_1.default.updateWonPlayerId(tableId, playerId);
    if (!updatedTable)
        throw new Error("DATABASE ERROR: updating table winnerId");
    const allPlayers = yield player_service_1.default.getAllPlayers();
    allPlayers.filter(player => player.tables.some(table => table.id == tableId)).forEach((player) => __awaiter(void 0, void 0, void 0, function* () {
        if (player.id == playerId)
            yield player_db_1.default.incrementPlayerWinsById(player.id);
        else
            yield player_db_1.default.incrementPlayerLossesById(player.id);
    }));
    return updatedTable;
});
const tableDraw = (tableId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTable = table_db_1.default.updateDraw(tableId);
    if (!updatedTable)
        throw new Error("DATABASE ERROR: updating table draw");
    const tablePlayers = yield player_service_1.default.getPlayersByTableId(tableId);
    tablePlayers.forEach((player) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPlayer = yield player_db_1.default.incrementPlayerDrawsById(player.id);
        if (!updatedPlayer)
            throw new Error("DATABASE ERROR: incrementing player draws");
        return updatedPlayer;
    }));
    return updatedTable;
});
const tableClear = (tableId) => __awaiter(void 0, void 0, void 0, function* () {
    const wonPlayerId = (yield table_db_1.default.getTableById(tableId)).winnerId;
    switch (wonPlayerId) {
        case null:
            throw new Error("Table has no winner or draw");
        case -1:
            const updatedTableWin = table_db_1.default.updateClear(tableId);
            if (!updatedTableWin)
                throw new Error("DATABASE ERROR: updating table clear");
            const tablePlayers = yield player_service_1.default.getPlayersByTableId(tableId);
            tablePlayers.forEach((player) => __awaiter(void 0, void 0, void 0, function* () {
                const updatedPlayer = yield player_db_1.default.decrementPlayerDrawsById(player.id);
                if (!updatedPlayer)
                    throw new Error("DATABASE ERROR: decrementing player draws");
            }));
            return updatedTableWin;
        default:
            const updatedTableDraw = table_db_1.default.updateClear(tableId);
            if (!updatedTableDraw)
                throw new Error("DATABASE ERROR: updating table winnerId");
            const allPlayers = yield player_service_1.default.getAllPlayers();
            allPlayers.filter(player => player.tables.some(table => table.id == tableId)).forEach((player) => __awaiter(void 0, void 0, void 0, function* () {
                if (player.id == wonPlayerId)
                    yield player_db_1.default.decrementPlayerWinsById(player.id);
                else
                    yield player_db_1.default.decrementPlayerLossesById(player.id);
            }));
            return updatedTableDraw;
    }
});
exports.default = {
    getAllTables,
    tableWonByPlayer,
    tableDraw,
    tableClear,
};
