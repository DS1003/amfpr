import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight, Tag, Search, X } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Agenda & Événements | AFPR",
    description: "Découvrez l'agenda des activités et événements de l'Amicale des Femmes de la Présidence de la République.",
}

interface AgendaPageProps {
    searchParams: Promise<{
        q?: string
        category?: string
    }>
}

export default async function AgendaPage({ searchParams }: AgendaPageProps) {
    const { q, category } = await searchParams
    const now = new Date()
    const query = q || ""
    const categoryQuery = category || ""

    const events = await prisma.event.findMany({
        where: {
            published: true,
            AND: [
                query ? {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { description: { contains: query, mode: 'insensitive' } },
                        { location: { contains: query, mode: 'insensitive' } },
                    ]
                } : {},
                categoryQuery ? { category: categoryQuery } : {}
            ]
        },
        orderBy: { date: 'asc' },
    })

    // Get unique categories for filter
    const allEvents = await prisma.event.findMany({ where: { published: true } })
    const categories = Array.from(new Set(allEvents.map(e => e.category)))

    // Separate upcoming and past events
    const upcomingEvents = events.filter(e => new Date(e.date) >= now)
    const pastEvents = events.filter(e => new Date(e.date) < now).reverse()

    return (
        <main className="bg-[#fafafa]">
            <PageHeader
                badge="Calendrier"
                title="Agenda de l'Amicale"
                description="Retrouvez l'ensemble de nos événements, cérémonies et actions sociales planifiées."
                className="pt-16 pb-8 lg:pt-20 lg:pb-10"
            />

            {/* Special 8 Mars Hero */}
            <SectionWrapper className="pb-8">
                <MotionWrapper>
                    <div className="relative aspect-[21/7] min-h-[300px] rounded-[2.5rem] overflow-hidden group shadow-2xl bg-primary/5 border border-border/40">
                        <Image
                            src="/images/8-mars.jpg"
                            alt="8 Mars - Amicale des Femmes"
                            fill
                            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-accent text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-accent/20">
                                    Événement Spécial
                                </span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                Commémoration du 8 Mars
                            </h2>
                            <p className="text-white/80 text-sm max-w-xl line-clamp-1 font-medium">
                                Bonne fête à toutes les femmes de la Présidence de la République du Sénégal.
                            </p>
                        </div>
                    </div>
                </MotionWrapper>
            </SectionWrapper>

            {/* Filter & Search Section */}
            <SectionWrapper className="py-0 relative z-20">
                <div className="max-w-4xl mx-auto bg-white p-5 sm:p-6 rounded-[2rem] shadow-xl shadow-primary/5 border border-border/40 -mt-24">
                    <form action="/agenda" method="GET" className="space-y-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-accent" />
                            <input
                                type="text"
                                name="q"
                                defaultValue={query}
                                placeholder="Rechercher un événement..."
                                className="w-full pl-12 pr-4 py-3 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-base transition-all focus:ring-4 focus:ring-accent/10 outline-none placeholder:text-muted-foreground/60"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2">Filtrer par :</span>
                            <Link
                                href="/agenda"
                                className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${!categoryQuery ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary/50 text-primary/60 hover:bg-secondary'}`}
                            >
                                Tous
                            </Link>
                            {categories.map(cat => (
                                <Link
                                    key={cat}
                                    href={`/agenda?category=${cat}${query ? `&q=${query}` : ''}`}
                                    className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${categoryQuery === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary/50 text-primary/60 hover:bg-secondary'}`}
                                >
                                    {cat}
                                </Link>
                            ))}
                            {(query || categoryQuery) && (
                                <Link href="/agenda" className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors">
                                    <X className="size-3" />
                                    Effacer
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </SectionWrapper>


            {/* Upcoming Events List */}
            <SectionWrapper className="pt-2 pb-12">
                <MotionWrapper>
                    <div className="flex items-center justify-between mb-6 px-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="h-px w-8 bg-accent" />
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
                                    {query || categoryQuery ? 'Résultats' : 'Planification'}
                                </span>
                            </div>
                            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">
                                {query || categoryQuery ? 'Recherche' : 'Prochainement'}
                            </h2>
                        </div>
                        <div className="text-right hidden md:block">
                            <span className="text-3xl font-serif text-accent/20 font-bold block">{upcomingEvents.length}</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Événements trouvés</span>
                        </div>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 gap-8 sm:px-4">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event, index) => (
                            <MotionWrapper key={event.id} delay={index * 100}>
                                <div className="group flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                                    {/* Event Date Column */}
                                    <div className="flex flex-row lg:flex-col items-center lg:items-start shrink-0 min-w-[120px] gap-4 lg:gap-0">
                                        <span className="text-5xl font-serif font-bold text-accent group-hover:scale-105 transition-transform duration-500 tracking-tighter">
                                            {String(new Date(event.date).getDate()).padStart(2, '0')}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] lg:text-xs uppercase font-bold tracking-[0.2em] text-primary">
                                                {new Date(event.date).toLocaleDateString('fr-FR', { month: 'long' })}
                                            </span>
                                            <span className="text-[10px] text-accent font-bold opacity-40">
                                                {new Date(event.date).getFullYear()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Event Card */}
                                    <div className="flex-1 w-full bg-white rounded-[2rem] border border-border/40 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:border-accent/10 transition-all duration-700">
                                        {event.image && (
                                            <div className="relative w-full md:w-48 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm bg-black/5">
                                                <Image src={event.image} alt="" fill className="object-cover opacity-30 blur-xl scale-125 saturate-150" />
                                                <Image src={event.image} alt={event.title} fill className="object-contain p-1 group-hover:scale-110 transition-transform duration-1000" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className="flex items-center gap-2 px-3 py-1 bg-secondary/50 text-primary text-[9px] font-black rounded-full uppercase tracking-widest border border-border/40">
                                                    <Tag className="size-3 text-accent" />
                                                    {event.category}
                                                </span>
                                                {event.location && (
                                                    <span className="flex items-center gap-2 text-muted-foreground text-[9px] uppercase font-bold tracking-widest">
                                                        <MapPin className="size-3 text-accent/60" />
                                                        {event.location}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-2 text-muted-foreground text-[9px] uppercase font-bold tracking-widest">
                                                    <Clock className="size-3 text-accent/60" />
                                                    {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-500 leading-tight">
                                                {event.title}
                                            </h3>
                                            <p className="text-muted-foreground/80 leading-relaxed text-sm line-clamp-2 mb-6 font-medium">
                                                {event.description}
                                            </p>
                                            <div className="flex items-center gap-4 pt-5 border-t border-border/40">
                                                <Button asChild className="bg-primary text-white hover:bg-accent rounded-xl h-9 px-4 text-[9px] font-black uppercase tracking-widest group/btn transition-all">
                                                    <Link href="/contact" className="flex items-center gap-2">
                                                        Participer
                                                        <ArrowRight className="size-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" className="h-9 rounded-xl px-4 text-muted-foreground text-[9px] font-bold uppercase tracking-widest hover:bg-secondary/50 transition-colors">
                                                    Partager
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MotionWrapper>
                        ))
                    ) : (
                        <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-border/60">
                            <Calendar className="size-16 text-muted-foreground/20 mx-auto mb-6" />
                            <h3 className="font-serif text-2xl font-bold text-primary/60">Aucun événement ne correspond</h3>
                            <p className="text-muted-foreground/60 mt-2">Réessayez avec d'autres critères ou effacez les filtres.</p>
                            <Button asChild variant="link" className="mt-6 text-accent font-black uppercase tracking-widest text-[10px]">
                                <Link href="/agenda">Voir tout l'agenda</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </SectionWrapper>

            {/* Past Events Section */}
            {pastEvents.length > 0 && (
                <SectionWrapper variant="muted" className="py-16">
                    <MotionWrapper>
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="h-px w-8 bg-muted-foreground/40" />
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground">Mémoire</span>
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-primary/60 tracking-tight">Événements passés</h2>
                        </div>
                    </MotionWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-70 grayscale-[0.5] hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                        {pastEvents.slice(0, 6).map((event, index) => (
                            <MotionWrapper key={event.id} delay={index * 50}>
                                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-[2rem] border border-border/40 group">
                                    <span className="text-xs font-bold text-muted-foreground/60 mb-2 block uppercase tracking-widest">
                                        {new Date(event.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <h4 className="font-bold text-primary mb-3 line-clamp-1 group-hover:text-accent transition-colors">
                                        {event.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {event.description}
                                    </p>
                                    <Link href="/galerie" className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-2 group/btn">
                                        Voir les photos
                                        <ArrowRight className="size-3 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </SectionWrapper>
            )}
        </main>
    )
}
