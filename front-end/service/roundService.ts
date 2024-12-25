const getRoundById = async (id:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rounds/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const getAllRounds = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rounds/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const createNewRound = async (content:{behaviour: string, name:string, numberOfTables: number|null, ranked: boolean}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rounds/`, {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
            'Content-Type': 'application/json',
            
        },
    })

    return response
}

const deleteRound = async (id:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rounds/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}


const RoundService = {
    getRoundById,
    createNewRound,
    getAllRounds,
    deleteRound,
}

export default RoundService