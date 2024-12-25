// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    
    await prisma.player.deleteMany();
    await prisma.table.deleteMany();
    await prisma.round.deleteMany();

    //PLAYERS
    await prisma.player.create({
        data: {
            firstName: "casper",
            lastName: "adriaensen langouche"
        }
    })

    await prisma.player.create({
        data: {
            firstName: "seppe",
            lastName: "verschuren"
        }
    })

    await prisma.player.create({
        data: {
            firstName: "lars",
            lastName: "larsternaam"
        }
    })

    await prisma.player.create({
        data: {
            firstName: "paul",
            lastName: "stalmans"
        }
    })

    await prisma.player.create({
        data: {
            firstName: "John",
            lastName: "Doe"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Jane",
            lastName: "Smith"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Michael",
            lastName: "Johnson"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Emily",
            lastName: "Williams"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Daniel",
            lastName: "Brown"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Sophia",
            lastName: "Davis"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "David",
            lastName: "Martinez"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Olivia",
            lastName: "Garcia"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Liam",
            lastName: "Rodriguez"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Charlotte",
            lastName: "Wilson"
        }
    })

    await prisma.player.create({
        data: {
            firstName: "Nolan",
            lastName: "Fitzgerald"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Zoey",
            lastName: "Carlson"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Maximus",
            lastName: "Garrett"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Seraphina",
            lastName: "Blake"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Theo",
            lastName: "Cunningham"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Iris",
            lastName: "Bennett"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Jasper",
            lastName: "Rivers"
        }
    })
    
    await prisma.player.create({
        data: {
            firstName: "Cleo",
            lastName: "Hawkins"
        }
    })
   
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();