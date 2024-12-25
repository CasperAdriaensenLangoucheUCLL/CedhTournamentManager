import playerService from "@/service/playerService";
import { Player } from "@/types";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2"
import { Stack, Typography } from "@mui/material";
import PlayerDisplay from "@/components/player/PlayerDisplay";
import Header from "@/components/Header";
import {Md5} from "ts-md5"

const home: React.FC = () => {
	const [allPlayers, setAllPlayers] = useState<Player[]>([])
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPlayer = async () => {
			const playerResponse = await playerService.getAllPlayers()
			const playerData = await (playerResponse.json()) as Player[]
			setAllPlayers(playerData);
			setLoading(false)
		}
		fetchPlayer()
	},[])

	const MMR = (player:Player) => {
		let oppWr = 0
		let opps = 0

		player.tables.filter(table => table.winnerId != null && table.winnerId != -2).forEach(table => {
			const opponents = allPlayers.filter(opponent => opponent.tables.some(oppTable => oppTable.id == table.id) && opponent.id != player.id);
			console.log(player.firstName, opponents)
			opponents.forEach(opponent => {
				const opponentWinRate = opponent.wins / opponent.tables.filter(table => table.winnerId != null).length
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

	

  	return(
    <>
	<Header/>
	{!loading && allPlayers &&
	<>
		<Stack>
			{allPlayers.sort((a,b) => rankPlayers(a,b)).map(player => (
				<PlayerDisplay player={player} mmr={MMR(player)}/>
			))}
		</Stack>
	</>
	}</>
  	)
}

export default home;