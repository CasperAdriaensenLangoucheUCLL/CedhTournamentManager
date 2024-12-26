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
const player_service_1 = __importDefault(require("./player.service"));
const Round_1 = require("../model/Round");
const round_db_1 = __importDefault(require("../repository/round.db"));
const table_db_1 = __importDefault(require("../repository/table.db"));
const ts_md5_1 = require("ts-md5");
const createNewRound = ({ behaviour, name, numberOfTables: NT, ranked }) => __awaiter(void 0, void 0, void 0, function* () {
    const allPlayers = yield player_service_1.default.getAllPlayers();
    const MMR = (player) => {
        let oppWr = 0;
        let opps = 0;
        player.tables.filter(table => table.winnerId != null && table.winnerId != -2).forEach((table) => __awaiter(void 0, void 0, void 0, function* () {
            const opponents = allPlayers.filter(opponent => opponent.tables.some(oppTable => oppTable.id == table.id) && opponent.id != player.id);
            opponents.forEach(opponent => {
                let opponentWinRate = opponent.wins / opponent.tables.filter(table => table.winnerId != null).length;
                oppWr += opponentWinRate;
                opps += 1;
            });
        }));
        return oppWr / opps || 0;
    };
    const rankPlayers = (a, b) => {
        const consistentlyRandomize = (a) => {
            const fullString = `${a.lastName}${a.id}${a.firstName}${a.tables.length}`;
            return (a.firstName, ts_md5_1.Md5.hashStr(fullString));
        };
        if (a.dropped && !b.dropped)
            return 1;
        if (b.dropped && !a.dropped)
            return -1;
        const aScore = a.wins * 5 + a.byes * 4 + a.draws;
        const bScore = b.wins * 5 + b.byes * 4 + b.draws;
        if (aScore != bScore) {
            return bScore - aScore;
        }
        if (MMR(a) != MMR(b)) {
            return MMR(b) - MMR(a);
        }
        return (consistentlyRandomize(a).localeCompare(consistentlyRandomize(b)));
    };
    let players = (yield player_service_1.default.getAllUnDroppedPlayers()).sort((a, b) => rankPlayers(a, b));
    if (!ranked) {
        players = players.sort(() => Math.random() - 0.5);
    }
    if (players == null) {
        throw new Error('no players found');
    }
    if (behaviour == "by") {
        const numberOfTables = (players.length - (players.length % 4)) / 4;
        const round = yield round_db_1.default.addRound(new Round_1.Round({ behaviour, name, numberOfTables, ranked }));
        const tables = [];
        let byes = [];
        if (!NT && numberOfTables * 4 < players.length) {
            const numberOfbyes = players.length - numberOfTables * 4;
            for (let i = 0; i < numberOfbyes; i++) {
                const index = players.reverse().findIndex(player => player.byes == 0);
                players.reverse();
                if (index == -1) {
                    byes.push(players[players.length - 1]);
                    players = players.slice(0, -1);
                }
                else {
                    byes.push(players[players.length - 1 - index]);
                    players = players.slice(0, players.length - 1 - index).concat(players.slice(players.length - index));
                }
            }
        }
        for (let mkTable = 0; mkTable < numberOfTables && (NT ? mkTable < NT : true); mkTable++) {
            const tablePlayers = players.slice(mkTable * 4, mkTable * 4 + 4);
            const table = yield table_db_1.default.addTable(`table ${mkTable + 1}`, round, tablePlayers);
            tables.push(table);
        }
        if (byes) {
            const byeTable = yield table_db_1.default.addTable("Byes", round, byes, -2);
            byes.forEach(bye => player_db_1.default.incrementPlayerByesById(bye.id));
        }
        return getRoundById(round.id);
    }
    if (behaviour == "fill") {
        let fourPlayerPeople = players;
        let threePlayerPeople = [];
        const remainder = players.length % 4;
        let threePlayerTables = remainder ? 4 - remainder : 0;
        const numberOfTables = (players.length - remainder) / 4 + (remainder ? 1 : 0);
        let fourPlayerTables = numberOfTables - threePlayerTables;
        threePlayerTables = Math.max(Math.min(threePlayerTables, NT ? NT - fourPlayerTables : threePlayerTables), 0);
        for (let i = 0; i < threePlayerTables; i++) {
            for (let i = 0; i < 3; i++) {
                const index = fourPlayerPeople.reverse().findIndex(player => !player.tables.some(table => table.size == 3));
                fourPlayerPeople.reverse();
                if (index == -1) {
                    threePlayerPeople.push(fourPlayerPeople[fourPlayerPeople.length - 1]);
                    fourPlayerPeople = fourPlayerPeople.slice();
                }
                else {
                    threePlayerPeople.push(fourPlayerPeople[fourPlayerPeople.length - 1 - index]);
                    fourPlayerPeople = fourPlayerPeople.slice(0, fourPlayerPeople.length - 1 - index).concat(fourPlayerPeople.slice(fourPlayerPeople.length - index));
                }
            }
        }
        const round = yield round_db_1.default.addRound(new Round_1.Round({ behaviour, name, numberOfTables, ranked }));
        for (let mkTable = 0; mkTable < fourPlayerTables && (NT ? mkTable < NT : true); mkTable++) {
            const tablePlayers = fourPlayerPeople.slice(mkTable * 4, mkTable * 4 + 4);
            const table = yield table_db_1.default.addTable(`table ${mkTable + 1}`, round, tablePlayers);
        }
        for (let mkTable = 0; mkTable < threePlayerTables && (NT ? fourPlayerTables + mkTable < NT : true); mkTable++) {
            const tablePlayers = threePlayerPeople.slice(mkTable * 3, mkTable * 3 + 3);
            const table = yield table_db_1.default.addTable(`table ${mkTable + fourPlayerTables + 1}`, round, tablePlayers);
        }
        return getRoundById(round.id);
    }
});
const getAllrounds = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield round_db_1.default.getAllrounds();
});
const getRoundById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield round_db_1.default.getRoundById(id);
});
const deleteRound = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const roundToDelete = yield getRoundById(id);
    const allPlayers = yield player_service_1.default.getAllPlayers();
    roundToDelete.tables.forEach(table => {
        if (table.winnerId == -2) {
            allPlayers.filter(player => player.tables.some(tbl => tbl.id == table.id)).forEach(player => player_db_1.default.decrementPlayerByesById(player.id));
        }
    });
    return yield round_db_1.default.deleteRound(id);
});
exports.default = {
    createNewRound,
    getAllrounds,
    getRoundById,
    deleteRound,
};
