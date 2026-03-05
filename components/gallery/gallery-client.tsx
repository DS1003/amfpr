"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Photo {
    id: string
    url: string
    caption: string | null
}

interface Gallery {
    id: string
    title: string
    description: string | null
    photos: Photo[]
}

export function GalleryClient({ galeries }: { galeries: Gallery[] }) {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null)

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedGallery || selectedPhotoIndex === null) return

            if (e.key === 'ArrowRight') {
                setSelectedPhotoIndex((selectedPhotoIndex + 1) % selectedGallery.photos.length)
            } else if (e.key === 'ArrowLeft') {
                setSelectedPhotoIndex((selectedPhotoIndex - 1 + selectedGallery.photos.length) % selectedGallery.photos.length)
            } else if (e.key === 'Escape') {
                closeLightbox()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedGallery, selectedPhotoIndex])

    const openLightbox = (gallery: Gallery, index: number) => {
        setSelectedGallery(gallery)
        setSelectedPhotoIndex(index)
        document.body.style.overflow = 'hidden' // Prevent bg scrolling
    }

    const closeLightbox = () => {
        setSelectedGallery(null)
        setSelectedPhotoIndex(null)
        document.body.style.overflow = 'auto'
    }

    const nextPhoto = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedGallery && selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((selectedPhotoIndex + 1) % selectedGallery.photos.length)
        }
    }

    const prevPhoto = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedGallery && selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((selectedPhotoIndex - 1 + selectedGallery.photos.length) % selectedGallery.photos.length)
        }
    }

    if (galeries.length === 0) {
        return (
            <div className="py-24 text-center max-w-md mx-auto">
                <ImageIcon className="mx-auto size-16 text-muted-foreground/30 mb-6" />
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">Galerie en construction</h3>
                <p className="text-muted-foreground">Revenez bientôt pour découvrir nos dernières photos !</p>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-24">
                {galeries.map((gallery) => (
                    <div key={gallery.id} className="space-y-10">
                        {/* Gallery Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
                            <div>
                                <h2 className="font-serif text-4xl font-bold text-primary tracking-tight">{gallery.title}</h2>
                                {gallery.description && (
                                    <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed text-lg">{gallery.description}</p>
                                )}
                            </div>
                            <div className="shrink-0">
                                <Badge variant="outline" className="border-accent/30 text-accent px-4 py-2 font-bold uppercase tracking-widest bg-accent/5 rounded-full text-sm">
                                    {gallery.photos.length} photos
                                </Badge>
                            </div>
                        </div>

                        {/* Masonry Layout for Photos */}
                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-6 space-y-6">
                            {gallery.photos.length === 0 && (
                                <div className="col-span-full py-16 text-center text-muted-foreground bg-secondary/20 rounded-3xl border border-dashed border-border shadow-sm">
                                    <ImageIcon className="size-10 mx-auto opacity-40 mb-3" />
                                    <p>Aucune image dans cet album.</p>
                                </div>
                            )}

                            {gallery.photos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    layoutId={`gallery-image-${photo.id}`}
                                    className="relative rounded-2xl overflow-hidden shadow-sm group bg-muted border border-border/50 cursor-pointer break-inside-avoid"
                                    onClick={() => openLightbox(gallery, index)}
                                    // Stagger animation based on purely vertical view
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {/* Notice the use of 'w-full h-auto', critical for Masonry columns to flow correctly without strict aspect ratios */}
                                    <img
                                        src={photo.url}
                                        alt={photo.caption || gallery.title}
                                        loading="lazy"
                                        className="w-full h-auto object-cover transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:brightness-110"
                                    />

                                    {/* Hover overlay for premium zoom feeling */}
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Premium Lightbox Modal */}
            <AnimatePresence>
                {selectedGallery && selectedPhotoIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-50 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
                        >
                            <X className="size-6" />
                        </button>

                        {/* Navigation Buttons */}
                        {selectedGallery.photos.length > 1 && (
                            <>
                                <button
                                    onClick={prevPhoto}
                                    className="absolute left-4 md:left-10 z-50 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md"
                                >
                                    <ChevronLeft className="size-8" />
                                </button>
                                <button
                                    onClick={nextPhoto}
                                    className="absolute right-4 md:right-10 z-50 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md"
                                >
                                    <ChevronRight className="size-8" />
                                </button>
                            </>
                        )}

                        {/* Main Image Container */}
                        <div className="relative w-full h-full max-w-6xl max-h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedPhotoIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative flex items-center justify-center w-full h-full"
                                >
                                    <img
                                        src={selectedGallery.photos[selectedPhotoIndex].url}
                                        alt={selectedGallery.photos[selectedPhotoIndex].caption || "Image"}
                                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl drop-shadow-2xl ring-1 ring-white/10"
                                    />

                                    {/* Lightbox Caption / Counter positioned at bottom */}
                                    <div className="absolute bottom-[-40px] left-0 right-0 flex justify-between items-center text-white/70 text-sm font-medium">
                                        <span>
                                            {selectedGallery.photos[selectedPhotoIndex].caption || selectedGallery.title}
                                        </span>
                                        <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                            {selectedPhotoIndex + 1} / {selectedGallery.photos.length}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
