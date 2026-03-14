'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import slugify from "slugify"

export async function createActivity(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const dateStr = formData.get('date') as string
    const image = formData.get('image') as string
    const videoUrl = formData.get('videoUrl') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'true'

    const slug = slugify(title, { lower: true, strict: true }) || Date.now().toString()

    try {
        const parsedDate = dateStr ? new Date(dateStr) : new Date()
        
        await prisma.activity.create({
            data: {
                title,
                description,
                category,
                date: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
                image: image || null,
                videoUrl: videoUrl || null,
                content: content || null,
                published,
                slug,
            },
        })

        revalidatePath('/')
        revalidatePath('/articles')
        revalidatePath('/admin/activites')
        return { success: true }
    } catch (error: any) {
        console.error("[CREATE_ACTIVITY_ERROR]", error)
        if (error.code === 'P2002') {
            return { error: "Un article avec ce titre existe déjà (conflit de lien)." }
        }
        return { error: `Erreur: ${error.message || "Une erreur est survenue"}` }
    }
}

export async function updateActivity(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const dateStr = formData.get('date') as string
    const image = formData.get('image') as string
    const videoUrl = formData.get('videoUrl') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'true'

    const slug = slugify(title, { lower: true, strict: true }) || id

    try {
        const parsedDate = dateStr ? new Date(dateStr) : new Date()

        await prisma.activity.update({
            where: { id },
            data: {
                title,
                description,
                category,
                date: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
                image: image || null,
                videoUrl: videoUrl || null,
                content: content || null,
                published,
                slug,
            },
        })

        revalidatePath('/')
        revalidatePath('/articles')
        revalidatePath(`/articles/${slug}`)
        revalidatePath('/admin/activites')
        
        return { success: true }
    } catch (error: any) {
        console.error("[UPDATE_ACTIVITY_ERROR]", error)
        if (error.code === 'P2002') {
            return { error: "Un article avec ce titre existe déjà (conflit de lien)." }
        }
        return { error: `Erreur: ${error.message || "Une erreur est survenue"}` }
    }
}

export async function deleteActivity(id: string) {
    const activity = await prisma.activity.findUnique({ where: { id } })
    await prisma.activity.delete({
        where: { id },
    })
    revalidatePath('/')
    revalidatePath('/articles')
    if (activity) revalidatePath(`/articles/${activity.slug}`)
    revalidatePath('/actualites')
    revalidatePath('/admin/activites')
    return { success: true }
}
