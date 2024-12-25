import { Prisma } from "@prisma/client";
import database from "../util/database";
import {PrismaClient, Player as PlayerPrisma} from "@prisma/client"
import { Player } from "../model/Player";
import { tr } from "date-fns/locale";

const addPlayer = async ({firstName, lastName}): Promise<Player> => {
    const player = await database.player.create({
        data: {
            firstName,
            lastName
        },
        include: {
            tables: true
        }
    })

    return player ? Player.from(player) : null;
}



const getAllPlayers = async (): Promise<Player[]> => {
    try {
        const players = await database.player.findMany({include:{tables:true}});

        return  Promise.all(players.map(async (player) => await (Player.from(player))))
    } catch (error) {
        console.error(error);
        throw new Error("database error. panikeer")
    }
}

const getPlayerById = async (id:number): Promise<Player> => {
    const player = await database.player.findUnique({
        where: {
            id: id
        },
        include:{
            tables: true
        }
    })

    return Player.from(player);
}

const incrementPlayerWinsById = async (id: number): Promise<Player> => {
    return Player.from(await database.player.update({
        where: {id: id},
        data: {
            wins: {
                increment: 1
            }
        },
        include: {
            tables: true
        }
    }))
}

const decrementPlayerWinsById = async (id: number): Promise<Player> => {
    return Player.from(await database.player.update({
        where: {id: id},
        data: {
            wins: {
                decrement: 1
            }
        },
        include: {
            tables: true
        }
    }))
}

const incrementPlayerLossesById = async (id: number): Promise<Player> => {
    return Player.from(await database.player.update({
        where: {id: id},
        data: {
            losses: {
                increment: 1
            }
        },
        include: {
            tables: true
        }
    }))
}

const decrementPlayerLossesById = async (id: number): Promise<Player> => {
    return Player.from(await database.player.update({
        where: {id: id},
        data: {
            losses: {
                decrement: 1
            }
        },
        include: {
            tables: true
        }
    }))
}

const incrementPlayerByesById = async (id: number): Promise<Player> => {
    return Player.from(await database.player.update({
        where: {id: id},
        data: {
            byes: {
                increment: 1
            }
        },
        include: {
            tables: true
        }
    }))
}

const decrementPlayerByesById = async (id: number): Promise<Player> => {
    return Player.from(await database.player.update({
        where: {id: id},
        data: {
            byes: {
                decrement: 1
            }
        },
        include: {
            tables: true
        }
    }))
}

const incrementPlayerDrawsById = async (id: number): Promise<Player> => {
    return Player.from(await database.player.update({
        where: {id: id},
        data: {
            draws: {
                increment: 1
            }
        },
        include: {
            tables: true
        }
    }))
}

const decrementPlayerDrawsById = async (id: number): Promise<Player> => {
    return Player.from(await database.player.update({
        where: {id: id},
        data: {
            draws: {
                decrement: 1
            }
        },
        include: {
            tables: true
        }
    }))
}

const getAllUnDroppedPlayers = async (): Promise<Player[]> => {
    try {
        const players = await database.player.findMany({
            where: {
                dropped: false
            },
            include:{
                tables:true}
        });

        return  Promise.all(players.map(async (player) => await (Player.from(player))))
    } catch (error) {
        console.error(error);
        throw new Error("database error. panikeer")
    }
}

const dropPlayer = async (id:number):Promise<Player> => {
    try {
        const player = await database.player.update({
            where:{
                id
            },
            data: {
                dropped: true
            },
            include:{
                tables:true}
        });

        return await Player.from(player)
    } catch (error) {
        console.error(error);
        throw new Error("database error. panikeer")
    }
}

export default{
    getAllPlayers,
    addPlayer,
    getPlayerById,
    incrementPlayerWinsById,
    decrementPlayerWinsById,
    incrementPlayerDrawsById,
    decrementPlayerDrawsById,
    incrementPlayerLossesById,
    decrementPlayerLossesById,
    incrementPlayerByesById,
    decrementPlayerByesById,
    getAllUnDroppedPlayers,
    dropPlayer,
}