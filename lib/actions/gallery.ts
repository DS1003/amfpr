'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createGallery(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const coverImage = formData.get('coverImage') as string
    const published = formData.get('published') === 'true'

    const photosJson = formData.get('photos') as string
    const photos = photosJson ? JSON.parse(photosJson) : []
    const createdAtStr = formData.get('createdAt') as string

    await prisma.gallery.create({
        data: {
            title,
            description,
            coverImage,
            published,
            ...(createdAtStr && { createdAt: new Date(createdAtStr) }),
            photos: {
                create: photos.map((url: string) => ({ url }))
            }
        },
    })

    revalidatePath('/')
    revalidatePath('/galerie')
    revalidatePath('/galerie/photos')
    revalidatePath('/admin/galeries')
    redirect('/admin/galeries')
}

export async function updateGallery(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const coverImage = formData.get('coverImage') as string
    const published = formData.get('published') === 'true'

    const photosJson = formData.get('photos') as string
    const newPhotos = photosJson ? JSON.parse(photosJson) : []
    const createdAtStr = formData.get('createdAt') as string

    await prisma.$transaction([
        prisma.photo.deleteMany({ where: { galleryId: id } }),
        prisma.gallery.update({
            where: { id },
            data: {
                title,
                description,
                coverImage,
                published,
                ...(createdAtStr && { createdAt: new Date(createdAtStr) }),
                photos: {
                    create: newPhotos.map((url: string) => ({ url }))
                }
            },
        })
    ]);

    revalidatePath('/')
    revalidatePath('/galerie')
    revalidatePath('/galerie/photos')
    revalidatePath('/admin/galeries')
    
    // We return success to the client instead of redirecting because it's called via onSubmit
    return { success: true }
}

export async function deleteGallery(id: string) {
    await prisma.gallery.delete({
        where: { id },
    })
    revalidatePath('/')
    revalidatePath('/galerie')
    revalidatePath('/galerie/photos')
    revalidatePath('/admin/galeries')
}
