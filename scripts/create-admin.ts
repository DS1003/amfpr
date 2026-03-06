import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const email = "admin@afpr.org"
    const password = "admin_password"
    const passwordHash = await bcrypt.hash(password, 10)

    const admin = await prisma.user.upsert({
        where: { email },
        update: {
            passwordHash,
            role: "ADMIN",
        },
        create: {
            email,
            name: "Super Admin",
            passwordHash,
            role: "ADMIN",
        },
    })

    console.log({ admin })
    console.log("Super admin created/updated successfully!")
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log("PLEASE CHANGE THE PASSWORD ON YOUR FIRST LOGIN.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
