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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Photos Card */}
                        <Link href="/galerie/photos" className="group">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-10 md:p-12 h-full min-h-[380px] flex flex-col justify-between shadow-xl border border-primary/20 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-[0.04]" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                }} />

                                {/* Decorative Circle */}
                                <div className="absolute -top-10 -right-10 size-40 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all duration-700" />
                                <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-white/5 blur-2xl" />

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-16 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/30 group-hover:bg-accent/30 transition-colors duration-300">
                                            <Camera className="size-8 text-accent" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Collection</span>
                                            <h3 className="font-serif text-3xl font-bold text-white tracking-tight">Nos Photos</h3>
                                        </div>
                                    </div>

                                    <p className="text-white/70 leading-relaxed max-w-sm">
                                        Parcourez nos albums photos et revivez les moments forts de nos activités en images haute qualité.
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                                            {galeries.length} album{galeries.length > 1 ? 's' : ''} • {totalPhotos} photo{totalPhotos > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-8">
                                    <span className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-accent group-hover:gap-5 transition-all duration-300">
                                        Voir les photos
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>

                                {/* Preview thumbnails strip */}
                                {galeries.length > 0 && (
                                    <div className="absolute bottom-0 right-0 flex opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                                        {galeries.slice(0, 3).map((g) => (
                                            g.coverImage && (
                                                <div key={g.id} className="w-24 h-32 overflow-hidden">
                                                    <img src={g.coverImage} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>

                        {/* Videos Card */}
                        <Link href="/galerie/videos" className="group">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-10 md:p-12 h-full min-h-[380px] flex flex-col justify-between shadow-xl border border-white/5 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-[0.03]" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 0 0-30 15 15 0 0 0 0 30z' opacity='.5'/%3E%3C/g%3E%3C/svg%3E")`,
                                }} />

                                {/* Decorative Circle */}
                                <div className="absolute -top-10 -right-10 size-40 rounded-full bg-red-500/10 blur-2xl group-hover:bg-red-500/20 transition-all duration-700" />
                                <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-white/5 blur-2xl" />

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-16 rounded-2xl bg-red-500/20 backdrop-blur-sm flex items-center justify-center border border-red-500/30 group-hover:bg-red-500/30 transition-colors duration-300">
                                            <Play className="size-8 text-red-400 fill-red-400" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">YouTube</span>
                                            <h3 className="font-serif text-3xl font-bold text-white tracking-tight">Nos Vidéos</h3>
                                        </div>
                                    </div>

                                    <p className="text-white/60 leading-relaxed max-w-sm">
                                        Regardez nos vidéos YouTube couvrant nos cérémonies, activités et moments importants de l'Amicale.
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                                            {videos.length} vidéo{videos.length > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-8">
                                    <span className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-red-400 group-hover:gap-5 transition-all duration-300">
                                        Voir les vidéos
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
