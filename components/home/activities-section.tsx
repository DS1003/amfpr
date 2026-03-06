import Image from "next/image"
import Link from "next/link"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { ArrowRight, Calendar } from "lucide-react"
import prisma from "@/lib/prisma"

export async function ActivitiesSection() {
  const dbActivities = await prisma.activity.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
    take: 3
  })

  // Fallback to static data if DB is empty
  const activities = dbActivities.length > 0 ? dbActivities.map(a => ({
    title: a.title,
    description: a.description,
    image: a.image || "/images/placeholder.jpg",
    date: new Date(a.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    category: a.category,
    slug: a.slug
  })) : [
    {
      title: "Campagne de sensibilisation sur la santé maternelle",
      description: "Une campagne nationale visant à améliorer l'accès aux soins de santé pour les femmes enceintes dans les zones rurales.",
      image: "/images/health.jpg",
      date: "Février 2026",
      category: "Santé",
      slug: "#"
    },
    {
      title: "Programme d'alphabétisation et de formation professionnelle",
      description: "Programmes de formation destinés aux femmes pour développer leurs compétences professionnelles et leur autonomie financière.",
      image: "/images/education.jpg",
      date: "Janvier 2026",
      category: "Éducation",
      slug: "#"
    },
    {
      title: "Distribution de dons aux communautés défavorisées",
      description: "Opération de solidarité pour fournir des fournitures essentielles aux familles les plus vulnérables.",
      image: "/images/activities.jpg",
      date: "Décembre 2025",
      category: "Action sociale",
      slug: "#"
    },
  ]

  return (
    <SectionWrapper variant="muted">
      <MotionWrapper>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 md:gap-4 mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-5">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
                Nos actions
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl leading-[1.15]">
              {"Activités récentes"}
            </h2>
          </div>
          <Link
            href="/activites"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
          >
            Voir toutes les activités
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity, index) => (
          <MotionWrapper key={activity.title} delay={index * 150}>
            <article className="group overflow-hidden rounded-2xl bg-card border border-border hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1 h-full flex flex-col">
              <Link href={`/activites/${activity.slug}`} className="flex-1 flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-primary-foreground bg-primary/80 backdrop-blur-sm rounded-full">
                      {activity.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                    <Calendar className="size-3.5" />
                    <time className="text-xs">{activity.date}</time>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary leading-snug group-hover:text-accent transition-colors duration-500">
                    {activity.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {activity.description}
                  </p>
                </div>
              </Link>
            </article>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  )
}
