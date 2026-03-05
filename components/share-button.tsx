'use client'

import { Share2 } from "lucide-react"
import { toast } from "sonner"

interface ShareButtonProps {
    title: string
    text: string
    url?: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
    const handleShare = async () => {
        const shareUrl = url || window.location.href

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: shareUrl,
                })
            } catch (err) {
                console.error("Erreur lors du partage:", err)
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(shareUrl)
                toast.success("Lien copié dans le presse-papier !")
            } catch (err) {
                toast.error("Impossible de copier le lien.")
            }
        }
    }

    return (
        <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-primary text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
        >
            <Share2 className="size-4" />
            Partager l'article
        </button>
    )
}
