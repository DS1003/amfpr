import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { deleteActivity } from "@/lib/actions/activity"
import { DeleteButton } from "@/components/admin/delete-button"

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
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Gestion des articles</h1>
                    <p className="mt-2 text-muted-foreground">Publiez et modifiez les articles et récits de l'amicale.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-12">
                    <Link href="/admin/activites/nouveau">
                        <Plus className="mr-2 size-4" />
                        Ajouter un article
                    </Link>
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
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
            <div className="bg-white rounded-[2rem] border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse table-fixed min-w-[600px] md:min-w-full">
                        <thead>
                            <tr className="bg-secondary/20">
                                <th className="w-[50%] md:w-[40%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border">Article</th>
                                <th className="hidden lg:table-cell w-[20%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border">Catégorie</th>
                                <th className="hidden md:table-cell w-[15%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border">Date</th>
                                <th className="hidden sm:table-cell w-[15%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border text-center">Statut</th>
                                <th className="w-[15%] md:w-[10%] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary/40 border-b border-border text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {activities.length > 0 ? activities.map((activity) => (
                                <tr key={activity.id} className="hover:bg-secondary/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-primary text-sm line-clamp-2 group-hover:text-accent transition-colors">{activity.title}</div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2">
                                            <div className="hidden lg:block text-[10px] text-muted-foreground font-medium truncate max-w-full">{activity.description}</div>
                                            <div className="lg:hidden">
                                                <span className="text-[9px] font-black text-accent bg-accent/5 px-2 py-0.5 rounded uppercase tracking-widest border border-accent/10">
                                                    {activity.category}
                                                </span>
                                            </div>
                                            <div className="md:hidden text-[9px] text-muted-foreground/60 font-black uppercase tracking-widest">
                                                {new Date(activity.date).toLocaleDateString('fr-FR')}
                                            </div>
                                            <div className="sm:hidden">
                                                 <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${activity.published ? 'text-green-600' : 'text-gray-400'}`}>
                                                    <span className={`size-1.5 rounded-full ${activity.published ? 'bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.4)]' : 'bg-gray-400'}`} />
                                                    {activity.published ? 'Publié' : 'Brouillon'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden lg:table-cell px-6 py-5">
                                        <span className="px-3 py-1 bg-secondary text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-border/50">
                                            {activity.category}
                                        </span>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-5">
                                        <div className="text-[11px] font-bold text-primary/70">
                                            {new Date(activity.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell px-6 py-5 text-center">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${activity.published ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
                                            <span className={`size-1.5 rounded-full ${activity.published ? 'bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.4)]' : 'bg-gray-400'}`} />
                                            {activity.published ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-1.5 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <Button asChild variant="ghost" size="icon" className="rounded-xl hover:bg-white hover:text-accent hover:shadow-lg hover:shadow-primary/5 size-9 border border-transparent hover:border-border/40">
                                                <Link href={`/admin/activites/${activity.id}/modifier`}>
                                                    <Edit className="size-4" />
                                                </Link>
                                            </Button>
                                            <DeleteButton 
                                                id={activity.id} 
                                                action={deleteActivity}
                                                title="Supprimer l'article ?"
                                                description={`Êtes-vous sûr de vouloir supprimer "${activity.title}" ? Cette action est irréversible.`}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="text-muted-foreground">Aucun article trouvé.</div>
                                        <Button asChild variant="link" className="text-accent mt-2">
                                            <Link href="/admin/activites/nouveau">Ajouter votre premier article</Link>
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
