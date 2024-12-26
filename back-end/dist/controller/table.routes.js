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
const table_service_1 = __importDefault(require("../service/table.service"));
const tableRouter = express_1.default.Router();
//get all tables
tableRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield table_service_1.default.getAllTables();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//put a player won the game, and add relevant score
tableRouter.put("/:tableId/wonBy/:playerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableId = parseInt(req.params.tableId);
        const playerId = parseInt(req.params.playerId);
        const response = yield table_service_1.default.tableWonByPlayer(tableId, playerId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//put the table was a draw, and update relevant scores
tableRouter.put("/:tableId/draw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableId = parseInt(req.params.tableId);
        const response = yield table_service_1.default.tableDraw(tableId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//set a table back to no winner, and update player scores accordingly
tableRouter.put("/:tableId/clear", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableId = parseInt(req.params.tableId);
        const response = yield table_service_1.default.tableClear(tableId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
exports.default = tableRouter;
