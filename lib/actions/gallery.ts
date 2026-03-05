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

    const gallery = await prisma.gallery.create({
        data: {
            title,
            description,
            coverImage,
            published,
            photos: {
                create: photos.map((url: string) => ({ url }))
            }
        },
    })

    revalidatePath('/admin/galeries')
    revalidatePath('/galerie')
    redirect('/admin/galeries')
}

export async function updateGallery(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const coverImage = formData.get('coverImage') as string
    const published = formData.get('published') === 'true'

    const photosJson = formData.get('photos') as string
    const newPhotos = photosJson ? JSON.parse(photosJson) : []

    // We will delete all old photos and insert new ones to keep it simple
    // A more complex approach would be to calculate diffs.

    await prisma.$transaction([
        prisma.photo.deleteMany({ where: { galleryId: id } }),
        prisma.gallery.update({
            where: { id },
            data: {
                title,
                description,
                coverImage,
                published,
                photos: {
                    create: newPhotos.map((url: string) => ({ url }))
                }
            },
        })
    ]);

    revalidatePath('/admin/galeries')
    revalidatePath('/galerie')
    redirect('/admin/galeries')
}

export async function deleteGallery(id: string) {
    await prisma.gallery.delete({
        where: { id },
    })
    revalidatePath('/admin/galeries')
    revalidatePath('/galerie')
}
