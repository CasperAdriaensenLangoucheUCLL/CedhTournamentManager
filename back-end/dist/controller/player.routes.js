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
const express_1 = __importDefault(require("express"));
const player_service_1 = __importDefault(require("../service/player.service"));
const playerRouter = express_1.default.Router();
//add a player
playerRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPlayer = req.body;
        const response = yield player_service_1.default.addPlayer({ firstName: newPlayer.firstName, lastName: newPlayer.lastName });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//get all players
playerRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield player_service_1.default.getAllPlayers();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//get all players from a table
playerRouter.get("/tableId/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableId = parseInt(req.params.id);
        const response = yield player_service_1.default.getPlayersByTableId(tableId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//get all player groups from a round
playerRouter.get("/roundId/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roundId = parseInt(req.params.id);
        const response = yield player_service_1.default.getAllPlayerTablesFromRound(roundId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//get a player by id
playerRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield player_service_1.default.getPlayerById(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//get all undropped players
playerRouter.get("/unDropped/true", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield player_service_1.default.getAllUnDroppedPlayers();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//Drop a player
playerRouter.put("/drop/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield player_service_1.default.dropPlayer(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//get a players winrate by id
exports.default = playerRouter;
