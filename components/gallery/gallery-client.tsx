"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowLeft, Calendar } from "lucide-react"
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
    coverImage: string | null
    photos: Photo[]
    createdAt: Date | string
}

// Variants for staggering animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const
        }
    }
}

export function GalleryClient({ galeries }: { galeries: Gallery[] }) {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
    const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null)
    const [lightboxGallery, setLightboxGallery] = useState<Gallery | null>(null)

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxGallery || selectedPhotoIndex === null) return

            if (e.key === 'ArrowRight') {
                setSelectedPhotoIndex((selectedPhotoIndex + 1) % lightboxGallery.photos.length)
            } else if (e.key === 'ArrowLeft') {
                setSelectedPhotoIndex((selectedPhotoIndex - 1 + lightboxGallery.photos.length) % lightboxGallery.photos.length)
            } else if (e.key === 'Escape') {
                closeLightbox()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [lightboxGallery, selectedPhotoIndex])

    const openLightbox = (gallery: Gallery, index: number) => {
        setLightboxGallery(gallery)
        setSelectedPhotoIndex(index)
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden'
        }
    }

    const closeLightbox = () => {
        setLightboxGallery(null)
        setSelectedPhotoIndex(null)
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'auto'
        }
    }

    const nextPhoto = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (lightboxGallery && selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((selectedPhotoIndex + 1) % lightboxGallery.photos.length)
        }
    }

    const prevPhoto = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (lightboxGallery && selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((selectedPhotoIndex - 1 + lightboxGallery.photos.length) % lightboxGallery.photos.length)
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

    const activeGallery = galeries.find(g => g.id === activeGalleryId)

    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                {!activeGalleryId ? (
                    <motion.div
                        key="album-list"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
                    >
                        {galeries.map((gallery) => (
                            <motion.div
                                key={gallery.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer flex flex-col h-full bg-white rounded-[2.5rem] border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:border-accent/20"
                                onClick={() => setActiveGalleryId(gallery.id)}
                            >
                                {/* Image Box */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
                                    {gallery.coverImage || gallery.photos[0]?.url ? (
                                        <img
                                            src={gallery.coverImage || gallery.photos[0]?.url}
                                            alt={gallery.title}
                                            className="w-full h-full object-cover transition-all duration-[1s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-secondary">
                                            <ImageIcon className="size-16 text-muted-foreground/20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 ring-1 ring-inset ring-black/5" />
                                </div>

                                {/* Content Box */}
                                <div className="p-8 md:p-10 flex flex-col flex-1 relative bg-white">
                                    {/* Decorative subtle gradient */}
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px] group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none" />

                                    <div className="relative z-10 flex flex-col flex-1 h-full">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="size-3.5 text-accent" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                                                    {new Date(gallery.createdAt).toLocaleDateString('fr-FR', {
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="h-px flex-1 bg-border/40" />
                                            <span className="px-3 py-1.5 rounded-xl bg-secondary/80 border border-border/40 text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                                {gallery.photos.length} {gallery.photos.length > 1 ? 'photos' : 'photo'}
                                            </span>
                                        </div>

                                        <h3 className="font-serif text-2xl font-bold text-primary mb-4 leading-tight tracking-tight group-hover:text-accent transition-colors duration-300">
                                            {gallery.title}
                                        </h3>

                                        <p className="text-muted-foreground leading-relaxed font-medium mb-8 line-clamp-2">
                                            {gallery.description || "Découvrez cet album en images."}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-border/40 mt-auto">
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors duration-300">
                                                Explorer l&apos;album
                                            </span>
                                            <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm">
                                                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="album-detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-12"
                    >
                        {/* Back Button and Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12">
                            <div className="space-y-6">
                                <button
                                    onClick={() => setActiveGalleryId(null)}
                                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors group"
                                >
                                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                                    Retour aux albums
                                </button>
                                <div>
                                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary tracking-tight" id="gallery-title">
                                        {activeGallery?.title}
                                    </h2>
                                    {activeGallery?.description && (
                                        <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed text-lg italic">
                                            {activeGallery.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className="border-accent/30 text-accent px-5 py-2.5 font-bold uppercase tracking-widest bg-accent/5 rounded-full text-xs">
                                    {activeGallery?.photos.length} photos
                                </Badge>
                                <div className="text-muted-foreground/60 text-xs font-bold uppercase tracking-wider">
                                    {activeGallery && new Date(activeGallery.createdAt).toLocaleDateString('fr-FR', {
                                        month: 'long',
                                        year: 'numeric',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Masonry Layout for Photos */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                            {activeGallery?.photos.length === 0 && (
                                <div className="col-span-full py-24 text-center text-muted-foreground bg-secondary/10 rounded-[32px] border border-dashed border-border/60">
                                    <ImageIcon className="size-12 mx-auto opacity-30 mb-4" />
                                    <p className="text-lg font-medium">Aucune image dans cet album.</p>
                                </div>
                            )}

                            {activeGallery?.photos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    layoutId={`gallery-image-${photo.id}`}
                                    className="relative rounded-3xl overflow-hidden shadow-sm group bg-muted border border-border/40 cursor-pointer break-inside-avoid"
                                    onClick={() => openLightbox(activeGallery, index)}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <img
                                        src={photo.url}
                                        alt={photo.caption || activeGallery.title}
                                        loading="lazy"
                                        className="w-full h-auto object-cover transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:brightness-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Lightbox Modal */}
            <AnimatePresence>
                {lightboxGallery && selectedPhotoIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-50 p-3 bg-white/10 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-md"
                        >
                            <X className="size-6" />
                        </button>

                        {lightboxGallery.photos.length > 1 && (
                            <>
                                <button
                                    onClick={prevPhoto}
                                    className="absolute left-4 md:left-10 z-50 p-4 bg-white/5 text-white rounded-full hover:bg-accent hover:text-accent-foreground hover:scale-110 transition-all backdrop-blur-md"
                                >
                                    <ChevronLeft className="size-8" />
                                </button>
                                <button
                                    onClick={nextPhoto}
                                    className="absolute right-4 md:right-10 z-50 p-4 bg-white/5 text-white rounded-full hover:bg-accent hover:text-accent-foreground hover:scale-110 transition-all backdrop-blur-md"
                                >
                                    <ChevronRight className="size-8" />
                                </button>
                            </>
                        )}

                        <div className="relative w-full h-full max-w-7xl max-h-full flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedPhotoIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative flex flex-col items-center justify-center w-full h-[90vh]"
                                >
                                    <img
                                        src={lightboxGallery.photos[selectedPhotoIndex].url}
                                        alt={lightboxGallery.photos[selectedPhotoIndex].caption || "Image"}
                                        className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                                    />

                                    <div className="absolute bottom-[-10px] left-0 right-0 py-8 flex justify-between items-center text-white/50 text-xs font-bold uppercase tracking-widest">
                                        <span className="max-w-[70%] line-clamp-1 italic">
                                            {lightboxGallery.photos[selectedPhotoIndex].caption || lightboxGallery.title}
                                        </span>
                                        <span className="bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                            {selectedPhotoIndex + 1} / {lightboxGallery.photos.length}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
