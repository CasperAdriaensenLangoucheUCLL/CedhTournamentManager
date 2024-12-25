const getAllPlayersFromTable = async (tableId:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/tableId/${tableId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const getAllPlayers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const getAllUnDroppedPlayers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/unDropped/true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const dropPlayer = async (id:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/drop/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const addPlayer = async (data:{firstName:string, lastName:string}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/`, {
        method: 'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const getPlayerById = async (id:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const playerService = {
    getAllPlayersFromTable,
    getAllPlayers,
    getAllUnDroppedPlayers,
    dropPlayer,
    addPlayer,
    getPlayerById,
}

export default playerService;