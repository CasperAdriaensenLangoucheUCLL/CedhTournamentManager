import { AppBar, Button, Stack, Toolbar } from "@mui/material"
import Link from "next/link"

const Header: React.FC = () => {

    return(
        <>
        <AppBar position="static">
            <Toolbar>
                <Stack direction={"row"}>
                    <Link href={`/rounds`}>
                        <Button sx={{color:"white"}}>Rounds</Button>
                    </Link>
                    <Link href={`/players`}>
                        <Button sx={{color:"white"}}>Players</Button>
                    </Link>
                    <Link href={`/players/addPlayer`}>
                        <Button sx={{color:"white"}}>Add Player</Button>
                    </Link>
                </Stack>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Header