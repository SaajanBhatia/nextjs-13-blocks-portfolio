const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const adminUser = await prisma.user.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            username: "admin",
            password: "$2a$12$meIMM.1Mj0CsnjO/392WX.L4YIvrruj4tSsQ8SteF83BM7RWgyn2m", // Password initially is Password_123
            displayName: "John Doe"
        }
    })

    const exampleBlock = await prisma.block.create({
        data: {
            headline: "This is a sample block",
            url: "www.example.com"
        }
    })

    console.log("Admin user and sample block successfully seeded")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e) // Catch Error
        await prisma.$disconnect()
        process.exit(1)
    })


// To seed the database, run npx prisma db seed