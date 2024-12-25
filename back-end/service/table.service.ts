import { get } from "http";
import { Player } from "../model/Player";
import playerDB from "../repository/player.db"
import tableDb from "../repository/table.db";
import { Table } from "../model/Table";
import database from "../util/database";
import playerService from "./player.service";

const getAllTables = async (): Promise<Table[]> => {
    const tables =  await tableDb.getAllTables();
    return tables;
}

const tableWonByPlayer= async (tableId: number, playerId: number): Promise<Table> => {
    const tablePlayers = await playerService.getPlayersByTableId(tableId)
    if(! tablePlayers.some(player => player.id == playerId)) throw new Error("no players with that id at table with that id")

    const updatedTable = tableDb.updateWonPlayerId(tableId, playerId);
    if(!updatedTable) throw new Error("DATABASE ERROR: updating table winnerId");

    const allPlayers = await playerService.getAllPlayers()
    allPlayers.filter(player => player.tables.some(table => table.id == tableId)).forEach(async player => {
        if(player.id == playerId) await playerDB.incrementPlayerWinsById(player.id);
        else await playerDB.incrementPlayerLossesById(player.id);
    })

    return updatedTable;
}

const tableDraw= async (tableId: number): Promise<Table> => {
    const updatedTable = tableDb.updateDraw(tableId);
    if(!updatedTable) throw new Error("DATABASE ERROR: updating table draw");

    const tablePlayers = await playerService.getPlayersByTableId(tableId)
    tablePlayers.forEach(async (player) => {
        const updatedPlayer = await playerDB.incrementPlayerDrawsById(player.id);
        if(!updatedPlayer) throw new Error("DATABASE ERROR: incrementing player draws");
        return updatedPlayer;
    });

    return updatedTable;
}

const tableClear= async (tableId: number): Promise<Table> => {
    const wonPlayerId = (await tableDb.getTableById(tableId)).winnerId
    switch (wonPlayerId) {
        case null:
            throw new Error("Table has no winner or draw");
        case -1:
            const updatedTableWin = tableDb.updateClear(tableId);
            if(!updatedTableWin) throw new Error("DATABASE ERROR: updating table clear");
        
            const tablePlayers = await playerService.getPlayersByTableId(tableId)
            tablePlayers.forEach(async (player) => {
                const updatedPlayer = await playerDB.decrementPlayerDrawsById(player.id);
                if(!updatedPlayer) throw new Error("DATABASE ERROR: decrementing player draws");
            });
        
            return updatedTableWin;
        default: 
            const updatedTableDraw = tableDb.updateClear(tableId);
            if(!updatedTableDraw) throw new Error("DATABASE ERROR: updating table winnerId");

            const allPlayers = await playerService.getAllPlayers()
            allPlayers.filter(player => player.tables.some(table => table.id == tableId)).forEach(async player => {
                if(player.id == wonPlayerId) await playerDB.decrementPlayerWinsById(player.id);
                else await playerDB.decrementPlayerLossesById(player.id);
            })
        
            return updatedTableDraw;       
    }
}

export default {
    getAllTables,
    tableWonByPlayer,
    tableDraw,
    tableClear,
}