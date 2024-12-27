import RoundService from "@/service/roundService";
import { Player, Round, Table } from "@/types";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaCircleCheck, FaCircleDot, FaCircleMinus, FaCircleQuestion, FaCircleXmark } from "react-icons/fa6";

type Props = {
    player: Player;
    allRounds: Round[];
}

const WinsNLosses: React.FC<Props> = ({player, allRounds}:Props) => { 
    const [loading, setLoading] = useState(true);

	const sortDates = (a:Round, b:Round) => {
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

    const sortTables = (a:Table, b:Table) => {
        const around = allRounds.find(round => round.tables.some(table => table.id == a.id))
        const bround = allRounds.find(round => round.tables.some(table => table.id == b.id))
        if (!around && !bround) return 0
        if (!around) return 1
        if (!bround) return -1

        return sortDates(around,bround);
    }

    return (
        <>
        <Stack direction={"row"}>
            {player.tables.sort((a,b) => sortTables(a, b)).map(table => {

                switch(table.winnerId) {
                    case -1: {
                        return <Box sx={{ml:1}}><FaCircleMinus fontSize={"1.2em"} color="CornflowerBlue"/></Box>
                    }
                    case -2: {
                        return <Box sx={{ml:1}}><FaCircleDot fontSize={"1.2em"} color="greenYellow"/></Box>
                    }
                    case player.id: {
                        return <Box sx={{ml:1}}><FaCircleCheck fontSize={"1.2em"} color="green"/></Box>
                    }
                    case null: {
                        return <Box sx={{ml:1}}><FaCircleQuestion fontSize={"1.2em"} color="grey"/></Box>
                    }
                    default: {
                        return <Box sx={{ml:1}}><FaCircleXmark fontSize={"1.2em"} color="red"/></Box>
                    }
                }
            })}
        </Stack>
        
        </>
    )
}

export default WinsNLosses;