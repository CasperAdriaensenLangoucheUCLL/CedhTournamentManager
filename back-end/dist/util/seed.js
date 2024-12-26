"use strict";
// Execute: npx ts-node util/seed.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.player.deleteMany();
    yield prisma.table.deleteMany();
    yield prisma.round.deleteMany();
    //PLAYERS
    yield prisma.player.create({
        data: {
            firstName: "casper",
            lastName: "adriaensen langouche"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "seppe",
            lastName: "verschuren"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "lars",
            lastName: "larsternaam"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "paul",
            lastName: "stalmans"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "John",
            lastName: "Doe"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Jane",
            lastName: "Smith"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Michael",
            lastName: "Johnson"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Emily",
            lastName: "Williams"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Daniel",
            lastName: "Brown"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Sophia",
            lastName: "Davis"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "David",
            lastName: "Martinez"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Olivia",
            lastName: "Garcia"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Liam",
            lastName: "Rodriguez"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Charlotte",
            lastName: "Wilson"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Nolan",
            lastName: "Fitzgerald"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Zoey",
            lastName: "Carlson"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Maximus",
            lastName: "Garrett"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Seraphina",
            lastName: "Blake"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Theo",
            lastName: "Cunningham"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Iris",
            lastName: "Bennett"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Jasper",
            lastName: "Rivers"
        }
    });
    yield prisma.player.create({
        data: {
            firstName: "Cleo",
            lastName: "Hawkins"
        }
    });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield main();
        yield prisma.$disconnect();
    }
    catch (error) {
        console.error(error);
        yield prisma.$disconnect();
        process.exit(1);
    }
}))();
