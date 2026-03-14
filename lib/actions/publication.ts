'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPublication(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const dateStr = formData.get('date') as string
    const fileUrl = formData.get('fileUrl') as string
    const thumbnail = formData.get('thumbnail') as string
    const published = formData.get('published') === 'true'

    await prisma.publication.create({
        data: {
            title,
            description,
            category,
            date: new Date(dateStr || Date.now()),
            fileUrl,
            thumbnail,
            published,
        },
    })

    revalidatePath('/')
    revalidatePath('/publications')
    revalidatePath('/admin/publications')
    return { success: true }
}

export async function updatePublication(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const dateStr = formData.get('date') as string
    const fileUrl = formData.get('fileUrl') as string
    const thumbnail = formData.get('thumbnail') as string
    const published = formData.get('published') === 'true'

    await prisma.publication.update({
        where: { id },
        data: {
            title,
            description,
            category,
            date: new Date(dateStr || Date.now()),
            fileUrl,
            thumbnail,
            published,
        },
    })

    revalidatePath('/')
    revalidatePath('/publications')
    revalidatePath('/admin/publications')
    return { success: true }
}

export async function deletePublication(id: string) {
    await prisma.publication.delete({
        where: { id },
    })
    revalidatePath('/')
    revalidatePath('/publications')
    revalidatePath('/admin/publications')
    return { success: true }
}
