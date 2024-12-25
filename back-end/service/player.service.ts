import { get } from "http";
import { Player } from "../model/Player";
import playerDB from "../repository/player.db"
import roundDb from "../repository/round.db";

const getAllPlayers = async (): Promise<Player[]> => {
    return await playerDB.getAllPlayers();
}

const addPlayer = async ({firstName, lastName}): Promise<Player> => {
    const newPlayer = await playerDB.addPlayer({firstName, lastName});
    if(newPlayer == null) throw new Error("player not added");
    return newPlayer;
}

const getPlayersByTableId = async (tableId: number): Promise<Player[]> => {
    const players = await playerDB.getAllPlayers();
    return players.filter(player => player.tables.some(table => table.id == tableId));
}

const getAllPlayerTablesFromRound = async (id:number): Promise<Player[][]> => {
    const round = await roundDb.getRoundById(id);
    const tableIds = round.tables.map(table => table.id)
    const playerGroups = await Promise.all(tableIds.map(tableId => getPlayersByTableId(tableId)));
    return playerGroups;
}

const getPlayerById = async (id:number): Promise<Player> => {
    return await playerDB.getPlayerById(id);
}

const getAllUnDroppedPlayers = async (): Promise<Player[]> => {
    return await playerDB.getAllUnDroppedPlayers();
}

const dropPlayer = async (id:number): Promise<Player> => {
    return await playerDB.dropPlayer(id);
}

export default {
    getAllPlayers,
    addPlayer,
    getPlayersByTableId,
    getAllPlayerTablesFromRound,
    getPlayerById,
    getAllUnDroppedPlayers,
    dropPlayer,
}