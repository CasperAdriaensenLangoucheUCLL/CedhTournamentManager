const clearTable = async (tableId:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tables/${tableId}/clear`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const tableDraw = async (tableId:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tables/${tableId}/draw`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const tableWin = async (tableId:number, playerId:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tables/${tableId}/wonBy/${playerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}

const tableService = {
    clearTable,
    tableDraw,
    tableWin,
}

export default tableService;