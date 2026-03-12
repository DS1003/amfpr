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

    const slug = slugify(title, { lower: true, strict: true })

    await prisma.activity.create({
        data: {
            title,
            description,
            category,
            date: new Date(dateStr),
            image,
            videoUrl,
            content,
            published,
            slug,
        },
    })

    revalidatePath('/')
    revalidatePath('/activites')
    revalidatePath('/admin/activites')
    redirect('/admin/activites')
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

    const slug = slugify(title, { lower: true, strict: true })

    await prisma.activity.update({
        where: { id },
        data: {
            title,
            description,
            category,
            date: new Date(dateStr),
            image,
            videoUrl,
            content,
            published,
            slug,
        },
    })

    revalidatePath('/')
    revalidatePath('/activites')
    revalidatePath(`/activites/${slug}`)
    revalidatePath('/admin/activites')
    
    // Check if the form component expects a redirect or a result
    return { success: true }
}

export async function deleteActivity(id: string) {
    const activity = await prisma.activity.findUnique({ where: { id } })
    await prisma.activity.delete({
        where: { id },
    })
    revalidatePath('/')
    revalidatePath('/activites')
    if (activity) revalidatePath(`/activites/${activity.slug}`)
    revalidatePath('/admin/activites')
}
