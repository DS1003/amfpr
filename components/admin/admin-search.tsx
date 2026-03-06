"use client"

import { Search, Loader2, X, ArrowRight, FileText, Image as ImageIcon, Calendar } from "lucide-react"
import { useState, useEffect, useRef, useTransition } from "react"
import { globalSearch } from "@/lib/actions/search"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AdminSearch() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setIsOpen(true)
            }
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const handleSearch = async (val: string) => {
        setQuery(val)
        if (val.length < 2) {
            setResults([])
            return
        }

        startTransition(async () => {
            const res = await globalSearch(val)
            setResults(res)
        })
    }

    const handleSelect = (href: string) => {
        setIsOpen(false)
        setQuery("")
        setResults([])
        router.push(href)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 px-4 h-12 rounded-2xl bg-secondary/30 hover:bg-secondary border border-transparent hover:border-border transition-all w-full max-w-md group"
            >
                <Search className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-muted-foreground mr-auto">Recherche globale...</span>
                <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 bg-white/50 px-2 py-0.5 rounded-lg border border-border">
                    Ctrl K
                </kbd>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-md flex items-start justify-center pt-[10vh] p-6 animate-in fade-in duration-300">
                    <div onClick={() => setIsOpen(false)} className="absolute inset-0" />

                    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center p-6 border-b border-border">
                            <Search className="size-5 text-accent mr-4" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Chercher un article, un média ou un message..."
                                className="flex-1 bg-transparent text-lg font-medium text-primary placeholder:text-muted-foreground outline-hidden"
                            />
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-xl transition-colors">
                                <X className="size-5 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
                            {isPending && query.length >= 2 && (
                                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-3">
                                    <Loader2 className="size-8 animate-spin text-accent" />
                                    <p className="text-sm font-medium">Recherche en cours...</p>
                                </div>
                            )}

                            {!isPending && results.length > 0 && results.map((res: any) => (
                                <button
                                    key={res.type + res.id}
                                    onClick={() => handleSelect(res.href)}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-secondary group transition-all text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                                            {res.type === 'Article' && <FileText className="size-5" />}
                                            {res.type === 'Galerie' && <ImageIcon className="size-5" />}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-primary">{res.title}</h4>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mt-1">{res.type}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}

                            {!isPending && query.length >= 2 && results.length === 0 && (
                                <div className="py-12 text-center text-muted-foreground">
                                    <p className="text-sm font-medium">Aucun résultat trouvé pour "{query}"</p>
                                </div>
                            )}

                            {query.length < 2 && (
                                <div className="py-12 text-center text-muted-foreground flex flex-col items-center gap-4">
                                    <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-primary/20">
                                        <Search className="size-8" />
                                    </div>
                                    <p className="text-sm font-medium">Tapez au moins 2 caractères pour commencer la recherche.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-secondary/30 border-t border-border flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2"><kbd className="bg-white border rounded px-1.5 py-0.5">Enter</kbd> Sélectionner</div>
                                <div className="flex items-center gap-2"><kbd className="bg-white border rounded px-1.5 py-0.5">Esc</kbd> Fermer</div>
                            </div>
                            <span>AFPR Administration</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
