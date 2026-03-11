import { Plus, Search, Filter, Calendar, MapPin, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { DeleteEventButton } from "@/components/admin/delete-event-button"

interface AdminAgendaProps {
    searchParams: Promise<{
        q?: string
    }>
}

export default async function AdminAgenda({ searchParams }: AdminAgendaProps) {
    const { q } = await searchParams
    const query = q || ""

    const events = await prisma.event.findMany({
        where: query ? {
            OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { location: { contains: query, mode: 'insensitive' } },
            ]
        } : {},
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
                    <p className="mt-2 text-muted-foreground font-medium">Gérez les événements et rendez-vous à venir de l'amicale.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-12 text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/10">
                    <Link href="/admin/agenda/nouveau">
                        <Plus className="mr-2 size-4" />
                        Ajouter un événement
                    </Link>
                </Button>
            </div>

            {/* Filters & Search - Real Search Handler */}
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center text-primary">
                <form className="relative flex-1 w-full" action="/admin/agenda" method="GET">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="Rechercher un événement par titre, lieu ou contenu..."
                        className="w-full pl-11 pr-4 py-3 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0 placeholder:text-muted-foreground/60"
                    />
                </form>
                <Button variant="outline" className="rounded-2xl border-border h-12 px-6 text-xs font-bold uppercase tracking-widest text-primary hover:bg-secondary/40 whitespace-nowrap">
                    <Filter className="mr-2 size-4" />
                    Filtre Avancé
                </Button>
            </div>

            {/* Events Table */}
            <div className="bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/20">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border">Événement</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border">Date & Lieu</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border">Catégorie</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border">Statut</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {events.length > 0 ? events.map((event) => (
                                <tr key={event.id} className="hover:bg-secondary/10 transition-colors group">
                                    <td className="px-6 py-6">
                                        <div className="font-bold text-primary group-hover:text-accent transition-colors">{event.title}</div>
                                        <div className="text-xs text-muted-foreground truncate max-w-[280px] mt-1">{event.description}</div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col gap-1.5 text-xs">
                                            <span className="flex items-center gap-2 text-primary font-bold">
                                                <Calendar className="size-3.5 text-accent" />
                                                {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                            <span className="flex items-center gap-2 text-muted-foreground font-medium">
                                                <MapPin className="size-3.5 text-accent/60" />
                                                {event.location || 'Dakar'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="px-4 py-1.5 bg-secondary text-primary text-[9px] font-black rounded-full uppercase tracking-widest border border-border/50">
                                            {event.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${event.published ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                                            <span className={`size-1.5 rounded-full ${event.published ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-400'}`} />
                                            {event.published ? 'En Ligne' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button asChild variant="ghost" size="icon" className="rounded-xl hover:bg-secondary hover:text-primary size-9 shadow-sm hover:shadow-md transition-all">
                                                <Link href={`/admin/agenda/${event.id}/modifier`}>
                                                    <Edit className="size-4.5" />
                                                </Link>
                                            </Button>
                                            <DeleteEventButton id={event.id} title={event.title} />
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="size-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                                            <Calendar className="size-10 text-muted-foreground/30" />
                                        </div>
                                        <div className="text-xl font-serif font-bold text-primary">Aucun résultat trouvé</div>
                                        <p className="text-muted-foreground mt-2 max-w-xs mx-auto">Essayez d'ajuster votre recherche ou ajoutez un nouvel événement.</p>
                                        <Button asChild variant="link" className="text-accent mt-6 font-bold uppercase tracking-widest text-[10px]">
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
