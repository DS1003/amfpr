'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save, Play, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface VideoFormProps {
    initialData?: {
        id: string
        title: string
        description?: string | null
        youtubeUrl: string
        thumbnail?: string | null
        published: boolean
    }
    action: (formData: FormData) => Promise<void>
}

function extractYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
}

export function VideoForm({ initialData, action }: VideoFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [published, setPublished] = useState(initialData?.published || false)
    const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || "")
    const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "")

    const videoId = extractYoutubeId(youtubeUrl)

    // Auto-generate thumbnail from YouTube URL
    const handleUrlChange = (url: string) => {
        setYoutubeUrl(url)
        const id = extractYoutubeId(url)
        if (id) {
            setThumbnail(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.set('youtubeUrl', youtubeUrl)
        formData.set('thumbnail', thumbnail)
        formData.set('published', published.toString())

        try {
            await action(formData)
            toast.success("Vidéo enregistrée")
            router.push('/admin/galeries/videos')
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error("Erreur d'enregistrement")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden text-primary">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-bold text-primary">Titre de la vidéo</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={initialData?.title}
                                    placeholder="Cérémonie officielle 2026..."
                                    required
                                    className="rounded-xl border-border h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-bold text-primary">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={initialData?.description || ""}
                                    placeholder="Description de la vidéo..."
                                    className="rounded-xl border-border resize-none"
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="youtubeUrl" className="text-sm font-bold text-primary">Lien YouTube</Label>
                                <div className="relative">
                                    <Input
                                        id="youtubeUrl"
                                        value={youtubeUrl}
                                        onChange={(e) => handleUrlChange(e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        required
                                        className="rounded-xl border-border h-12 pr-12"
                                    />
                                    {videoId && (
                                        <a
                                            href={youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-accent hover:text-primary transition-colors"
                                        >
                                            <ExternalLink className="size-4" />
                                        </a>
                                    )}
                                </div>
                                {!videoId && youtubeUrl.length > 5 && (
                                    <p className="text-xs text-red-500 mt-1">URL YouTube invalide. Exemple : https://www.youtube.com/watch?v=dQw4w9WgXcQ</p>
                                )}
                            </div>

                            {/* YouTube Preview */}
                            {videoId && (
                                <div className="space-y-3 pt-4 border-t border-border">
                                    <Label className="text-sm font-bold text-primary flex items-center gap-2">
                                        <Play className="size-4 text-accent" />
                                        Aperçu de la vidéo
                                    </Label>
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-black shadow-lg">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title="YouTube video preview"
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden text-primary">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary">Miniature</Label>
                                {thumbnail ? (
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                                        <img src={thumbnail} alt="Thumbnail preview" className="size-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                        <Play className="size-8 text-border" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Miniature auto depuis YouTube</span>
                                    </div>
                                )}
                                <p className="text-[11px] text-muted-foreground">La miniature est générée automatiquement à partir du lien YouTube.</p>
                            </div>

                            <div className="flex items-center justify-between p-2">
                                <Label htmlFor="published" className="text-sm font-bold text-primary">Rendre public</Label>
                                <Switch
                                    id="published"
                                    checked={published}
                                    onCheckedChange={setPublished}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            disabled={isLoading || !videoId}
                            className="flex-1 bg-primary hover:bg-primary/90 h-12 rounded-xl text-sm font-bold uppercase tracking-wider gap-2 shadow-lg shadow-primary/10 text-white"
                        >
                            {isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Save className="size-4" />
                            )}
                            Enregistrer
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            className="bg-white hover:bg-secondary border-border h-12 rounded-xl text-sm font-bold uppercase tracking-wider gap-2 text-primary"
                        >
                            Annuler
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
