import { Table } from "./Table";
import { Round as RoundPrisma, Table as TablePrisma } from "@prisma/client";

export class Round {
    id: number;
    behaviour: string;
    createdAt: Date;
    name: string;
    numberOfTables: number;
    ranked: boolean;
    tables: Table[];

    constructor(round: {id?: number, behaviour:string, createdAt?: Date, name: string;numberOfTables: number, ranked: boolean, tables?: Table[]}) {
        this.id = round.id;
        this.behaviour = round.behaviour;
        this.createdAt = round.createdAt;
        this.name = round.name;
        this.numberOfTables = round.numberOfTables;
        this.ranked = round.ranked;
        this.tables = round.tables;
    }

    static from({
        id, 
        behaviour,
        createdAt,
        name,
        numberOfTables, 
        ranked,
        tables
    }: RoundPrisma & {tables: TablePrisma[]}) {
        return new Round({
            id, 
            behaviour,
            createdAt,
            name,
            numberOfTables, 
            ranked, 
            tables: tables.map(table => Table.from(table))
        }
    )}

    getId():number {
        return this.id;
    }
}