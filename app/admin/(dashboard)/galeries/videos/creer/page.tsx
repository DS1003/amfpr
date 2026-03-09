import { VideoForm } from "@/components/admin/video-form"
import { createVideo } from "@/lib/actions/video"

export default function NouvelleVideoPage() {
    return (
        <div className="space-y-8 pb-10">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Nouveau Contenu</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Ajouter une vidéo YouTube</h1>
                <p className="mt-2 text-muted-foreground">Ajoutez une vidéo YouTube qui sera visible sur le site public.</p>
            </div>

            <VideoForm action={async (formData) => {
                'use server'
                await createVideo(formData)
            }} />
        </div>
    )
}
