import { Plus, Search, Filter, FileText, Download, Trash, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { deletePublication } from "@/lib/actions/publication"
import { DeleteButton } from "@/components/admin/delete-button"

export default async function AdminPublications() {
    const publications = await prisma.publication.findMany({
        orderBy: { date: "desc" },
    })

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Ressources</span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Gestion des publications</h1>
                    <p className="mt-2 text-muted-foreground">Gérez les documents, rapports et publications officielles.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-12">
                    <Link href="/admin/publications/nouveau">
                        <Plus className="mr-2 size-4" />
                        Ajouter un document
                    </Link>
                </Button>
            </div>

            {/* Stats Mini */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="size-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary/70">
                        <FileText className="size-5" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-primary">{publications.length}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Total Documents</div>
                    </div>
                </div>
            </div>

            {/* Grid of Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publications.length > 0 ? publications.map((doc) => (
                    <div key={doc.id} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="size-12 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-accent/10 transition-colors">
                                <FileText className="size-6" />
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-secondary">
                                    <Edit className="size-4" />
                                </Button>
                                <DeleteButton 
                                    id={doc.id}
                                    action={deletePublication}
                                    title="Supprimer la publication ?"
                                    description={`Voulez-vous vraiment supprimer "${doc.title}" ?`}
                                />
                            </div>
                        </div>

                        <h3 className="font-serif font-bold text-lg text-primary mb-2 line-clamp-1">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{doc.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-2.5 py-1 rounded-md">
                                {doc.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {new Date(doc.date).toLocaleDateString('fr-FR')}
                            </span>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-border text-center">
                        <div className="mx-auto size-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                            <Plus className="size-8 text-primary/30" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-primary">Aucune publication</h3>
                        <p className="text-sm text-muted-foreground mt-2">Commencez par ajouter un rapport ou document officiel.</p>
                        <Button asChild variant="outline" className="mt-6 rounded-xl border-border px-8">
                            <Link href="/admin/publications/nouveau">Ajouter</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
