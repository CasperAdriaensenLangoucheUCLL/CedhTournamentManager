import { Player } from "./Player";
import { Round } from "./Round";
import { Table as TablePrisma, Round as RoundPrisma, Player as PlayerPrisma } from "@prisma/client";

export class Table{
    id: number;
    name: string;
    size: number;
    winnerId: number|null;

    constructor(game: {id?: number, name:string,size:number, winnerId: number|null}) {
        this.id = game.id;
        this.name = game.name;
        this.size = game.size;
        this.winnerId = game.winnerId;
    }

    static from({
        id,
        name,
        winnerId,
        size,
    }: TablePrisma) {
        return new Table({
            id,
            name,
            winnerId,
            size
        });
    }
}