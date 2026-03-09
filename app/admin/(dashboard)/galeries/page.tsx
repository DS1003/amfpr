import Link from "next/link"
import { Plus, Image as ImageIcon, Video, Calendar, MoreVertical, Edit, Trash2 } from "lucide-react"
import prisma from "@/lib/prisma"
import { deleteGallery } from "@/lib/actions/gallery"
import { Badge } from "@/components/ui/badge"

export default async function AdminGaleriesPage() {
    const galeries = await prisma.gallery.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { photos: true } } }
    })

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Gestion Média</span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Galeries Photos</h1>
                    <p className="mt-2 text-muted-foreground">Gérez les albums photos de l'Amicale.</p>
                </div>
                <Link
                    href="/admin/galeries/creer"
                    className="inline-flex items-center justify-center bg-accent text-accent-foreground px-6 py-3 font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                    <Plus className="size-4 mr-2" />
                    Nouvel Album
                </Link>
            </div>

            {/* Navigation tabs */}
            <div className="flex gap-2 border-b border-border pb-0">
                <Link
                    href="/admin/galeries"
                    className="px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-accent border-b-2 border-accent"
                >
                    Albums Photos
                </Link>
                <Link
                    href="/admin/galeries/videos"
                    className="px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors border-b-2 border-transparent"
                >
                    Vidéos YouTube
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {galeries.map((gallery) => (
                    <div key={gallery.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg hover:border-accent/20 transition-all duration-300">
                        <div className="aspect-video relative bg-muted overflow-hidden">
                            {gallery.coverImage ? (
                                <img
                                    src={gallery.coverImage}
                                    alt={gallery.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground gap-2">
                                    <ImageIcon className="size-6 opacity-50" />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 z-10">
                                <Badge variant={gallery.published ? "default" : "secondary"} className={gallery.published ? "bg-accent text-accent-foreground" : ""}>
                                    {gallery.published ? "Publié" : "Brouillon"}
                                </Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60" />
                        </div>
                        <div className="p-6">
                            <h3 className="font-serif text-xl font-bold text-primary line-clamp-1 mb-2">
                                {gallery.title}
                            </h3>
                            <div className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground mb-4">
                                <span className="flex items-center gap-1.5">
                                    <ImageIcon className="size-3.5" />
                                    {gallery._count.photos} photos
                                </span>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                                <Link
                                    href={`/admin/galeries/${gallery.id}/modifier`}
                                    className="p-2 text-primary/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                                >
                                    <Edit className="size-4" />
                                </Link>
                                <form action={async () => {
                                    'use server'
                                    await deleteGallery(gallery.id)
                                }}>
                                    <button
                                        type="submit"
                                        className="p-2 text-primary/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}

                {galeries.length === 0 && (
                    <div className="col-span-full py-16 text-center border-2 border-dashed border-border rounded-2xl">
                        <ImageIcon className="size-10 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="font-serif text-xl font-bold text-primary mb-2">Aucune galerie</h3>
                        <p className="text-muted-foreground">Commencez par créer votre premier album photo.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
