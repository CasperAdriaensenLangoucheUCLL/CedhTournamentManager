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
const round_db_1 = __importDefault(require("../repository/round.db"));
const getAllPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield player_db_1.default.getAllPlayers();
});
const addPlayer = ({ firstName, lastName }) => __awaiter(void 0, void 0, void 0, function* () {
    const newPlayer = yield player_db_1.default.addPlayer({ firstName, lastName });
    if (newPlayer == null)
        throw new Error("player not added");
    return newPlayer;
});
const getPlayersByTableId = (tableId) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield player_db_1.default.getAllPlayers();
    return players.filter(player => player.tables.some(table => table.id == tableId));
});
const getAllPlayerTablesFromRound = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const round = yield round_db_1.default.getRoundById(id);
    const tableIds = round.tables.map(table => table.id);
    const playerGroups = yield Promise.all(tableIds.map(tableId => getPlayersByTableId(tableId)));
    return playerGroups;
});
const getPlayerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield player_db_1.default.getPlayerById(id);
});
const getAllUnDroppedPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield player_db_1.default.getAllUnDroppedPlayers();
});
const dropPlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield player_db_1.default.dropPlayer(id);
});
exports.default = {
    getAllPlayers,
    addPlayer,
    getPlayersByTableId,
    getAllPlayerTablesFromRound,
    getPlayerById,
    getAllUnDroppedPlayers,
    dropPlayer,
};
