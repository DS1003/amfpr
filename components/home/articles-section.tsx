import Image from "next/image"
import Link from "next/link"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { ArrowRight, Calendar, PlayCircle } from "lucide-react"
import prisma from "@/lib/prisma"

export async function ArticlesSection() {
  const dbActivities = await prisma.activity.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
    take: 3
  })

  // Fallback to static data if DB is empty
  const activities = dbActivities.length > 0 ? dbActivities.map(a => ({
    title: a.title,
    description: a.description,
    image: a.image,
    videoUrl: a.videoUrl,
    date: new Date(a.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    category: a.category,
    slug: a.slug
  })) : [
    {
      title: "Campagne de sensibilisation sur la santé maternelle",
      description: "Une campagne nationale visant à améliorer l'accès aux soins de santé pour les femmes enceintes dans les zones rurales.",
      image: "/images/health.jpg",
      videoUrl: null,
      date: "Février 2026",
      category: "Santé",
      slug: "#"
    },
    {
      title: "Programme d'alphabétisation et de formation professionnelle",
      description: "Programmes de formation destinés aux femmes pour développer leurs compétences professionnelles et leur autonomie financière.",
      image: "/images/education.jpg",
      videoUrl: null,
      date: "Janvier 2026",
      category: "Éducation",
      slug: "#"
    },
    {
      title: "Actions de solidarité pour les communautés",
      description: "Engagement communautaire et soutien aux familles pour un développement social harmonieux et durable.",
      image: "/images/activities.jpg",
      videoUrl: null,
      date: "Décembre 2025",
      category: "Solidarité",
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
                Actualités & Blog
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl leading-[1.15]">
              {"Derniers Articles"}
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
          >
            Découvrir tous les articles
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity, index) => (
          <MotionWrapper key={activity.title} delay={index * 150}>
            <article className="group overflow-hidden rounded-2xl bg-white border border-border/60 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ease-out hover:-translate-y-2 h-full flex flex-col">
              <Link href={`/articles/${activity.slug}`} className="flex-1 flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <Image
                    src={activity.image || (activity.videoUrl ? `https://img.youtube.com/vi/${activity.videoUrl.includes('v=') ? activity.videoUrl.split('v=')[1]?.split('&')[0] : activity.videoUrl.split('/').pop()?.split('?')[0]}/hqdefault.jpg` : "/images/placeholder.jpg")}
                    alt={activity.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                  {activity.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-10 md:size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-xl group-hover:scale-110 transition-transform">
                        <PlayCircle className="size-5 md:size-6 fill-black/40" />
                      </div>
                    </div>
                  )}
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
