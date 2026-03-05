import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { deleteActivity } from "@/lib/actions/activity"

export default async function AdminActivites() {
    const activities = await prisma.activity.findMany({
        orderBy: { date: "desc" },
    })

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Contenu</span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Gestion des activités</h1>
                    <p className="mt-2 text-muted-foreground">Publiez et modifiez les actions de l'amicale.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-12">
                    <Link href="/admin/activites/nouveau">
                        <Plus className="mr-2 size-4" />
                        Ajouter une activité
                    </Link>
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Rechercher une activité..."
                        className="w-full pl-10 pr-4 py-2 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-xl text-sm transition-all focus:ring-0"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="rounded-xl flex-1 md:flex-none border-border">
                        <Filter className="mr-2 size-4" />
                        Filtre
                    </Button>
                </div>
            </div>

            {/* Activities Table */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/20">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border">Titre</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border">Catégorie</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border">Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border">Statut</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/60 border-b border-border text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {activities.length > 0 ? activities.map((activity) => (
                                <tr key={activity.id} className="hover:bg-secondary/10 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-primary">{activity.title}</div>
                                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">{activity.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-secondary text-primary text-[11px] font-bold rounded-full uppercase tracking-tight">
                                            {activity.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {new Date(activity.date).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${activity.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            <span className={`size-1.5 rounded-full ${activity.published ? 'bg-green-600' : 'bg-gray-400'}`} />
                                            {activity.published ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button asChild variant="ghost" size="icon" className="rounded-lg hover:bg-secondary hover:text-primary size-8">
                                                <Link href={`/admin/activites/${activity.id}/modifier`}>
                                                    <Edit className="size-4" />
                                                </Link>
                                            </Button>
                                            <form action={async () => {
                                                'use server'
                                                await deleteActivity(activity.id)
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
                                        <div className="text-muted-foreground">Aucune activité trouvée.</div>
                                        <Button asChild variant="link" className="text-accent mt-2">
                                            <Link href="/admin/activites/nouveau">Ajouter votre première activité</Link>
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
