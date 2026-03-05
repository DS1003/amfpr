import { Lucia } from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import prisma from "./prisma"

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            role: attributes.role,
            name: attributes.name,
            email: attributes.email,
        }
    },
})

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    role: "USER" | "ADMIN" | "EDITOR"
    name: string
    email: string
}
