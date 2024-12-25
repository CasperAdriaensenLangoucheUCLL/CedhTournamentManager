import RoundService from "@/service/roundService";
import { Round, Table } from "@/types"
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Grid from "@mui/material/Grid2"
import TableDisplay from "@/components/table/TableDisplay";
import { Box, Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import Header from "@/components/Header";
import { FaCircleXmark } from "react-icons/fa6";

const roundDisplay: React.FC = () => {
    const [round, setRound] = useState<Round>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { roundId } = router.query;

    useEffect(() => {
        const fetchRound = async () => {
            if (!roundId) return;

            try {
                setLoading(true);
                const response = await RoundService.getRoundById(parseInt(roundId as string));

                if (!response.ok) {
                    return;
                }

                const roundData = (await response.json()) as Round;
                setRound(roundData);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchRound();
    }, [roundId]);

    const deleteRound = () => {
        if(!round || !round.id) return;
        RoundService.deleteRound(round.id)
        setTimeout(()=>{
            router.push("/rounds")
        }, 1000)
        
    }

    return (
        <>
        <Header/>
        {(loading && round)? 
        <>
         <Container component="main" sx={{width:800, padding:3}}>
            <Paper>
                <Typography>loading</Typography>
            </Paper>
         </Container>
        </>:
        <>
        {(!round || !round.tables.some(table => !(table.winnerId == null || table.winnerId == -2))) && <Box>
            <Stack direction={"row"} justifyContent={"right"}>
                <IconButton
                sx={{ allignSelf:'right' }}
                color="error"
                onClick={() => deleteRound()}
                >
                    <FaCircleXmark />
                </IconButton>
            </Stack>
        </Box>}
        <Grid container spacing={2} padding={2}>
            {round?.tables.sort((a,b) => {return (a.id||0) - (b.id||0)}).map((table) => (
                <Grid size={6}>
                    <TableDisplay round={round} table={table}/>
                </Grid>
            ))}
        </Grid>
        </>}
        </>
    )
}

export default roundDisplay