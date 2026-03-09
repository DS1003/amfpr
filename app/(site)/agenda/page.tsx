import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight, Tag } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Agenda & Événements | AFPR",
    description: "Découvrez l'agenda des activités et événements de l'Amicale des Femmes de la Présidence de la République.",
}

export default async function AgendaPage() {
    const now = new Date()

    const events = await prisma.event.findMany({
        where: { published: true },
        orderBy: { date: 'asc' },
    })

    // Separate upcoming and past events
    const upcomingEvents = events.filter(e => new Date(e.date) >= now)
    const pastEvents = events.filter(e => new Date(e.date) < now).reverse()

    return (
        <main className="bg-[#fafafa]">
            <PageHeader
                badge="Calendrier"
                title="Agenda de l'Amicale"
                description="Retrouvez l'ensemble de nos événements, cérémonies et actions sociales planifiées."
            />

            {/* Hero / Featured Event if any */}
            {upcomingEvents.length > 0 && (
                <SectionWrapper className="pb-8">
                    <MotionWrapper>
                        <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden group shadow-2xl">
                            {upcomingEvents[0].image ? (
                                <Image
                                    src={upcomingEvents[0].image}
                                    alt={upcomingEvents[0].title}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                />
                            ) : (
                                <div className="size-full bg-primary/10 flex items-center justify-center">
                                    <Calendar className="size-24 text-primary/10" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 text-white">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-4 py-1.5 bg-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-accent/20">
                                        Événement à l'Affiche
                                    </span>
                                    <span className="flex items-center gap-2 text-white/80 text-[10px] uppercase font-bold tracking-widest">
                                        <Clock className="size-3" />
                                        {new Date(upcomingEvents[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl text-balance leading-tight transition-transform duration-700 group-hover:translate-x-2">
                                    {upcomingEvents[0].title}
                                </h2>
                                <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-8 line-clamp-2 leading-relaxed">
                                    {upcomingEvents[0].description}
                                </p>
                                <Button asChild className="bg-white text-primary hover:bg-accent hover:text-white transition-all duration-500 rounded-2xl h-14 px-8 font-bold uppercase tracking-wider text-xs group/btn">
                                    <Link href="/contact" className="flex items-center gap-3">
                                        Réserver ou demander des infos
                                        <ChevronRight className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </MotionWrapper>
                </SectionWrapper>
            )}

            {/* Upcoming Events List */}
            <SectionWrapper>
                <MotionWrapper>
                    <div className="flex items-center justify-between mb-16 px-4">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-px w-8 bg-accent" />
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">Planification</span>
                            </div>
                            <h2 className="font-serif text-4xl font-bold text-primary tracking-tight">Prochainement</h2>
                        </div>
                        <div className="text-right hidden md:block">
                            <span className="text-4xl font-serif text-accent/20 font-bold block">{upcomingEvents.length}</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Événements prévus</span>
                        </div>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 gap-12 sm:px-4">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event, index) => (
                            <MotionWrapper key={event.id} delay={index * 100}>
                                <div className="group flex flex-col lg:flex-row gap-10 items-center">
                                    {/* Event Date Column */}
                                    <div className="flex flex-col items-center lg:items-start shrink-0 min-w-[120px]">
                                        <span className="text-5xl font-serif font-bold text-accent group-hover:scale-110 transition-transform duration-500">
                                            {new Date(event.date).getDate()}
                                        </span>
                                        <span className="text-xs uppercase font-bold tracking-[0.2em] text-muted-foreground mt-2">
                                            {new Date(event.date).toLocaleDateString('fr-FR', { month: 'long' })}
                                        </span>
                                        <span className="text-[10px] text-accent/40 font-bold mt-1">
                                            {new Date(event.date).getFullYear()}
                                        </span>
                                    </div>

                                    {/* Event Card */}
                                    <div className="flex-1 w-full bg-white rounded-[2.5rem] border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-8 md:p-10 flex flex-col md:flex-row gap-10 hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:border-accent/10 transition-all duration-700">
                                        {event.image && (
                                            <div className="relative w-full md:w-56 aspect-[4/3] rounded-3xl overflow-hidden shrink-0 shadow-lg">
                                                <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-4 mb-5">
                                                <span className="flex items-center gap-2 px-4 py-1.5 bg-secondary/50 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                    <Tag className="size-3 text-accent" />
                                                    {event.category}
                                                </span>
                                                {event.location && (
                                                    <span className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                                                        <MapPin className="size-3 text-accent/60" />
                                                        {event.location}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                                                    <Clock className="size-3 text-accent/60" />
                                                    {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-5 group-hover:text-accent transition-colors duration-500 leading-tight">
                                                {event.title}
                                            </h3>
                                            <p className="text-muted-foreground/80 leading-relaxed text-base line-clamp-3 mb-8">
                                                {event.description}
                                            </p>
                                            <div className="flex items-center gap-6 pt-6 border-t border-border/40">
                                                <Button asChild variant="link" className="p-0 h-auto text-primary font-bold uppercase tracking-widest text-[10px] group/link hover:text-accent transition-all duration-300">
                                                    <Link href="/contact" className="flex items-center gap-2">
                                                        Je souhaite participer
                                                        <ArrowRight className="size-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" className="h-10 rounded-xl px-4 text-muted-foreground text-[10px] font-bold uppercase tracking-wider hover:bg-secondary/50 transition-colors">
                                                    Enregistrer au calendrier
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
                            <h3 className="font-serif text-2xl font-bold text-primary/60">Aucun événement prévu pour le moment</h3>
                            <p className="text-muted-foreground/60 mt-2">Revenez bientôt ou inscrivez-vous à notre lettre d'information.</p>
                        </div>
                    )}
                </div>
            </SectionWrapper>

            {/* Past Events Section */}
            {pastEvents.length > 0 && (
                <SectionWrapper variant="muted">
                    <MotionWrapper>
                        <div className="mb-16">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-px w-8 bg-muted-foreground/40" />
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground">Mémoire</span>
                            </div>
                            <h2 className="font-serif text-3xl font-bold text-primary/60 tracking-tight">Événements passés</h2>
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
