'use client'

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Image as ImageIcon, Loader2, Save, X, Plus, MapPin, Calendar, Tag } from "lucide-react"
import { uploadImage } from "@/lib/actions/upload"
import { toast } from "sonner"

interface EventFormProps {
    initialData?: {
        id: string
        title: string
        description: string
        date: Date
        location?: string | null
        image?: string | null
        category: string
        published: boolean
    }
    action: (formData: FormData) => Promise<void>
}

export function EventForm({ initialData, action }: EventFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(initialData?.image || "")
    const [published, setPublished] = useState(initialData?.published || false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const url = await uploadImage(formData)
            setImageUrl(url)
            toast.success("Image téléchargée avec succès")
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors du téléchargement")
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.append('image', imageUrl)
        formData.append('published', published.toString())

        try {
            await action(formData)
            toast.success("Événement enregistré")
            router.push('/admin/agenda')
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors de l'enregistrement")
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
                                <Label htmlFor="title" className="text-sm font-bold text-primary">Titre de l'événement</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={initialData?.title}
                                    placeholder="Visite officielle, Atelier social..."
                                    required
                                    className="rounded-xl border-border h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-bold text-primary">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={initialData?.description}
                                    placeholder="Détails de l'événement..."
                                    required
                                    className="rounded-xl border-border resize-none"
                                    rows={6}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-sm font-bold text-primary flex items-center gap-2">
                                        <MapPin className="size-4 text-accent" />
                                        Lieu
                                    </Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        defaultValue={initialData?.location || ""}
                                        placeholder="Dakar, Sénégal / Palais de la République"
                                        className="rounded-xl border-border h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-bold text-primary flex items-center gap-2">
                                        <Tag className="size-4 text-accent" />
                                        Catégorie
                                    </Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        defaultValue={initialData?.category}
                                        placeholder="Social, Culturel, Officiel..."
                                        required
                                        className="rounded-xl border-border h-12"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden text-primary">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary">Image d'illustration</Label>
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                    />

                                    {imageUrl ? (
                                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border group">
                                            <img src={imageUrl} alt="Event Preview" className="size-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="bg-white text-primary p-2 rounded-full hover:scale-110 transition-transform"
                                                >
                                                    <ImageIcon className="size-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setImageUrl("")}
                                                    className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={isUploading}
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full aspect-[4/3] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-secondary transition-colors text-muted-foreground"
                                        >
                                            {isUploading ? (
                                                <Loader2 className="size-8 animate-spin text-accent" />
                                            ) : (
                                                <>
                                                    <Plus className="size-8 text-border" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Télécharger l'image</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-sm font-bold text-primary flex items-center gap-2">
                                    <Calendar className="size-4 text-accent" />
                                    Date de l'événement
                                </Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="datetime-local"
                                    defaultValue={initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : ""}
                                    required
                                    className="rounded-xl border-border h-12"
                                />
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
