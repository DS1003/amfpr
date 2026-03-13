import { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import prisma from "@/lib/prisma"
import { GalleryClient } from "@/components/gallery/gallery-client"

export const metadata: Metadata = {
    title: "Nos Photos | AMFPR",
    description: "Découvrez notre galerie photos, nos évènements en images.",
}

export default async function PhotosPage() {
    const galeries = await prisma.gallery.findMany({
        where: { published: true },
        include: { photos: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <main>
            <PageHeader
                title="Nos Photos"
                description="Revivez nos moments forts en images, de nos activités à nos différentes missions à travers le Sénégal."
            />

            <section className="py-24 bg-white">
                <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
                    <GalleryClient galeries={galeries} />
                </div>
            </section>
        </main>
    )
}
