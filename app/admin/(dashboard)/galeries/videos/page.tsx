import Link from "next/link"
import { Plus, Play, Calendar, Edit, Trash2, ExternalLink } from "lucide-react"
import prisma from "@/lib/prisma"
import { deleteVideo } from "@/lib/actions/video"
import { Badge } from "@/components/ui/badge"
import { DeleteButton } from "@/components/admin/delete-button"

function extractYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
}

export default async function AdminVideosPage() {
    const videos = await prisma.video.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Gestion Média</span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Vidéos YouTube</h1>
                    <p className="mt-2 text-muted-foreground">Gérez les vidéos YouTube de l'Amicale.</p>
                </div>
                <Link
                    href="/admin/galeries/videos/creer"
                    className="inline-flex items-center justify-center bg-accent text-accent-foreground px-6 py-3 font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                    <Plus className="size-4 mr-2" />
                    Nouvelle Vidéo
                </Link>
            </div>

            {/* Navigation tabs */}
            <div className="flex gap-2 border-b border-border pb-0">
                <Link
                    href="/admin/galeries"
                    className="px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors border-b-2 border-transparent"
                >
                    Albums Photos
                </Link>
                <Link
                    href="/admin/galeries/videos"
                    className="px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-accent border-b-2 border-accent"
                >
                    Vidéos YouTube
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => {
                    const videoId = extractYoutubeId(video.youtubeUrl)
                    const thumbnailUrl = video.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null)

                    return (
                        <div key={video.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg hover:border-accent/20 transition-all duration-300">
                            <div className="aspect-video relative bg-muted overflow-hidden">
                                {thumbnailUrl ? (
                                    <img
                                        src={thumbnailUrl}
                                        alt={video.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground gap-2">
                                        <Play className="size-6 opacity-50" />
                                    </div>
                                )}
                                {/* Play overlay */}
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="size-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
                                        <Play className="size-6 text-white fill-white ml-0.5" />
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 z-10">
                                    <Badge variant={video.published ? "default" : "secondary"} className={video.published ? "bg-accent text-accent-foreground" : ""}>
                                        {video.published ? "Publié" : "Brouillon"}
                                    </Badge>
                                </div>
                                <div className="absolute top-4 left-4 z-10">
                                    <Badge variant="secondary" className="bg-red-600 text-white border-0">
                                        <Play className="size-2.5 mr-1 fill-white" />
                                        YouTube
                                    </Badge>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-xl font-bold text-primary line-clamp-1 mb-2">
                                    {video.title}
                                </h3>
                                {video.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{video.description}</p>
                                )}

                                <div className="flex items-center justify-between gap-2 pt-4 border-t border-border">
                                    <a
                                        href={video.youtubeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <ExternalLink className="size-3" />
                                        YouTube
                                    </a>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/galeries/videos/${video.id}/modifier`}
                                            className="p-2 text-primary/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                                        >
                                            <Edit className="size-4" />
                                        </Link>
                                        <DeleteButton 
                                            id={video.id}
                                            action={deleteVideo}
                                            title="Supprimer la vidéo ?"
                                            description={`Voulez-vous vraiment supprimer "${video.title}" ?`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {videos.length === 0 && (
                    <div className="col-span-full py-16 text-center border-2 border-dashed border-border rounded-2xl">
                        <Play className="size-10 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="font-serif text-xl font-bold text-primary mb-2">Aucune vidéo</h3>
                        <p className="text-muted-foreground">Ajoutez votre première vidéo YouTube.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
