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
const Round_1 = require("../model/Round");
const addRound = (round) => __awaiter(void 0, void 0, void 0, function* () {
    const roundPrisma = yield database_1.default.round.create({
        data: {
            id: round.id,
            name: round.name,
            numberOfTables: round.numberOfTables,
            ranked: round.ranked
        },
        include: {
            tables: true
        }
    });
    return roundPrisma ? Round_1.Round.from(roundPrisma) : null;
});
const getAllrounds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rounds = yield database_1.default.round.findMany({ include: { tables: true } });
        return Promise.all(rounds.map((round) => __awaiter(void 0, void 0, void 0, function* () { return yield (Round_1.Round.from(round)); })));
    }
    catch (error) {
        console.error(error);
        throw new Error("database error. panikeer");
    }
});
const getRoundById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaRound = yield database_1.default.round.findUnique({
        where: { id: id },
        include: { tables: true }
    });
    const round = Round_1.Round.from(prismaRound);
    return round;
});
const deleteRound = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const prismaRound = yield database_1.default.round.delete({
        where: {
            id
        },
        include: {
            tables: true
        }
    });
    const round = Round_1.Round.from(prismaRound);
    return round;
});
exports.default = {
    addRound,
    getAllrounds,
    getRoundById,
    deleteRound,
};
