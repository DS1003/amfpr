import { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import prisma from "@/lib/prisma"
import { VideoGalleryClient } from "@/components/gallery/video-gallery-client"

export const metadata: Metadata = {
    title: "Nos Vidéos | AFPR",
    description: "Découvrez nos vidéos YouTube, nos évènements en direct.",
}

export default async function VideosPage() {
    const videos = await prisma.video.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    })

    // Serialize dates for client component
    const serializedVideos = videos.map(v => ({
        ...v,
        createdAt: v.createdAt.toISOString(),
        updatedAt: v.updatedAt.toISOString(),
    }))

    return (
        <main>
            <PageHeader
                title="Nos Vidéos"
                description="Retrouvez nos meilleurs moments en vidéo, nos activités et événements captés par notre équipe."
            />

            <section className="py-24 bg-white">
                <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
                    <VideoGalleryClient videos={serializedVideos} />
                </div>
            </section>
        </main>
    )
}
