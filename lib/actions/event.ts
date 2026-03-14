'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createEvent(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const dateStr = formData.get('date') as string
    const location = formData.get('location') as string
    const image = formData.get('image') as string
    const category = formData.get('category') as string
    const published = formData.get('published') === 'true'

    await prisma.event.create({
        data: {
            title,
            description,
            date: new Date(dateStr),
            location,
            image,
            category,
            published,
        },
    })

    revalidatePath('/')
    revalidatePath('/agenda')
    revalidatePath('/admin/agenda')
    return { success: true }
}

export async function updateEvent(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const dateStr = formData.get('date') as string
    const location = formData.get('location') as string
    const image = formData.get('image') as string
    const category = formData.get('category') as string
    const published = formData.get('published') === 'true'

    await prisma.event.update({
        where: { id },
        data: {
            title,
            description,
            date: new Date(dateStr),
            location,
            image,
            category,
            published,
        },
    })

    revalidatePath('/')
    revalidatePath('/agenda')
    revalidatePath('/admin/agenda')
    
    return { success: true }
}

export async function deleteEvent(id: string) {
    await prisma.event.delete({
        where: { id },
    })
    revalidatePath('/')
    revalidatePath('/agenda')
    revalidatePath('/admin/agenda')
}

export async function toggleEventPublish(id: string, published: boolean) {
    await prisma.event.update({
        where: { id },
        data: { published },
    })
    revalidatePath('/')
    revalidatePath('/agenda')
    revalidatePath('/admin/agenda')
}
