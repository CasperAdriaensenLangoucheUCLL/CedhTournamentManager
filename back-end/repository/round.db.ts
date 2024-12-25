import { Prisma } from "@prisma/client";
import database from "../util/database";
import {PrismaClient, Player as PlayerPrisma, Round as RoundPrisma} from "@prisma/client"
import { Player } from "../model/Player";
import { Round } from "../model/Round";
import { table } from "console";

const addRound = async (round: Round): Promise<Round> => {
    const roundPrisma = await database.round.create({
        data: {
            id: round.id,
            name: round.name,
            numberOfTables: round.numberOfTables,
            ranked: round.ranked
        },
        include: {
            tables: true
        }
    })

    return roundPrisma ? Round.from(roundPrisma) : null;
}

const getAllrounds = async (): Promise<Round[]> => {
    try {
        const rounds = await database.round.findMany({include:{tables:true}});
        
        return  Promise.all(rounds.map(async (round) => await (Round.from(round))))
    } catch (error) {
        console.error(error);
        throw new Error("database error. panikeer")
    }
}

const getRoundById = async (id: number): Promise<Round> => {
    const prismaRound = await database.round.findUnique({
        where: {id: id},
        include: {tables: true}
    })
    const round = Round.from(prismaRound);
    return round;
}

const deleteRound = async (id:number):Promise<Round> => {
    const prismaRound = await database.round.delete({
        where: {
            id
        },
        include: {
            tables:true
        }
    })
    const round = Round.from(prismaRound)
    return round
}


export default{
    addRound,
    getAllrounds,
    getRoundById,
    deleteRound,
}