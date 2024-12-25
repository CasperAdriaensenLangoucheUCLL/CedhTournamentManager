import database from "../util/database";
import { Table } from "./Table"
import {Player as PlayerPrisma, Table as TablePrisma} from "@prisma/client"

export class Player {
    id: number;
    firstName: string;
    lastName: string;
    wins: number;
    draws: number;
    byes: number;
    losses: number;
    opponentScore: number;
    dropped: boolean;
    tables: Table[];

    constructor(player: {id?: number, firstName: string, lastName: string, wins?: number, draws?: number, byes?:number, losses?: number, opponentScore?: number, dropped:boolean, tables?: Table[]}) {
        this.id = player.id;
        this.firstName = player.firstName;
        this.lastName = player.lastName;
        this.wins = player.wins;
        this.draws = player.draws;
        this.byes = player.byes;
        this.losses = player.losses;
        this.opponentScore= player.opponentScore;
        this.dropped = player.dropped;
        this.tables = player.tables;
    }

    static async from({
        id, 
        firstName, 
        lastName, 
        wins, 
        draws, 
        losses, 
        byes,
        opponentScore,
        dropped,
        tables
    }: PlayerPrisma & {tables: TablePrisma[]}) {
        return new Player({
            id, 
            firstName, 
            lastName, 
            wins, 
            draws, 
            losses, 
            byes,
            opponentScore,
            dropped, 
            tables: tables.map(table => Table.from(table))
        })
    }

    getScore():number {
        return this.wins * 4 + this.draws
    }

    getOpponentWinRate():number {
        return this.opponentScore / this.tables.length;
    }
}

