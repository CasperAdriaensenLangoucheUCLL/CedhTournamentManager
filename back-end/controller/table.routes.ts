import express, {Request, Response} from "express";
import playerService from "../service/player.service";
import { PlayerInput, RoundInput } from "../types";
import tableService from "../service/table.service";

const tableRouter = express.Router();

//get all tables
tableRouter.get("/", async (req: Request & {auth: any}, res: Response) => {
    try {
        const response = await tableService.getAllTables();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//put a player won the game, and add relevant score
tableRouter.put("/:tableId/wonBy/:playerId", async (req: Request & {auth: any}, res: Response) => {
    try {
        const tableId = parseInt(req.params.tableId)
        const playerId = parseInt(req.params.playerId)
        const response = await tableService.tableWonByPlayer(tableId, playerId);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//put the table was a draw, and update relevant scores
tableRouter.put("/:tableId/draw", async (req: Request & {auth: any}, res: Response) => {
    try {
        const tableId = parseInt(req.params.tableId)
        const response = await tableService.tableDraw(tableId);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//set a table back to no winner, and update player scores accordingly
tableRouter.put("/:tableId/clear", async (req: Request & {auth: any}, res: Response) => {
    try {
        const tableId = parseInt(req.params.tableId)
        const response = await tableService.tableClear(tableId);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

export default tableRouter;