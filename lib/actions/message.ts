"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getSession } from "./auth"

export async function getMessages() {
    const { user } = await getSession()
    if (!user) throw new Error("Non autorisé")

    return await prisma.contactMessage.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function markAsRead(id: string) {
    const { user } = await getSession()
    if (!user) throw new Error("Non autorisé")

    await prisma.contactMessage.update({
        where: { id },
        data: { read: true }
    })

    revalidatePath('/admin/messages')
}

export async function deleteMessage(id: string) {
    const { user } = await getSession()
    if (!user) throw Error("Non autorisé")

    await prisma.contactMessage.delete({
        where: { id }
    })

    revalidatePath('/admin/messages')
}

export async function getUnreadCount() {
    const { user } = await getSession()
    if (!user) return 0

    return await prisma.contactMessage.count({
        where: { read: false }
    })
}

export async function submitContactMessage(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !subject || !message) {
        throw new Error("Tous les champs sont requis")
    }

    const contactMessage = await prisma.contactMessage.create({
        data: {
            name,
            email,
            subject,
            message,
            read: false
        }
    })

    revalidatePath('/admin/messages')
    return contactMessage
}

