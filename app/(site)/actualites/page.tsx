import type { Metadata } from "next"
export const dynamic = "force-dynamic"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Actualités & Événements",
  description:
    "Restez informé des dernières nouvelles, événements et activités de l'Amicale des Femmes de la Présidence de la République.",
}

const upcomingEvents = [
  {
    title: "Gala annuel de solidarité",
    date: "20 Avril 2026",
    location: "Grand Théâtre National, Dakar",
    description:
      "Soirée de collecte de fonds au profit des programmes de santé communautaire.",
  },
  {
    title: "Forum régional sur l'éducation des filles",
    date: "15 Mai 2026",
    location: "Centre de conférences, Saint-Louis",
    description:
      "Réunion des acteurs de l'éducation pour promouvoir la scolarisation des jeunes filles.",
  },
  {
    title: "Campagne de sensibilisation santé maternelle",
    date: "1 Juin 2026",
    location: "Région de Kaolack",
    description:
      "Campagne itinérante de dépistage et de sensibilisation sur la santé maternelle.",
  },
]

export default async function NewsPage() {
  const dbActivities = await prisma.activity.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  })

  // Use DB activities or fallback to static if empty
  const articles = dbActivities.length > 0 ? dbActivities.map(a => ({
    title: a.title,
    excerpt: a.description,
    image: a.image || "/images/placeholder.jpg",
    date: new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: "5 min", // Default or calculate from content
    category: a.category,
    slug: a.slug
  })) : [
    {
      title: "Lancement du programme national d'alphabétisation 2026",
      excerpt: "L'Amicale inaugure un nouveau programme visant à former 2 000 femmes à la lecture et l'écriture dans les régions rurales.",
      image: "/images/education.jpg",
      date: "28 Février 2026",
      readTime: "4 min",
      category: "Éducation",
      slug: "#"
    },
    {
      title: "Partenariat renouvelé avec l'UNICEF",
      excerpt: "Un accord historique pour renforcer la lutte contre la mortalité maternelle et infantile dans les zones les plus reculées.",
      image: "/images/partnership.jpg",
      date: "15 Février 2026",
      readTime: "3 min",
      category: "Partenariat",
      slug: "#"
    },
    {
      title: "Journée internationale de la femme : célébration et engagements",
      excerpt: "L'Amicale organizes une grande cérémonie avec des ateliers, conférences et remise de prix aux femmes d'exception.",
      image: "/images/hero.jpg",
      date: "8 Mars 2026",
      readTime: "5 min",
      category: "Événement",
      slug: "#"
    },
  ]

  return (
    <>
      <PageHeader
        badge="Actualités"
        title="Nouvelles & Événements"
        description="Les dernières informations sur nos actions, programmes et événements à venir."
      />

      {/* Articles Grid */}
      <SectionWrapper>
        <MotionWrapper>
          <div className="mb-12">
            <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
              Articles récents
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
              Dernières nouvelles
            </h2>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <MotionWrapper key={article.title} delay={index * 100}>
              <article className="group overflow-hidden rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                <Link href={`/articles/${article.slug}`} className="flex-1 flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-primary-foreground bg-primary/80 backdrop-blur-sm rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-3 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        <time className="text-xs">{article.date}</time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        <span className="text-xs">{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-primary leading-snug group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary group-hover:text-accent transition-colors duration-300">
                        Lire la suite
                        <ArrowRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* Upcoming Events */}
      <SectionWrapper variant="muted">
        <MotionWrapper>
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
              Calendrier
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
              Événements à venir
            </h2>
          </div>
        </MotionWrapper>

        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {upcomingEvents.map((event, index) => (
            <MotionWrapper key={event.title} delay={index * 100}>
              <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all duration-300">
                <div className="sm:w-32 shrink-0 text-center sm:text-left">
                  <p className="font-serif text-lg font-bold text-accent">
                    {event.date.split(" ")[0]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.date.split(" ").slice(1).join(" ")}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold text-primary">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-accent">
                    {event.location}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
                <div className="shrink-0 flex items-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-primary border border-border rounded-xl hover:bg-secondary transition-colors duration-300"
                  >
                    {"S'inscrire"}
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
