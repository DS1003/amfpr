'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createVideo(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const youtubeUrl = formData.get('youtubeUrl') as string
    const thumbnail = formData.get('thumbnail') as string
    const published = formData.get('published') === 'true'

    await prisma.video.create({
        data: {
            title,
            description,
            youtubeUrl,
            thumbnail,
            published,
        },
    })

    revalidatePath('/admin/galeries')
    revalidatePath('/galerie')
    revalidatePath('/galerie/videos')
    redirect('/admin/galeries/videos')
}

export async function updateVideo(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const youtubeUrl = formData.get('youtubeUrl') as string
    const thumbnail = formData.get('thumbnail') as string
    const published = formData.get('published') === 'true'

    await prisma.video.update({
        where: { id },
        data: {
            title,
            description,
            youtubeUrl,
            thumbnail,
            published,
        },
    })

    revalidatePath('/admin/galeries')
    revalidatePath('/galerie')
    revalidatePath('/galerie/videos')
    redirect('/admin/galeries/videos')
}

export async function deleteVideo(id: string) {
    await prisma.video.delete({
        where: { id },
    })
    revalidatePath('/admin/galeries')
    revalidatePath('/galerie')
    revalidatePath('/galerie/videos')
}
