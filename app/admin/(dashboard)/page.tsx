import { Calendar, FileText, MessageSquare, Users, ArrowUpRight, Plus, Rocket, TrendingUp, Sparkles, Image as ImageIcon, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"

export default async function AdminDashboard() {
    const [articleCount, messageCount, eventCount, unreadMessages, recentActivities, upcomingEvents] = await Promise.all([
        prisma.activity.count(),
        prisma.contactMessage.count(),
        prisma.event.count(),
        prisma.contactMessage.count({ where: { read: false } }),
        prisma.activity.findMany({
            orderBy: { createdAt: 'desc' },
            take: 3
        }),
        prisma.event.findMany({
            where: { date: { gte: new Date() } },
            orderBy: { date: 'asc' },
            take: 3
        })
    ])

    return (
        <div className="space-y-12">
            {/* Header Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-black tracking-[0.3em] uppercase text-accent animate-pulse">Live</span>
                    </div>
                    <h1 className="font-serif text-4xl font-bold text-primary tracking-tight">Bonjour !</h1>
                    <p className="mt-2 text-muted-foreground font-medium">Voici ce qui se passe aujourd'hui à l'AFPR.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-6 h-12 font-bold shadow-lg shadow-primary/10 transition-all hover:scale-105">
                        <Link href="/admin/agenda/nouveau">
                            <Plus className="mr-2 size-4" />
                            Nouvel Événement
                        </Link>
                    </Button>
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl px-6 h-12 font-bold shadow-lg shadow-accent/10 transition-all hover:scale-105">
                        <Link href="/admin/activites/nouveau">
                            <Plus className="mr-2 size-4" />
                            Nouvel Article
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard icon={FileText} label="Articles" value={articleCount.toString()} growth="Total publiés" />
                <StatsCard icon={MessageSquare} label="Messages" value={messageCount.toString()} growth={`${unreadMessages} non lus`} color="accent" />
                <StatsCard icon={Calendar} label="Événements" value={eventCount.toString()} growth="Dans l'agenda" />
                <StatsCard icon={ImageIcon} label="Galeries" value="5" growth="Albums" />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main feed - Articles */}
                <section className="lg:col-span-12 xl:col-span-8 bg-white p-8 rounded-[2.5rem] border border-border/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                <Rocket className="size-5" />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-primary">Articles récents</h3>
                        </div>
                        <Link href="/admin/activites" className="text-sm font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5 group">
                            Voir toute la liste
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>

                    <div className="divide-y divide-border/40">
                        {recentActivities.length > 0 ? (
                            recentActivities.map((act) => (
                                <div
                                    key={act.id}
                                    className="py-6 flex flex-col sm:flex-row sm:items-center gap-5 transition-colors group"
                                >
                                    <div className="size-14 rounded-2xl bg-secondary/30 flex items-center justify-center shrink-0 border border-transparent group-hover:border-accent/20 transition-all group-hover:text-accent shadow-sm">
                                        <FileText className="size-6 transition-transform group-hover:scale-110" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-bold text-primary truncate group-hover:text-accent transition-colors">{act.title}</h4>
                                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                            <TrendingUp className="size-3 text-accent" />
                                            Créé le {new Date(act.createdAt).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                    <span className={`self-start sm:self-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${act.published ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {act.published ? 'Publié' : 'Brouillon'}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-muted-foreground">Aucun article pour le moment.</div>
                        )}
                    </div>
                </section>

                {/* Side Feed - Events */}
                <section className="lg:col-span-12 xl:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-2xl shadow-primary/5 relative overflow-hidden group">
                        <Sparkles className="absolute -top-4 -right-4 size-24 text-accent/5 group-hover:rotate-12 transition-transform duration-1000" />
                        <h3 className="font-serif font-bold text-xl mb-6 text-primary flex items-center gap-3">
                            Agenda Prochain
                            <span className="flex size-2 bg-accent rounded-full animate-ping" />
                        </h3>
                        <div className="space-y-4 relative z-10">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event) => (
                                    <div key={event.id} className="bg-secondary/20 p-4 rounded-2xl border border-border/40 hover:bg-white hover:border-accent/40 hover:shadow-lg transition-all group/card">
                                        <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 flex items-center gap-2">
                                            <Calendar className="size-3" />
                                            {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                        </p>
                                        <p className="text-sm font-bold text-primary line-clamp-1 group-hover/card:text-accent transition-colors">{event.title}</p>
                                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-bold uppercase">
                                            <span className="flex items-center gap-1"><Clock className="size-3" /> {new Date(event.date).getHours()}h</span>
                                            <span className="flex items-center gap-1 truncate"><MapPin className="size-3" /> {event.location || 'Dakar'}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center text-muted-foreground text-sm italic">Aucun événement à venir</div>
                            )}
                        </div>
                        <Button asChild variant="link" className="mt-6 p-0 h-auto text-primary/40 hover:text-accent font-bold group">
                            <Link href="/admin/agenda" className="flex items-center gap-2">
                                Gérer l'agenda complet <ArrowUpRight className="size-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Quick Stats Summary */}
                    <div className="bg-white p-8 rounded-3xl border border-border/60 shadow-sm space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground font-serif">État du Site</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-primary/60">Contenu publié</span>
                                <span className="text-accent">Dernière minute</span>
                            </div>
                            <div className="flex items-center gap-2 text-primary font-bold text-lg">
                                <span className="text-3xl tracking-tighter">{articleCount + eventCount}</span>
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Éléments actifs</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

function StatsCard({ icon: Icon, label, value, growth, color = "primary" }: { icon: any; label: string; value: string; growth: string; color?: "primary" | "accent" }) {
    return (
        <div
            className="bg-white p-6 rounded-[2.5rem] border border-border/60 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group"
        >
            <div className={`size-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${color === "accent" ? "bg-accent/10" : "bg-primary/5"}`}>
                <Icon className={`size-7 ${color === "accent" ? "text-accent" : "text-primary/70"}`} />
            </div>
            <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
                <div className="mt-2 flex items-baseline gap-4">
                    <span className="text-3xl font-black text-primary tracking-tighter">{value}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider ${color === 'accent' ? 'bg-accent/10 text-accent' : 'bg-emerald-50 text-emerald-600'}`}>{growth}</span>
                </div>
            </div>
        </div>
    )
}

