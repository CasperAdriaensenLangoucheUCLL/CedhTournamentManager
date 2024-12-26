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
const round_service_1 = __importDefault(require("../service/round.service"));
const roundRouter = express_1.default.Router();
//make a new round with a specific number of tables
roundRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newround = req.body;
        const response = yield round_service_1.default.createNewRound(newround);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//get all rounds
roundRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield round_service_1.default.getAllrounds();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//get a round by ID
roundRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield round_service_1.default.getRoundById(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
//delete a round by ID
roundRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield round_service_1.default.deleteRound(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
}));
exports.default = roundRouter;
