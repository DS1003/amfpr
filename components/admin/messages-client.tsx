"use client"

import { MessageSquare, Mail, User, Calendar, Trash2, CheckCircle2, ChevronRight, Search, Inbox, Clock } from "lucide-react"
import { useState, useTransition } from "react"
import { markAsRead, deleteMessage } from "@/lib/actions/message"
import { toast } from "sonner"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export function MessagesClient({ initialMessages }: { initialMessages: any[] }) {
    const [messages, setMessages] = useState(initialMessages)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [searchTerm, setSearchTerm] = useState("")

    const selectedMessage = messages.find(m => m.id === selectedId)

    const handleMarkAsRead = async (id: string) => {
        const msg = messages.find(m => m.id === id)
        if (msg && !msg.read) {
            startTransition(async () => {
                await markAsRead(id)
                setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
            })
        }
        setSelectedId(id)
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (window.confirm("Voulez-vous vraiment supprimer ce message ?")) {
            startTransition(async () => {
                await deleteMessage(id)
                setMessages(prev => prev.filter(m => m.id !== id))
                if (selectedId === id) setSelectedId(null)
                toast.success("Message supprimé")
            })
        }
    }

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const unreadCount = messages.filter(m => !m.read).length

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] gap-8">
            {/* Header Area */}
            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent">Messages</span>
                    </div>
                    <h1 className="font-serif text-4xl font-bold text-primary flex items-center gap-4">
                        Boîte de réception
                        {unreadCount > 0 && (
                            <span className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-bold">
                                {unreadCount} Nouveau{unreadCount > 1 ? 'x' : ''}
                            </span>
                        )}
                    </h1>
                </div>

                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Chercher par nom, sujet, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 h-12 bg-white/50 border border-border/50 rounded-2xl text-sm focus:bg-white focus:border-accent transition-all outline-hidden"
                    />
                </div>
            </div>

            <div className="flex flex-1 gap-8 overflow-hidden">
                {/* List View */}
                <div className="w-full lg:w-[400px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {filteredMessages.length > 0 ? filteredMessages.map((msg) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={msg.id}
                                onClick={() => handleMarkAsRead(msg.id)}
                                className={`group p-6 rounded-3xl border transition-all cursor-pointer relative ${selectedId === msg.id
                                        ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
                                        : "bg-white border-border/50 hover:border-accent hover:shadow-lg"
                                    }`}
                            >
                                {!msg.read && (
                                    <div className="absolute top-6 right-6 size-2 bg-accent rounded-full animate-pulse z-10" />
                                )}

                                <div className="flex items-start justify-between mb-3">
                                    <div className={`text-[10px] font-black uppercase tracking-widest ${selectedId === msg.id ? "text-white/60" : "text-accent"}`}>
                                        {format(new Date(msg.createdAt), "dd MMM yyyy", { locale: fr })}
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => handleDelete(msg.id, e)}
                                            className={`p-1.5 rounded-lg transition-colors ${selectedId === msg.id ? "hover:bg-white/10 text-white/50" : "hover:bg-red-50 text-red-500/50 hover:text-red-500"}`}
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className={`font-bold text-base truncate mb-1 ${selectedId === msg.id ? "text-white" : "text-primary"}`}>
                                    {msg.subject}
                                </h3>
                                <div className={`text-sm truncate font-medium ${selectedId === msg.id ? "text-white/70" : "text-muted-foreground"}`}>
                                    {msg.name}
                                </div>
                            </motion.div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                                <Inbox className="size-12 opacity-20" />
                                <p className="text-sm font-medium italic">Aucun message trouvé.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content View */}
                <div className="hidden lg:flex flex-1 bg-white rounded-[2.5rem] border border-border/50 overflow-hidden shadow-sm shadow-primary/5 flex flex-col">
                    <AnimatePresence mode="wait">
                        {selectedMessage ? (
                            <motion.div
                                key={selectedMessage.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col h-full"
                            >
                                {/* Message Header */}
                                <div className="p-10 border-b border-border/50 flex items-start justify-between bg-secondary/10">
                                    <div className="flex gap-6">
                                        <div className="size-16 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center text-accent">
                                            <User className="size-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-serif font-bold text-primary mb-2 leading-tight">
                                                {selectedMessage.subject}
                                            </h2>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <Mail className="size-4 text-accent" />
                                                    {selectedMessage.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <Calendar className="size-4 text-accent" />
                                                    {format(new Date(selectedMessage.createdAt), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" className="rounded-xl border-border/60 hover:bg-red-50 hover:text-red-500 transition-colors h-11" onClick={(e) => handleDelete(selectedMessage.id, e as any)}>
                                            <Trash2 className="size-4 mr-2" />
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>

                                {/* Message Body */}
                                <div className="flex-1 p-10 overflow-y-auto leading-relaxed text-primary/80 whitespace-pre-line text-lg font-medium selection:bg-accent selection:text-white">
                                    {selectedMessage.message}
                                </div>

                                {/* Quick Controls (Optional Footer) */}
                                <div className="p-8 border-t border-border/50 bg-secondary/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <Clock className="size-3.5" />
                                        Identifiant: {selectedId}
                                    </div>
                                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`} className="flex items-center gap-2 font-bold text-accent hover:text-accent/80 transition-colors text-sm">
                                        Répondre par email <ChevronRight className="size-4" />
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-10 p-20 text-center animate-in fade-in duration-700">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150" />
                                    <div className="relative size-32 rounded-[2rem] bg-secondary/50 flex items-center justify-center text-primary/10">
                                        <MessageSquare className="size-16" />
                                    </div>
                                </div>
                                <div className="max-w-xs space-y-3">
                                    <h3 className="font-serif font-bold text-2xl text-primary">Prêt à répondre ?</h3>
                                    <p className="text-sm font-medium leading-relaxed">
                                        Sélectionnez une demande dans la liste à gauche pour voir les détails et y répondre.
                                    </p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
