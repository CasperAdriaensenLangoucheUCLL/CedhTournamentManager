import Header from "@/components/Header";
import playerService from "@/service/playerService";
import RoundService from "@/service/roundService";
import { Player, Round } from "@/types";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Box, Stack, Typography, Switch, Select, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
	const [displayCreateRound, setDisplayCreateRound] = useState(false);
	const [allPlayers, setAllPlayers] = useState<Player[]>([])
	const [loading, setLoading] = useState(true);

	const [behaviour, setBehaviour] = useState("");
	const [ranked, setRanked] = useState(false);
	const [name, setName] = useState("")

	const [top16, setTop16] = useState(false);
	const [top4, setTop4] = useState(false);

	const [allRounds, setAllRounds] = useState<Round[]>([])

	const router = useRouter();

	useEffect(() => {
		const fetchRounds = async () => {
			const roundResponse = await RoundService.getAllRounds()
			const roundData = await (roundResponse.json()) as Round[]
			setAllRounds(roundData);
			setLoading(false)
		}
		fetchRounds()
	},[])

	useEffect(() => {
		const fetchPlayer = async () => {
			const playerResponse = await playerService.getAllUnDroppedPlayers()
			const playerData = await (playerResponse.json()) as Player[]
			setAllPlayers(playerData);
			setLoading(false)
		}
		fetchPlayer()
	},[])

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

	const sortDates = (a:Round, b:Round) => {
		if (parseTime(a.createdAt) > parseTime(b.createdAt)) return -1;
        if (parseTime(a.createdAt) < parseTime(b.createdAt)) return 1;
        return 0;
	}

	const createRound = async () => {
		if(!behaviour) return

		const content = {
			behaviour,
			name: name?name:"round " + (allRounds.length + 1),
			numberOfTables: top4?1:top16?4:null,
			ranked
		}
		//console.log(allRounds)
		console.log(content)

		const roundResponse = await RoundService.createNewRound(content);
		const roundData = await(roundResponse.json()) as Round

		router.push(`rounds/${roundData.id}`)
	}

    return (
      (!loading && 
	  <>
	  	<Header/>
        <Stack>
			{!displayCreateRound &&
			<Paper sx={{p:1, m:1, width:800, alignSelf:"center", marginTop:5}}>
				<Stack>
					<Button onClick={() => setDisplayCreateRound(true)}>
						<Typography>
						new round
						</Typography>						
					</Button>
				</Stack>	
			</Paper>}

			{displayCreateRound &&
				<Paper sx={{p:1, m:3, width:1000, alignSelf:"center", marginTop:5}}>
					<Stack>
						<Grid container spacing={2} padding={2}>
							{allPlayers.map(player => (
								<Grid size={3}>
									<Paper sx={{p:1}}>
										<Typography>
											{player.firstName} {player.lastName}
										</Typography>
									</Paper>
								</Grid>
							))}
						</Grid>
						<Grid container spacing={2} marginTop={2}>
							<Grid size={6}>
								<Grid container spacing={2} paddingLeft={2}>
									<Grid size={6}>
										<TextField 
										label={"name"}
										onChange={e => {
											setName(e.target.value)
										}}
										/>
									</Grid>

									<Grid size={6}>
										<Box>
											<FormControlLabel control={<Switch onChange={() => {
												setRanked(!ranked)
												setTop4(false)
												setTop16(false)
												}}/>} label="Ranked?" />
										</Box>
									</Grid>

									<Grid size={6}>
										<Box>
											<FormControlLabel control={<Switch disabled={!ranked} checked={top4 && ranked} onChange={() => {
												setTop4(!top4)
												setTop16(false)
												}}/>} label="top4?" />
										</Box>
									</Grid>
									
									<Grid size={6}>
										<Box>
											<FormControlLabel control={<Switch disabled={!ranked} checked={top16 && ranked} onChange={() => {
												setTop16(!top16)
												setTop4(false)
												}}/>} label="top16?" />
										</Box>
									</Grid>
								</Grid>

							</Grid>
							<Grid size={6}>
							<FormControl fullWidth>
                    			<InputLabel id="display-label">Table strategy</InputLabel>
                    				<Select
                        			labelId="display-label"
                        			label="Table strategy"
                        			onChange={(e) => {
                            		setBehaviour(e.target.value as string);}}
                    				>
										<MenuItem defaultChecked={true} value={"by"}>Only 4 player tables, but some byes</MenuItem>
										<MenuItem value={"fill"}>No byes, but some 3 player tables</MenuItem>
                    				</Select>
                			</FormControl>
							</Grid>
						</Grid>
						
						<Paper sx={{p:1, m:1, width:800, alignSelf:"center", marginTop:5}}>
							<Stack>
								<Button onClick={() => createRound()}>
									<Typography>
										Create round
									</Typography>						
								</Button>
							</Stack>	
						</Paper>
					</Stack>
				</Paper>
			}	

			<Grid container spacing={2} padding={2}>
				{allRounds.sort((a,b) => sortDates(a,b)).map(round => (
					<Grid size={3}>
						<Paper sx={{padding:1, backgroundColor:((round.tables.some(table => table.winnerId == null))?"transparant":"grey")}}>
							<Box onClick={() => router.push(`/rounds/${round.id}`)} sx={{ cursor: 'pointer'}}>
								<Typography>
									{round.name}
								</Typography>
							</Box>
						</Paper>
					</Grid>
				))}
			</Grid>	
        </Stack>
      </>)
  
    );
  };
  
  export default Home;