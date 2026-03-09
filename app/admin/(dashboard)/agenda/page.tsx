import { Plus, Search, Filter, Trash, Edit, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { deleteEvent } from "@/lib/actions/event"

export default async function AdminAgenda() {
    const events = await prisma.event.findMany({
        orderBy: { date: "desc" },
    })

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Planification</span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Gestion de l'Agenda</h1>
                    <p className="mt-2 text-muted-foreground">Gérez les événements et rendez-vous à venir de l'amicale.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-12 text-white">
                    <Link href="/admin/agenda/nouveau">
                        <Plus className="mr-2 size-4" />
                        Ajouter un événement
                    </Link>
                </Button>
            </div>

            {/* Filters & Search - Placeholder for functionality */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center text-primary">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Rechercher un événement..."
                        className="w-full pl-10 pr-4 py-2 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-xl text-sm transition-all focus:ring-0"
                    />
                </div>
                <Button variant="outline" className="rounded-xl border-border">
                    <Filter className="mr-2 size-4" />
                    Filtre
                </Button>
            </div>

            {/* Events Table */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/20">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border">Événement</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border">Date & Lieu</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border">Catégorie</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border">Statut</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {events.length > 0 ? events.map((event) => (
                                <tr key={event.id} className="hover:bg-secondary/10 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-primary">{event.title}</div>
                                        <div className="text-xs text-muted-foreground truncate max-w-[250px]">{event.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-xs">
                                            <span className="flex items-center gap-1.5 text-primary/80">
                                                <Calendar className="size-3 text-accent" />
                                                {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            {event.location && (
                                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                                    <MapPin className="size-3 text-accent/60" />
                                                    {event.location}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-secondary text-primary text-[10px] font-bold rounded-full uppercase tracking-tight">
                                            {event.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${event.published ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                                            <span className={`size-1.5 rounded-full ${event.published ? 'bg-green-500' : 'bg-gray-400'}`} />
                                            {event.published ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button asChild variant="ghost" size="icon" className="rounded-lg hover:bg-secondary hover:text-primary size-8">
                                                <Link href={`/admin/agenda/${event.id}/modifier`}>
                                                    <Edit className="size-4" />
                                                </Link>
                                            </Button>
                                            <form action={async () => {
                                                'use server'
                                                await deleteEvent(event.id)
                                            }}>
                                                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-red-50 hover:text-red-600 size-8 text-red-500">
                                                    <Trash className="size-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="text-muted-foreground">Aucun événement dans l'agenda.</div>
                                        <Button asChild variant="link" className="text-accent mt-2">
                                            <Link href="/admin/agenda/nouveau">Ajouter votre premier événement</Link>
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
