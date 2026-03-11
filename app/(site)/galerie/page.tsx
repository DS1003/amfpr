import { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Camera, Play, ArrowRight, Image as ImageIcon } from "lucide-react"

export const metadata: Metadata = {
    title: "Galerie | AFPR",
    description: "Découvrez notre galerie média, nos évènements en images et en vidéos.",
}

export default async function GaleriePage() {
    const [galeries, videos] = await Promise.all([
        prisma.gallery.findMany({
            where: { published: true },
            include: { _count: { select: { photos: true } } },
            orderBy: { createdAt: 'desc' },
            take: 3,
        }),
        prisma.video.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            take: 3,
        }),
    ])

    const totalPhotos = galeries.reduce((sum, g) => sum + g._count.photos, 0)

    return (
        <main>
            <PageHeader
                title="Notre Galerie"
                description="Revivez nos moments forts en images et en vidéos. Découvrez nos activités et missions à travers le Sénégal."
            />

            <section className="py-24 bg-white">
                <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
                    {/* Hero Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Photos Card */}
                        <Link href="/galerie/photos" className="group">
                            <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-10 md:p-12 hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:border-accent/20 transition-all duration-700 relative overflow-hidden">
                                {/* Decorative subtle gradient in background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-colors duration-700" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="size-16 rounded-2xl bg-secondary/80 flex items-center justify-center border border-border/40 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-500 text-primary shadow-sm">
                                            <ImageIcon className="size-7" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Collection</span>
                                            <h3 className="font-serif text-3xl font-bold text-primary tracking-tight mt-1 group-hover:text-accent transition-colors duration-300">Nos Photos</h3>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed font-medium mb-10 flex-1">
                                        Parcourez nos albums et revivez les moments forts de nos activités en images haute qualité.
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/40">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="px-4 py-1.5 rounded-xl bg-secondary/50 border border-border/40 text-[10px] font-bold uppercase tracking-widest text-primary">
                                                {galeries.length} {galeries.length > 1 ? 'albums' : 'album'}
                                            </span>
                                            {totalPhotos > 0 && (
                                                <span className="px-4 py-1.5 rounded-xl bg-secondary/50 border border-border/40 text-[10px] font-bold uppercase tracking-widest text-primary">
                                                    {totalPhotos} {totalPhotos > 1 ? 'photos' : 'photo'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="size-12 shrink-0 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Videos Card */}
                        <Link href="/galerie/videos" className="group">
                            <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-10 md:p-12 hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:border-red-500/20 transition-all duration-700 relative overflow-hidden">
                                {/* Decorative subtle gradient in background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] group-hover:bg-red-500/10 transition-colors duration-700" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="size-16 rounded-2xl bg-secondary/80 flex items-center justify-center border border-border/40 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-colors duration-500 text-red-500 shadow-sm">
                                            <Play className="size-7 ml-1 fill-current" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">YouTube</span>
                                            <h3 className="font-serif text-3xl font-bold text-primary tracking-tight mt-1 group-hover:text-red-500 transition-colors duration-300">Nos Vidéos</h3>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed font-medium mb-10 flex-1">
                                        Regardez nos vidéos YouTube couvrant nos cérémonies, activités et moments importants de l'Amicale.
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/40">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="px-4 py-1.5 rounded-xl bg-red-500/5 border border-red-500/10 text-[10px] font-bold uppercase tracking-widest text-red-600">
                                                {videos.length} {videos.length > 1 ? 'vidéos' : 'vidéo'}
                                            </span>
                                        </div>
                                        <div className="size-12 shrink-0 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-red-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
