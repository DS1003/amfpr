import { Calendar, FileText, MessageSquare, Plus, Rocket, Sparkles, Image as ImageIcon, MapPin, Clock, ArrowRight, BookOpen, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { DashboardCharts } from "@/components/admin/dashboard-charts"

export default async function AdminDashboard() {
    const [
        articleCount, 
        messageCount, 
        eventCount, 
        galleryCount, 
        videoCount,
        publicationCount,
        unreadMessages, 
        recentActivities, 
        upcomingEvents,
        allActivities
    ] = await Promise.all([
        prisma.activity.count(),
        prisma.contactMessage.count(),
        prisma.event.count(),
        prisma.gallery.count(),
        prisma.video.count(),
        prisma.publication.count(),
        prisma.contactMessage.count({ where: { read: false } }),
        prisma.activity.findMany({
            orderBy: { createdAt: 'desc' },
            take: 4
        }),
        prisma.event.findMany({
            where: { date: { gte: new Date() } },
            orderBy: { date: 'asc' },
            take: 3
        }),
        prisma.activity.findMany({
            select: { createdAt: true },
            where: {
                createdAt: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
                }
            }
        })
    ])

    // Generate real monthly statistics from database
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']
    const last7Months = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setMonth(d.getMonth() - (6 - i))
        return {
            month: d.getMonth(),
            year: d.getFullYear(),
            name: months[d.getMonth()]
        }
    })

    const articleStats = last7Months.map(m => ({
        name: m.name,
        value: allActivities.filter(a => 
            a.createdAt.getMonth() === m.month && 
            a.createdAt.getFullYear() === m.year
        ).length
    }))

    const distribution = [
        { name: 'Articles', value: articleCount },
        { name: 'Événements', value: eventCount },
        { name: 'Galeries', value: galleryCount },
        { name: 'Vidéos', value: videoCount },
        { name: 'Publications', value: publicationCount }
    ]

    return (
        <div className="space-y-12 pb-12">
            {/* Header section with refined design */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="size-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(230,163,79,0.5)]" />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Vue d'ensemble en temps réel</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
                        Système de Gestion <br />
                        <span className="text-accent underline decoration-primary/10 underline-offset-8 italic">Institutionnelle</span>
                    </h1>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button asChild className="bg-white border border-border/60 hover:border-accent/50 text-primary rounded-2xl px-8 h-14 font-bold shadow-sm transition-all hover:scale-105 group">
                        <Link href="/admin/agenda/nouveau">
                            <Plus className="mr-2 size-4 text-accent group-hover:rotate-90 transition-transform duration-300" />
                            Agenda
                        </Link>
                    </Button>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 h-14 font-bold shadow-[0_20px_40px_rgba(27,49,41,0.15)] transition-all hover:scale-105 active:scale-95">
                        <Link href="/admin/activites/nouveau">
                            <Plus className="mr-2 size-4 text-accent" />
                            Nouvel Article
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid - Premium look */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard icon={FileText} label="Articles" value={articleCount.toString()} growth="Contenu publié" />
                <StatsCard icon={MessageSquare} label="Messages" value={messageCount.toString()} growth={`${unreadMessages} non lus`} color="accent" />
                <StatsCard icon={Calendar} label="Événements" value={eventCount.toString()} growth="Agenda planifié" />
                <StatsCard icon={ImageIcon} label="Galeries" value={galleryCount.toString()} growth="Albums photos" />
            </div>

            {/* Charts Section */}
            <DashboardCharts articleStats={articleStats} distribution={distribution.filter(d => d.value > 0)} />

            {/* Content & Agenda Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Articles Feed */}
                <section className="lg:col-span-12 xl:col-span-12 2xl:col-span-8">
                    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-border/60 shadow-sm overflow-hidden flex flex-col h-full">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/5">
                                    <Rocket className="size-6" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-2xl text-primary">Dernières Publications</h3>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/50 mt-1">Articles & Actualités</p>
                                </div>
                            </div>
                            <Button asChild variant="ghost" className="rounded-xl h-10 px-4 text-xs font-bold text-primary/60 hover:text-accent group">
                                <Link href="/admin/activites" className="flex items-center gap-2">
                                    Voir tout
                                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentActivities.length > 0 ? (
                                recentActivities.map((act) => (
                                    <Link 
                                        key={act.id} 
                                        href={`/admin/activites/${act.id}/modifier`}
                                        className="group p-5 rounded-3xl bg-secondary/20 border border-transparent hover:border-accent/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="size-12 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-border/40 shadow-sm group-hover:scale-110 transition-transform">
                                                <FileText className="size-5 text-primary/40 group-hover:text-accent" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${act.published ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                                        {act.published ? 'Publié' : 'Brouillon'}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground/40 font-bold uppercase">{new Date(act.createdAt).toLocaleDateString('fr-FR')}</span>
                                                </div>
                                                <h4 className="text-sm font-bold text-primary truncate group-hover:text-accent transition-colors tracking-tight">{act.title}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-2 py-12 text-center text-muted-foreground text-sm font-medium italic">Aucun article pour le moment.</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Side Feed - Events */}
                <section className="lg:col-span-12 xl:col-span-12 2xl:col-span-4 flex flex-col">
                    <div className="bg-primary p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/20 relative overflow-hidden group flex-1 h-full min-h-[450px]">
                        <Sparkles className="absolute -top-10 -right-10 size-48 text-white/5 rotate-12 group-hover:rotate-[30deg] transition-transform duration-[2s]" />
                        
                        <div className="relative z-10">
                            <h3 className="font-serif font-bold text-2xl mb-8 text-white flex items-center gap-3">
                                Agenda Imminent
                                <span className="flex size-2 bg-accent rounded-full animate-ping" />
                            </h3>
                            
                            <div className="space-y-5">
                                {upcomingEvents.length > 0 ? (
                                    upcomingEvents.map((event) => (
                                        <Link key={event.id} href={`/admin/agenda/${event.id}/modifier`} className="block">
                                            <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 hover:bg-white hover:border-accent hover:shadow-2xl transition-all duration-700 group/item">
                                                <div className="flex items-start gap-4">
                                                    <div className="size-10 rounded-2xl bg-accent flex flex-col items-center justify-center shrink-0 shadow-lg shadow-accent/20 group-hover/item:scale-110 transition-transform">
                                                        <span className="text-white text-xs font-black leading-tight">{new Date(event.date).getDate()}</span>
                                                        <span className="text-white text-[8px] font-black uppercase tracking-widest opacity-80">{new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-white group-hover/item:text-primary transition-colors line-clamp-1">{event.title}</p>
                                                        <div className="flex items-center gap-3 mt-2 text-[9px] text-white/40 group-hover/item:text-primary/40 font-black uppercase tracking-widest">
                                                            <span className="flex items-center gap-1"><Clock className="size-3 text-accent" /> {new Date(event.date).getHours()}h00</span>
                                                            <span className="flex items-center gap-1 truncate"><MapPin className="size-3 text-accent" /> {event.location || 'Dakar'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="py-12 flex flex-col items-center justify-center text-white/20">
                                        <Calendar className="size-12 mb-4 opacity-10" />
                                        <p className="text-sm font-bold uppercase tracking-widest">Agenda Vide</p>
                                    </div>
                                )}
                            </div>

                            <Button asChild variant="link" className="mt-10 p-0 h-auto text-white/40 hover:text-accent font-black uppercase tracking-widest text-[10px] group">
                                <Link href="/admin/agenda" className="flex items-center gap-2">
                                    Gérer tout l'agenda <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
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
            className="bg-white p-7 rounded-[2.5rem] border border-border/60 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 p-4 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-125 opacity-[0.03] group-hover:opacity-[0.08]`}>
                <Icon className={`size-32 ${color === "accent" ? "text-accent" : "text-primary"}`} />
            </div>
            
            <div className={`size-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 shadow-sm relative z-10 ${color === "accent" ? "bg-accent text-white" : "bg-primary text-white"}`}>
                <Icon className="size-6" />
            </div>
            
            <div className="relative z-10">
                <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">{label}</p>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="text-4xl font-black text-primary tracking-tighter">{value}</span>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${color === 'accent' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-secondary/80 text-primary border border-primary/5'}`}>
                        {growth}
                    </span>
                </div>
            </div>
        </div>
    )
}

