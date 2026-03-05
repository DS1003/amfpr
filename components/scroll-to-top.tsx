"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 300px
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <button
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-8 right-8 z-50 p-4 rounded-full bg-accent text-accent-foreground shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group",
                isVisible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-12 pointer-events-none"
            )}
            aria-label="Retour en haut"
        >
            <ArrowUp className="size-6 transition-transform duration-300 group-hover:-translate-y-1" />

            {/* Tooltip-like text on hover (optional, but adds premium feel) */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                Haut de page
            </span>
        </button>
    )
}
