import express, {Request, Response} from "express";
import playerService from "../service/player.service";
import { PlayerInput, RoundInput } from "../types";

const playerRouter = express.Router();

//add a player
playerRouter.post("/", async (req: Request & {auth: any}, res: Response) => {
    try {
        const newPlayer = <PlayerInput>req.body;

        const response = await playerService.addPlayer({firstName: newPlayer.firstName, lastName: newPlayer.lastName});

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//get all players
playerRouter.get("/", async (req: Request & {auth: any}, res: Response) => {
    try {
        const response = await playerService.getAllPlayers();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//get all players from a table
playerRouter.get("/tableId/:id", async (req: Request & {auth: any}, res: Response) => {
    try {
        const tableId = parseInt(req.params.id)
        const response = await playerService.getPlayersByTableId(tableId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//get all player groups from a round
playerRouter.get("/roundId/:id", async (req: Request & {auth: any}, res: Response) => {
    try {
        const roundId = parseInt(req.params.id)
        const response = await playerService.getAllPlayerTablesFromRound(roundId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//get a player by id
playerRouter.get("/:id", async (req: Request & {auth: any}, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const response = await playerService.getPlayerById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//get all undropped players
playerRouter.get("/unDropped/true", async (req: Request & {auth: any}, res: Response) => {
    try {
        const response = await playerService.getAllUnDroppedPlayers();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//Drop a player
playerRouter.put("/drop/:id", async (req: Request & {auth: any}, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const response = await playerService.dropPlayer(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});


//get a players winrate by id

export default playerRouter;