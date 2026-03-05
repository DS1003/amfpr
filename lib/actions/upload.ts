'use server'

import cloudinary from "@/lib/cloudinary"

export async function uploadImage(formData: FormData) {
    const file = formData.get('file') as File
    if (!file) {
        throw new Error('Aucun fichier fourni')
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: 'amfpr_activites',
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(result?.secure_url || '')
            }
        ).end(buffer)
    })
}
