import { Calendar, FileText, MessageSquare, Users, ArrowUpRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminDashboard() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Vue d'ensemble</span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Tableau de bord</h1>
                    <p className="mt-2 text-muted-foreground">Bienvenue sur votre espace de gestion institutionnel.</p>
                </div>
                <div className="flex gap-4">
                    <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-6">
                        <Link href="/admin/activites/nouveau">
                            <Plus className="mr-2 size-4" />
                            Nouvelle activité
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard icon={Calendar} label="Activités" value="12" growth="+2 ce mois" />
                <StatsCard icon={FileText} label="Publications" value="8" growth="+1 cette semaine" />
                <StatsCard icon={MessageSquare} label="Messages" value="24" growth="3 non lus" color="accent" />
                <StatsCard icon={Users} label="Membres" value="156" growth="+12 ce trimestre" />
            </div>

            {/* Recent Activity Section (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h3 className="font-serif font-bold text-lg text-primary">Activités récentes</h3>
                        <Link href="/admin/activites" className="text-sm text-accent hover:underline flex items-center gap-1">
                            Voir tout <ArrowUpRight className="size-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 hover:bg-secondary/20 transition-colors flex items-center gap-4">
                                <div className="size-10 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
                                    <Calendar className="size-5 text-primary/60" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-primary truncate">Campagne de sensibilisation</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Mis à jour il y a 2 heures</p>
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent">Publié</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h3 className="font-serif font-bold text-lg text-primary">Derniers messages</h3>
                        <Link href="/admin/messages" className="text-sm text-accent hover:underline flex items-center gap-1">
                            Voir tout <ArrowUpRight className="size-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 hover:bg-secondary/20 transition-colors flex items-center gap-4">
                                <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                    JD
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-primary truncate">Demande de partenariat</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Par Jean Dupont • il y a 1 jour</p>
                                </div>
                                <div className="size-2 rounded-full bg-accent animate-pulse" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

function StatsCard({ icon: Icon, label, value, growth, color = "primary" }: { icon: any; label: string; value: string; growth: string; color?: "primary" | "accent" }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <div className={`size-12 rounded-xl flex items-center justify-center mb-6 ${color === "accent" ? "bg-accent/10" : "bg-primary/5"}`}>
                <Icon className={`size-6 ${color === "accent" ? "text-accent" : "text-primary/70"}`} />
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
                <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-primary">{value}</span>
                    <span className="text-xs font-semibold text-accent">{growth}</span>
                </div>
            </div>
        </div>
    )
}
