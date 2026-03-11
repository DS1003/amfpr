"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles } from "lucide-react"

// Confetti / petal particle
interface Particle {
    id: number
    x: number
    color: string
    delay: number
    duration: number
    size: number
    rotate: number
    type: "confetti" | "flower" | "heart" | "star"
}

const COLORS = [
    "#C8A951", // gold/accent
    "#0E3B2E", // primary green
    "#E8477D", // pink
    "#F4A7C1", // light pink
    "#FFD700", // yellow gold
    "#FF6B9D", // rose
    "#9B59B6", // purple
    "#E74C3C", // red (Senegal)
    "#F1C40F", // yellow (Senegal)
    "#27AE60", // green (Senegal)
]

function generateParticles(count: number): Particle[] {
    const types: Particle["type"][] = ["confetti", "flower", "heart", "star"]
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6,
        size: 8 + Math.random() * 14,
        rotate: Math.random() * 720 - 360,
        type: types[Math.floor(Math.random() * types.length)],
    }))
}

function ParticleShape({ type, color, size }: { type: Particle["type"]; color: string; size: number }) {
    switch (type) {
        case "heart":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            )
        case "flower":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="12" cy="6" r="3" opacity="0.7" />
                    <circle cx="12" cy="18" r="3" opacity="0.7" />
                    <circle cx="6" cy="12" r="3" opacity="0.7" />
                    <circle cx="18" cy="12" r="3" opacity="0.7" />
                </svg>
            )
        case "star":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
            )
        default:
            return (
                <div
                    style={{
                        width: size,
                        height: size * 0.6,
                        backgroundColor: color,
                        borderRadius: size * 0.15,
                    }}
                />
            )
    }
}

export function WomensDayCelebration() {
    const [isVisible, setIsVisible] = useState(false)
    const [showBanner, setShowBanner] = useState(true)
    const [particles, setParticles] = useState<Particle[]>([])
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Show celebration from March 7 to March 9, 2026
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() // 0-indexed, March = 2
        const day = now.getDate()

        const mobile = window.innerWidth < 768
        setIsMobile(mobile)

        if (year === 2026 && month === 2 && (day >= 7 && day <= 14)) {
            setIsVisible(true)
            // Fewer particles on mobile for performance and cleanliness
            setParticles(generateParticles(mobile ? 18 : 50))

            // Check if user dismissed it already this session
            const dismissed = sessionStorage.getItem("womens-day-dismissed")
            if (dismissed) {
                setShowBanner(false)
            }
        }
    }, [])

    const handleDismiss = useCallback(() => {
        setShowBanner(false)
        sessionStorage.setItem("womens-day-dismissed", "true")
    }, [])

    if (!isVisible) return null

    return (
        <>
            {/* Confetti Layer */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute"
                        style={{
                            left: `${p.x}%`,
                            ...(isMobile && { transform: "scale(0.65)" }),
                        }}
                        initial={{ y: -20, opacity: 1, rotate: 0 }}
                        animate={{
                            y: "110vh",
                            opacity: [1, 1, 0.8, 0],
                            rotate: p.rotate,
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 8 + 2,
                            ease: "linear",
                        }}
                    >
                        <motion.div
                            animate={{ x: [0, 15, -15, 10, -10, 0] }}
                            transition={{
                                duration: p.duration * 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <ParticleShape type={p.type} color={p.color} size={p.size} />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Celebration Banner */}
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        className="fixed top-0 left-0 right-0 z-[60] px-2 sm:px-4 pt-2 sm:pt-3 pb-2 sm:pb-3"
                    >
                        <div className="mx-auto max-w-4xl relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E8477D] via-[#F4A7C1] to-[#C8A951] shadow-2xl shadow-pink-500/20">
                            {/* Shimmer overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                            />

                            <div className="relative flex items-center justify-center gap-2 sm:gap-4 pl-4 pr-10 sm:px-6 py-2.5 sm:py-4">
                                {/* Sparkles hidden on mobile */}
                                <motion.div
                                    className="hidden sm:block shrink-0"
                                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                >
                                    <Sparkles className="size-6 text-white drop-shadow-md" />
                                </motion.div>

                                <div className="text-center min-w-0">
                                    <p className="text-white font-serif text-[13px] sm:text-lg md:text-xl font-bold tracking-wide drop-shadow-sm leading-snug uppercase">
                                        ✨ COMMÉMORATION de la Journée de la femme ✨
                                    </p>
                                    <p className="text-white/90 text-[10px] sm:text-xs md:text-sm mt-0.5 font-medium leading-tight">
                                        Samedi 14 Mars 2026 à 11h00 — Hôtel Terrou-Bi
                                    </p>
                                </div>

                                {/* Sparkles hidden on mobile */}
                                <motion.div
                                    className="hidden sm:block shrink-0"
                                    animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
                                >
                                    <Sparkles className="size-6 text-white drop-shadow-md" />
                                </motion.div>

                                <button
                                    onClick={handleDismiss}
                                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 sm:p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                                    aria-label="Fermer"
                                >
                                    <X className="size-3.5 sm:size-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
