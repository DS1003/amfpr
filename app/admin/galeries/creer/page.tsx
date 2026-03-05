import { GalleryForm } from "@/components/admin/gallery-form"
import { createGallery } from "@/lib/actions/gallery"

export default function NouvelleGaleriePage() {
    return (
        <div className="space-y-8 pb-10">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Nouveau Contenu</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Ajouter un album photo</h1>
                <p className="mt-2 text-muted-foreground">Créez une nouvelle galerie photo qui sera visible sur le site public.</p>
            </div>

            <GalleryForm action={async (formData) => {
                'use server'
                await createGallery(formData)
            }} />
        </div>
    )
}
