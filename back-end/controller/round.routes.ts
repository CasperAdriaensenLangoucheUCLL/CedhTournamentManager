import express, {Request, Response} from "express";
import { RoundInput } from "../types";
import roundService from "../service/round.service";

const roundRouter = express.Router()

//make a new round with a specific number of tables
roundRouter.post("/", async (req: Request & {auth: any}, res: Response) => {
    try {
        const newround = <RoundInput>req.body;

        const response = await roundService.createNewRound(newround);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//get all rounds
roundRouter.get("/", async (req: Request & {auth: any}, res: Response) => {
    try {
        const response = await roundService.getAllrounds();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//get a round by ID
roundRouter.get("/:id", async (req: Request & {auth: any}, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const response = await roundService.getRoundById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

//delete a round by ID
roundRouter.delete("/:id", async (req: Request & {auth: any}, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const response = await roundService.deleteRound(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message });
    }
});

export default roundRouter;