import tableService from "@/service/tableService";
import { Player, Round, Table } from "@/types";
import { Box, Button, Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2'
import { useEffect, useState } from "react";
import { FaCircleXmark } from 'react-icons/fa6';

type Props = {
    table: Table;
    round?: Round;
    players: Player[]
}


const TableDisplay: React.FC<Props> = ({table, round, players}:Props) => {  
    // const [players, setPlayers] = useState<Player[]>([]);
    const [winner, setWinner] = useState<number|null>(table.winnerId);

    const [declareWinner, setDeclareWinner] = useState(false);

    // useEffect(() => {
    //     const fetchRound = async () => {
    //         if (!table.id) return
    //         try {
    //             setLoading(true);
    //             const response = await playerService.getAllPlayersFromTable(table.id);

    //             if (!response.ok) {
    //                 return;
    //             }

    //             const playersResopnse = (await response.json()) as Player[];
    //             setPlayers(playersResopnse);
    //         } catch (err) {
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchRound();
    // }, [table]);

    const handleDraw = async () => {
        setWinner(-1)
        if (!table.id) throw new Error("table has no Id");
        tableService.tableDraw(table.id)
        setDeclareWinner(false)
    }

    const handleWin = async (playerId:number) => {
        setWinner(playerId)
        if (!table.id) throw new Error("table has no Id");
        tableService.tableWin(table.id, playerId)
        setDeclareWinner(false)
    }

    const handleClear = async () => {
        setWinner(null)
        if (!table.id) throw new Error("table has no Id");
        tableService.clearTable(table.id)
        setDeclareWinner(false)
    }
    
    return(
        (!table)?
        <>
        <Container component="main" sx={{width:800, padding:3}}>
            <Paper>
                <Typography>loading</Typography>
            </Paper>
        </Container>
        </>:
        <>
            <Box>
                <Paper>
                    <Stack>
                        <Box>

                        </Box>
                    <Typography padding={1} variant="h6" align="center">{round?.name} - {table.name}</Typography>
                    {!winner && 
                    <Stack>
                        {!declareWinner && 
                        <>
                        <Grid container spacing={1} padding={1}>
                            {players.map(player => (<Grid size={6}>
                                <Paper sx={{p:1}}>
                                    <Box>
                                        <Typography>{player.firstName} {player.lastName}</Typography>
                                    </Box>
                                </Paper>
                                
                                </Grid>))}
                        </Grid>
                        <Button onClick={() => setDeclareWinner(true)}>
                            <Typography>
                                Finish
                            </Typography>
                        </Button>
                        </>
                        }


                        {declareWinner && 
                        <>
                        <Button onClick={() => handleDraw()}>
                            <Paper sx={{p:1, backgroundColor:"red"}}>
                                <Typography width={100}>
                                Draw
                                </Typography>
                            </Paper>
                            
                        </Button>
                        <Grid container spacing={1} padding={1}>
                            {players.map(player => (<Grid size={6}>
                                <Paper sx={{p:1, backgroundColor:'LightGray' ,":hover":{backgroundColor:"#ff9999"}}} elevation={2}>
                                    <Box onClick={() => handleWin(player.id?player.id:-1)} sx={{ cursor: 'pointer'}}>
                                        <Typography>{player.firstName} {player.lastName}</Typography>
                                    </Box>
                                </Paper>
                                </Grid>))}
                        </Grid>
                        </>
                        }



                    </Stack>}

                    {winner &&
                    <>
                    <Box>

                    {table.winnerId != -2 &&
                    <Stack direction={"row"} justifyContent={"right"}>
                        <IconButton
                        sx={{ allignSelf:'right' }}
                        color="error"
                        onClick={() => handleClear()}
                        >
                            <FaCircleXmark />
                        </IconButton>
                    </Stack>}
                    
                    <Stack>
                    <Grid container spacing={1} padding={1}>
                        {players.map(player => (<Grid size={6}>
                            <Paper sx={{p:1, backgroundColor:(player.id == winner?"red":"gray")}}>
                                <Box>
                                    <Typography>{player.firstName} {player.lastName}</Typography>
                                </Box>
                            </Paper>
                            
                            </Grid>))}
                        </Grid>
                    </Stack>
                    </Box>
                    </>
                    }
                                            
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}

export default TableDisplay;