export type Round = {
    id?: number;
    createdAt: string;
    behaviour: string;
    name:string;
    numberOfTables: number;
    ranked: boolean;
    tables: Table[];
}

export type Table = {
    id?: number;
    name:string;
    size: number;
    winnerId: number;
}

export type Player = {
    id?: number;
    firstName: string;
    lastName: string;
    wins: number;
    draws: number;
    losses: number;
    byes: number;
    opponentScore: number;
    dropped: Boolean;
    tables: Table[]
}