import { get } from "http";
import { Player } from "../model/Player";
import playerDB from "../repository/player.db"
import { Table as TablePrisma} from "@prisma/client";
import { RoundInput } from "../types";
import playerService from "./player.service";
import { Round } from "../model/Round";
import { Table } from "../model/Table";
import roundDb from "../repository/round.db";
import tableDb from "../repository/table.db";
import { Md5 } from "ts-md5";
import { pl } from "date-fns/locale";

const createNewRound = async({behaviour, name, numberOfTables:NT, ranked}: RoundInput): Promise<Round> => {
    const allPlayers = await playerService.getAllPlayers();
    const MMR = (player:Player) => {
		let oppWr = 0
		let opps = 0

		player.tables.filter(table => table.winnerId != null && table.winnerId != -2).forEach(async table => {
			const opponents = allPlayers.filter(opponent => opponent.tables.some(oppTable => oppTable.id == table.id) && opponent.id != player.id);
			opponents.forEach(opponent => {
				let opponentWinRate = opponent.wins / opponent.tables.filter(table => table.winnerId != null).length 
				oppWr += opponentWinRate
				opps += 1
			})
			
		})

		return oppWr/opps || 0
	}

	const rankPlayers = (a:Player, b:Player):number => {
		const consistentlyRandomize = (a:Player) => {
			const fullString = `${a.lastName}${a.id}${a.firstName}${a.tables.length}`
			return (a.firstName, Md5.hashStr(fullString))
		}

		if (a.dropped && !b.dropped) return 1
		if (b.dropped && !a.dropped) return -1

		const aScore = a.wins * 5 + a.byes * 4 + a.draws
		const bScore = b.wins * 5 + b.byes * 4 + b.draws

		if(aScore != bScore) {return bScore-aScore}
        

		if(MMR(a) != MMR(b)) {return MMR(b) - MMR(a)}

		return (consistentlyRandomize(a).localeCompare(consistentlyRandomize(b)))
	}

    let players = (await playerService.getAllUnDroppedPlayers()).sort((a, b) => rankPlayers(a,b));

    if (!ranked) {
        players = players.sort(() => Math.random() - 0.5);
    }

    if (players == null) {
        throw new Error('no players found');
    }
    
    if (behaviour == "by") {

        const numberOfTables = (players.length - (players.length%4))/4
        const round = await roundDb.addRound(new Round({behaviour, name, numberOfTables, ranked}))
        
        const tables:Table[] = []

        let byes:Player[] = []
        if (!NT && numberOfTables*4 < players.length) {
            const numberOfbyes = players.length - numberOfTables*4
            for(let i = 0; i < numberOfbyes;i++){
                const index = players.reverse().findIndex(player => player.byes == 0)
                players.reverse()
                if (index == -1) {
                    byes.push(players[players.length - 1]);
                    players = players.slice(0,-1)
                }
                else {
                    byes.push(players[players.length - 1 - index]);
                    players = players.slice(0,players.length - 1 - index).concat(players.slice(players.length - index,));
                }
                
            }

        }

        for (let mkTable = 0; mkTable < numberOfTables && (NT?mkTable < NT:true); mkTable++) {
            const tablePlayers = players.slice(mkTable*4, mkTable*4+4);
            const table = await tableDb.addTable(`table ${mkTable + 1}`, round, tablePlayers)

            tables.push(table);
        }


        if (byes) {
            const byeTable = await tableDb.addTable("Byes", round, byes, -2)
            byes.forEach(bye => playerDB.incrementPlayerByesById(bye.id))
        }

        

        return getRoundById(round.id);
    }

    if (behaviour == "fill") {
        let fourPlayerPeople = players
        let threePlayerPeople: Player[] = []

        const remainder = players.length % 4
        let threePlayerTables = remainder?4-remainder:0
        const numberOfTables = (players.length - remainder)/4 + (remainder?1:0)
        let fourPlayerTables = numberOfTables - threePlayerTables

        threePlayerTables = Math.max(Math.min(threePlayerTables, NT? NT - fourPlayerTables: threePlayerTables), 0)
        for (let i = 0;i<threePlayerTables;i++){
            for(let i = 0; i < 3;i++){
                const index = fourPlayerPeople.reverse().findIndex(player => !player.tables.some(table => table.size == 3))
                fourPlayerPeople.reverse()
                if (index == -1) {
                    threePlayerPeople.push(fourPlayerPeople[fourPlayerPeople.length - 1]);
                    fourPlayerPeople = fourPlayerPeople.slice()
                }
                else {
                    threePlayerPeople.push(fourPlayerPeople[fourPlayerPeople.length - 1 - index]);
                    fourPlayerPeople = fourPlayerPeople.slice(0,fourPlayerPeople.length - 1 - index).concat(fourPlayerPeople.slice(fourPlayerPeople.length - index,));
                }
                
            }
        }
        
        const round = await roundDb.addRound(new Round({behaviour, name, numberOfTables, ranked}))

        for (let mkTable = 0; mkTable < fourPlayerTables && (NT?mkTable < NT:true); mkTable++) {
            const tablePlayers = fourPlayerPeople.slice(mkTable*4, mkTable*4+4);
            const table = await tableDb.addTable(`table ${mkTable + 1}` ,round, tablePlayers)
        }

        for (let mkTable = 0; mkTable < threePlayerTables && (NT? fourPlayerTables + mkTable < NT:true); mkTable++) {
            const tablePlayers = threePlayerPeople.slice(mkTable*3, mkTable*3+3);
            const table = await tableDb.addTable(`table ${mkTable+fourPlayerTables + 1}`, round, tablePlayers)
        }
    
        return getRoundById(round.id);
    }
}

const getAllrounds = async (): Promise<Round[]> => {
    return await roundDb.getAllrounds();
} 

const getRoundById = async (id:number): Promise<Round> => {
    return await roundDb.getRoundById(id)
}

const deleteRound = async (id:number):Promise<Round> => {
    const roundToDelete = await getRoundById(id)
    const allPlayers = await playerService.getAllPlayers()
    roundToDelete.tables.forEach(table => {
        if(table.winnerId == -2){
            allPlayers.filter(player => player.tables.some(tbl => tbl.id == table.id)).forEach(player => playerDB.decrementPlayerByesById(player.id))
        }
    })
    return await roundDb.deleteRound(id);
}

export default {
    createNewRound,
    getAllrounds,
    getRoundById,
    deleteRound,
}