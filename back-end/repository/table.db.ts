import { Prisma } from "@prisma/client";
import database from "../util/database";
import {PrismaClient, Player as PlayerPrisma, Table as TablePrisma} from "@prisma/client"
import { Player } from "../model/Player";
import { Table } from "../model/Table";
import { Round } from "../model/Round";

import playerDb from "./player.db";
import { table } from "console";

const getAllTables = async (): Promise<Table[]> => {
    try{
        const tablesPrisma = await database.table.findMany({
            include: {round:true, players: true},
        });
        return tablesPrisma.map((tablesPrisma) => Table.from(tablesPrisma));
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

const getTableById = async (id: number): Promise<Table> => {
    try{
        const tablePrisma = await database.table.findUnique({
            where: {id: id}
        });
        return Table.from(tablePrisma)
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

const addTable = async (name:string, round: Round, players: Player[], winner?:number): Promise<Table> => {
    const playerIds = players.map((player) => ({id: player.id}));

    //create a new table
    const table = await database.table.create({
        data: {
            name,
            size: players.length,
            roundId: round.getId(),
            players: {connect: playerIds},
            winnerId:winner
        }
    })

    // add Table To players
    players.forEach(async (player) => (await database.player.update({
        where: {id: player.id},
        data: {
            tables: {
                connect: {id: table.id}
            }
        } 
    })));

    //add Table to Round
    await database.round.update({
        where: {id: round.id},
        data: {
            tables: {
                connect: {id: table.id}
            }
        } 
    });

    return( Table.from(table))
}

const updateWonPlayerId = async (tableId: number, playerId: number): Promise<Table> => {
    return Table.from(await database.table.update({
        where: {id: tableId},
        data: {
            winnerId: playerId
        }
    }));
}

const updateDraw = async(id: number): Promise<Table> => {
    return Table.from(await database.table.update({
        where: {id: id},
        data: {
            winnerId: -1
        }
    }))
}

const updateClear = async(id: number): Promise<Table> => {
    return Table.from(await database.table.update({
        where: {id: id},
        data: {
            winnerId: null
        }
    }))
}

export default {
    getAllTables,
    getTableById,
    addTable,
    updateWonPlayerId,
    updateDraw,
    updateClear,
}