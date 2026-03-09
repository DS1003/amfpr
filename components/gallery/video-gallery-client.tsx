"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Calendar } from "lucide-react"

interface Video {
    id: string
    title: string
    description: string | null
    youtubeUrl: string
    thumbnail: string | null
    createdAt: string
}

function extractYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
}

export function VideoGalleryClient({ videos }: { videos: Video[] }) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

    const openModal = (video: Video) => {
        setSelectedVideo(video)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setSelectedVideo(null)
        document.body.style.overflow = 'auto'
    }

    if (videos.length === 0) {
        return (
            <div className="py-24 text-center max-w-md mx-auto">
                <Play className="mx-auto size-16 text-muted-foreground/30 mb-6" />
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">Vidéos en préparation</h3>
                <p className="text-muted-foreground">Revenez bientôt pour découvrir nos dernières vidéos !</p>
            </div>
        )
    }

    return (
        <>
            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => {
                    const videoId = extractYoutubeId(video.youtubeUrl)
                    const thumbnailUrl = video.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null)

                    return (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group cursor-pointer"
                            onClick={() => openModal(video)}
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md border border-border/50 bg-muted">
                                {thumbnailUrl && (
                                    <img
                                        src={thumbnailUrl}
                                        alt={video.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:brightness-110"
                                    />
                                )}

                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.15 }}
                                        className="size-16 md:size-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl group-hover:bg-red-600/90 group-hover:border-red-600 transition-all duration-500"
                                    >
                                        <Play className="size-7 md:size-8 text-white fill-white ml-1 drop-shadow-lg" />
                                    </motion.div>
                                </div>

                                {/* YouTube badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                                        <svg viewBox="0 0 24 24" className="size-3 fill-white">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                                            <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff" />
                                        </svg>
                                        YouTube
                                    </span>
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="mt-5 space-y-2">
                                <h3 className="font-serif text-xl font-bold text-primary tracking-tight line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                    {video.title}
                                </h3>
                                {video.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {video.description}
                                    </p>
                                )}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-medium pt-1">
                                    <Calendar className="size-3.5" />
                                    {new Date(video.createdAt).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (() => {
                    const videoId = extractYoutubeId(selectedVideo.youtubeUrl)
                    return (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
                            onClick={closeModal}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 z-50 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
                            >
                                <X className="size-6" />
                            </button>

                            {/* Video Container */}
                            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                                            title={selectedVideo.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="mt-6 pb-2">
                                        <h3 className="text-white font-serif text-2xl font-bold">{selectedVideo.title}</h3>
                                        {selectedVideo.description && (
                                            <p className="text-white/60 mt-2 text-sm leading-relaxed max-w-3xl">{selectedVideo.description}</p>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                })()}
            </AnimatePresence>
        </>
    )
}
