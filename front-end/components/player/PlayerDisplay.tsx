import { Player, Round } from "@/types";
import { Box, IconButton, Paper, Popper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import WinsNLosses from "./winLoss";
import { useState } from "react";
import React from "react";
import playerService from "@/service/playerService";
import { Md5 } from "ts-md5";
import { useRouter } from "next/router";

type Props = {
    player: Player;
    mmr: number;
    allRounds: Round[];
}


const PlayerDisplay: React.FC<Props> = ({player, mmr, allRounds}:Props) => { 
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropped, setDropped] = useState(player.dropped)

    const router = useRouter()

    const dropPlayer = () => {
        if(!player.id) return
        setMenuOpen(false)
        setDropped(true)
        playerService.dropPlayer(player.id)
    }

    return (<>
        <Paper sx={{p:1, m:1, backgroundColor:(dropped?"lightgrey":"white")}}>
            <Grid container>
                <Grid size={10.5}>
                    <Grid container>
                        <Grid size={4}>
                            <Stack>
                                <Typography sx={{ cursor: 'pointer'}} onClick={() => router.push(`/players/${player.id}`)} variant={"h6"}>{player.firstName} {player.lastName}</Typography>
                            </Stack>  
                        </Grid>

                        <Grid size={12}>
                            <Typography variant="subtitle2">{dropped?"Dropped":"Active"}</Typography>
                        </Grid>

                        <Grid size={1}>
                            <Typography>wins: {player.wins + player.byes}</Typography>
                        </Grid>
                        <Grid size={1}>
                            <Typography>draws: {player.draws}</Typography>
                        </Grid>
                        <Grid size={1}>
                            <Typography>losses: {player.losses}</Typography>
                        </Grid>
                        <Grid size={9}>
                            <WinsNLosses player={player} allRounds={allRounds}/>
                        </Grid>

                        <Typography>Resistance: {((mmr*100).toFixed(1)) || 0}%</Typography>
                    </Grid>

                </Grid>

                <Grid size={1.5}>
                        
                            
                            {menuOpen && <Paper sx={{marginTop:1, padding:1}}>
                                <Grid container> 
                                    <Grid size={7}>
                                        <Typography paddingTop={1}>
                                            Drop player?
                                        </Typography>
                                    </Grid>

                                    <Grid size={2}>
                                        <Stack direction={"row"} justifyContent={"right"}>
                                        <IconButton
                                        sx={{ allignSelf:'right', color:"green" }}
                                        onClick={() => dropPlayer()}
                                        >
                                            <FaCircleCheck />
                                        </IconButton>
                                        </Stack>
                                    </Grid>

                                    <Grid size={3}>
                                        <Stack direction={"row"} justifyContent={"right"}>
                                        <IconButton
                                        sx={{ allignSelf:'right' }}
                                        color="error"
                                        onClick={() => setMenuOpen(false)}
                                        >
                                            <FaCircleXmark />
                                        </IconButton>
                                        </Stack>
                                    </Grid>

                                </Grid>
                            </Paper>}
                            
                            {!dropped && !menuOpen &&
                                <Stack direction={"row"} justifyContent={"right"}>
                                <IconButton
                                sx={{ allignSelf:'right' }}
                                color="error"
                                onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <FaCircleXmark />
                                </IconButton>
                                </Stack>
                            }
                            
                        
                </Grid>
            </Grid>
        </Paper>
    </>)
}

export default PlayerDisplay