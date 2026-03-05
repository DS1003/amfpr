import { GalleryForm } from "@/components/admin/gallery-form"
import { updateGallery } from "@/lib/actions/gallery"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ModifierGaleriePage({ params }: { params: { id: string } }) {
    const gallery = await prisma.gallery.findUnique({
        where: { id: params.id },
        include: { photos: true }
    })

    if (!gallery) {
        notFound()
    }

    return (
        <div className="space-y-8 pb-10">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Mise à jour</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Modifier l'album photo</h1>
                <p className="mt-2 text-muted-foreground">Ajoutez ou supprimez des photos de cette galerie.</p>
            </div>

            <GalleryForm
                initialData={gallery}
                action={async (formData) => {
                    'use server'
                    await updateGallery(gallery.id, formData)
                }}
            />
        </div>
    )
}
