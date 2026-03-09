import { VideoForm } from "@/components/admin/video-form"
import { updateVideo } from "@/lib/actions/video"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ModifierVideoPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const video = await prisma.video.findUnique({
        where: { id },
    })

    if (!video) {
        notFound()
    }

    return (
        <div className="space-y-8 pb-10">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Mise à jour</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Modifier la vidéo</h1>
                <p className="mt-2 text-muted-foreground">Modifiez les informations de la vidéo YouTube.</p>
            </div>

            <VideoForm
                initialData={video}
                action={async (formData) => {
                    'use server'
                    await updateVideo(video.id, formData)
                }}
            />
        </div>
    )
}
