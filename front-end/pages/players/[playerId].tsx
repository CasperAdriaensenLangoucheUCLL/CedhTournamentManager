import RoundService from "@/service/roundService";
import { Player, Round, Table } from "@/types"
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Grid from "@mui/material/Grid2"
import TableDisplay from "@/components/table/TableDisplay";
import { Box, Container, Paper, Typography } from "@mui/material";
import Header from "@/components/Header";
import playerService from "@/service/playerService";

const roundDisplay: React.FC = () => {
    const [player, setPlayer] = useState<Player>()
    const [allPlayers, setAllPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { playerId } = router.query;

    useEffect(() => {
        const fetchPlayer = async () => {
            if (!playerId) return;

            try {
                setLoading(true);
                const response = await playerService.getPlayerById(parseInt(playerId as string));

                if (!response.ok) {
                    return;
                }

                const playerData = (await response.json()) as Player;
                setPlayer(playerData);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchPlayer();
    }, [playerId]);

    useEffect(() => {
        const fetchRound = async () => {
            try {
                setLoading(true);
                const response = await playerService.getAllPlayers();

                if (!response.ok) {
                    return;
                }

                const playersResopnse = (await response.json()) as Player[];
                setAllPlayers(playersResopnse);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchRound();
    }, []);


    const [allRounds, setAllRounds] = useState<Round[]>([]);
    useEffect(() => {
        const fetchRounds = async () => {
            try {
                setLoading(true);
                const response = await RoundService.getAllRounds();

                if (!response.ok) {
                    return;
                }

                const roundData = (await response.json()) as Round[];
                setAllRounds(roundData);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchRounds();
    }, []);

    const sortDates = (a:Round, b:Round) => {
        if(!a || !b) return 0;
        const parseTime = (date: string) => {
            let dateParts = date.split(/[-T:.Z]/);
            dateParts.pop();
            dateParts.pop();
            dateParts[1] = String(parseInt(dateParts[1]) - 1);
            const intDateParts = dateParts.map((part) => parseInt(part));
            return new Date(
                intDateParts[0],
                intDateParts[1],
                intDateParts[2],
                intDateParts[3],
                intDateParts[4],
                intDateParts[5]
            );
        };

		if (parseTime(a.createdAt) > parseTime(b.createdAt)) return 1;
        if (parseTime(a.createdAt) < parseTime(b.createdAt)) return -1;
        return 0;
	}

    const findRound = (table:Table):Round => {
        if (!table) return null as unknown as Round
        return allRounds.find(round => round.tables.some(tbl => tbl.id == table.id)) || null as unknown as Round
    }

    return (
        <>
        <Header/>
        {(loading || !player || !allRounds)? 
        <>
         <Container component="main" sx={{width:800, padding:3}}>
            <Paper>
                <Typography>loading</Typography>
            </Paper>
         </Container>
        </>:
        <>
        <Grid container spacing={2} padding={2}>
            <Grid size={12}>
                <Typography variant="h3">{player.firstName} {player.lastName}</Typography>
            </Grid>
            {player?.tables.sort((a,b) => (a&&b)?sortDates(findRound(a),findRound(b)):0).map((table) => (
                <Grid size={6}>
                    <Box onClick={() => router.push(`/rounds/${findRound(table).id}`)} sx={{ cursor: 'pointer'}}>
                        <TableDisplay round={findRound(table)} table={table} players={allPlayers.filter(plr => plr.tables.some(tbl => tbl.id == table.id))}/>
                    </Box>
                    
                </Grid>
            ))}
        </Grid>
        </>}
        </>
    )
}

export default roundDisplay