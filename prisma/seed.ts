import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: "admin@afpr.org" },
        update: {},
        create: {
            email: "admin@amfpr.com",
            name: "Administrateur AMFPR",
            role: "ADMIN",
        },
    })
    console.log({ admin })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
