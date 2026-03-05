'use client'

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Image as ImageIcon, Loader2, Save, X, Plus } from "lucide-react"
import { uploadImage } from "@/lib/actions/upload"
import { toast } from "sonner"

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface ArticleFormProps {
    initialData?: any
    action: (formData: FormData) => Promise<void>
}

export function ArticleForm({ initialData, action }: ArticleFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isUploadingBanner, setIsUploadingBanner] = useState(false)
    const [isUploadingContent, setIsUploadingContent] = useState(false)

    const [bannerUrl, setBannerUrl] = useState(initialData?.image || "")
    const [content, setContent] = useState(initialData?.content || "")
    const [published, setPublished] = useState(initialData?.published || false)

    const quillRef = useRef<any>(null)
    const bannerInputRef = useRef<HTMLInputElement>(null)
    const contentImageInputRef = useRef<HTMLInputElement>(null)

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploadingBanner(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const url = await uploadImage(formData)
            setBannerUrl(url)
            toast.success("Image de couverture téléchargée")
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors du téléchargement")
        } finally {
            setIsUploadingBanner(false)
        }
    }

    const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploadingContent(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const url = await uploadImage(formData)
            const quill = quillRef.current?.getEditor()
            if (quill) {
                const range = quill.getSelection()
                quill.insertEmbed(range?.index || 0, 'image', url)
            }
            toast.success("Image insérée avec succès")
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors de l'insertion de l'image")
        } finally {
            setIsUploadingContent(false)
            if (e.target) e.target.value = "" // Reset input
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.append('image', bannerUrl)
        formData.append('content', content)
        formData.append('published', published.toString())

        try {
            await action(formData)
            toast.success("Article enregistré")
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors de l'enregistrement")
        } finally {
            setIsLoading(false)
        }
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="rounded-2xl border-border shadow-sm overflow-hidden text-primary">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-bold text-primary">Titre de l'article</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={initialData?.title}
                                    placeholder="Agir ensemble pour un futur meilleur..."
                                    required
                                    className="rounded-xl border-border h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-bold text-primary">Description courte</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={initialData?.description}
                                    placeholder="Résumé bref pour la liste des activités..."
                                    required
                                    className="rounded-xl border-border resize-none"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-bold text-primary">Contenu de l'article</Label>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={contentImageInputRef}
                                            onChange={handleContentImageUpload}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={isUploadingContent}
                                            onClick={() => contentImageInputRef.current?.click()}
                                            className="rounded-lg text-[10px] h-8 gap-1.5 font-bold uppercase tracking-wider bg-accent/5 border-accent/20 text-accent hover:bg-accent hover:text-white transition-all"
                                        >
                                            {isUploadingContent ? (
                                                <Loader2 className="size-3 animate-spin" />
                                            ) : (
                                                <ImageIcon className="size-3" />
                                            )}
                                            Insérer une image
                                        </Button>
                                    </div>
                                </div>
                                <div className="prose-editor">
                                    {/* @ts-ignore */}
                                    <ReactQuill
                                        ref={quillRef}
                                        theme="snow"
                                        value={content}
                                        onChange={setContent}
                                        modules={modules}
                                        className="h-96 rounded-xl overflow-hidden"
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
                                <Label className="text-sm font-bold text-primary">Image de mise en avant</Label>
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={bannerInputRef}
                                        onChange={handleBannerUpload}
                                    />

                                    {bannerUrl ? (
                                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border group">
                                            <img src={bannerUrl} alt="Banner Preview" className="size-full object-cover" />
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
                                                    onClick={() => setBannerUrl("")}
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
                                                    <span className="text-xs font-bold uppercase tracking-wider">Télécharger l'image</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-bold text-primary">Catégorie</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    defaultValue={initialData?.category}
                                    placeholder="Action sociale, Santé, Education..."
                                    required
                                    className="rounded-xl border-border h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-sm font-bold text-primary">Date de l'événement</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                    required
                                    className="rounded-xl border-border h-12"
                                />
                            </div>

                            <div className="flex items-center justify-between p-2">
                                <Label htmlFor="published" className="text-sm font-bold text-primary">Publier l'article</Label>
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
            <style jsx global>{`
                .prose-editor .ql-container {
                    border-bottom-left-radius: 0.75rem;
                    border-bottom-right-radius: 0.75rem;
                    border-color: #E8E2D9;
                    font-family: inherit;
                    font-size: 1rem;
                }
                .prose-editor .ql-toolbar {
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                    border-color: #E8E2D9;
                    background: #FAF8F5;
                }
                .prose-editor .ql-editor {
                    min-height: 300px;
                    color: #1A1A1A;
                }
            `}</style>
        </form>
    )
}
