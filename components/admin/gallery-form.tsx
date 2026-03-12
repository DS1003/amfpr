'use client'

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Image as ImageIcon, Loader2, Save, X, Plus, UploadCloud } from "lucide-react"
import { uploadImage } from "@/lib/actions/upload"
import { toast } from "sonner"

interface GalleryFormProps {
    initialData?: {
        id: string
        title: string
        description?: string | null
        coverImage?: string | null
        published: boolean
        createdAt?: Date | string
        photos: { id: string; url: string; caption?: string | null }[]
    }
    action: (formData: FormData) => Promise<void>
}

export function GalleryForm({ initialData, action }: GalleryFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isUploadingBanner, setIsUploadingBanner] = useState(false)
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

    const [coverImage, setCoverImage] = useState(initialData?.coverImage || "")
    const [photos, setPhotos] = useState<string[]>(initialData?.photos?.map(p => p.url) || [])
    const [published, setPublished] = useState(initialData?.published || false)

    const bannerInputRef = useRef<HTMLInputElement>(null)
    const photoInputRef = useRef<HTMLInputElement>(null)

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploadingBanner(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const url = await uploadImage(formData)
            setCoverImage(url)
            toast.success("Image de couverture ajoutée")
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors de l'envoi")
        } finally {
            setIsUploadingBanner(false)
        }
    }

    const handlePhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploadingPhoto(true)

        try {
            // Optional: Upload sequentially or parallel 
            // We'll process them in sequence for simplicity
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData()
                formData.append('file', files[i])
                const url = await uploadImage(formData)
                setPhotos(prev => [...prev, url])
            }
            toast.success("Photos ajoutées à la galerie")
        } catch (error) {
            console.error(error)
            toast.error("Certaines images n'ont pas pu être ajoutées")
        } finally {
            setIsUploadingPhoto(false)
            if (e.target) e.target.value = "" // Reset
        }
    }

    const unattachPhoto = (urlToRemove: string) => {
        setPhotos(photos.filter(url => url !== urlToRemove))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.append('coverImage', coverImage)
        formData.append('photos', JSON.stringify(photos))
        formData.append('published', published.toString())

        try {
            await action(formData)
            toast.success("Galerie enregistrée")
            router.push('/admin/galeries')
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
                                <Label htmlFor="title" className="text-sm font-bold text-primary">Titre de la galerie</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={initialData?.title}
                                    placeholder="Visite de l'orphelinat national..."
                                    required
                                    className="rounded-xl border-border h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-bold text-primary">Description courte</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={initialData?.description || ""}
                                    placeholder="Résumé bref de la galerie..."
                                    className="rounded-xl border-border resize-none"
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="createdAt" className="text-sm font-bold text-primary">Date de l'événement (Date de création de l'album)</Label>
                                <Input
                                    id="createdAt"
                                    name="createdAt"
                                    type="date"
                                    defaultValue={
                                        initialData?.createdAt
                                            ? new Date(initialData.createdAt).toISOString().split('T')[0]
                                            : new Date().toISOString().split('T')[0]
                                    }
                                    required
                                    className="rounded-xl border-border h-12"
                                />
                            </div>

                            <div className="space-y-4 pt-6 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-bold text-primary">Photos de l'album ({photos.length})</Label>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            ref={photoInputRef}
                                            onChange={handlePhotosUpload}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={isUploadingPhoto}
                                            onClick={() => photoInputRef.current?.click()}
                                            className="rounded-lg text-[10px] h-8 gap-1.5 font-bold uppercase tracking-wider bg-accent/5 border-accent/20 text-accent hover:bg-accent hover:text-white transition-all"
                                        >
                                            {isUploadingPhoto ? (
                                                <Loader2 className="size-3 animate-spin" />
                                            ) : (
                                                <UploadCloud className="size-3" />
                                            )}
                                            Ajouter des photos
                                        </Button>
                                    </div>
                                </div>

                                {photos.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-secondary/30 p-4 rounded-xl border border-dashed border-border">
                                        {photos.map((url, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-lg border border-border overflow-hidden group">
                                                <img src={url} alt={`Gallery ${idx}`} className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => unattachPhoto(url)}
                                                        className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                                                    >
                                                        <X className="size-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-secondary/30 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground p-12">
                                        <ImageIcon className="size-12 opacity-20" />
                                        <p className="text-sm font-medium">Cet album est vide</p>
                                        <p className="text-xs">Ajoutez des photos pour enrichir cet album.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden text-primary">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary">Image de couverture</Label>
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={bannerInputRef}
                                        onChange={handleBannerUpload}
                                    />

                                    {coverImage ? (
                                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border group">
                                            <img src={coverImage} alt="Cover preview" className="size-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => bannerInputRef.current?.click()}
                                                    className="bg-white text-primary p-2 rounded-full hover:scale-110 transition-transform"
                                                >
                                                    <ImageIcon className="size-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setCoverImage("")}
                                                    className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={isUploadingBanner}
                                            onClick={() => bannerInputRef.current?.click()}
                                            className="w-full aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-secondary transition-colors text-muted-foreground"
                                        >
                                            {isUploadingBanner ? (
                                                <Loader2 className="size-8 animate-spin text-accent" />
                                            ) : (
                                                <>
                                                    <Plus className="size-8 text-border" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Télécharger la couverture</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
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
                            disabled={isLoading}
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
