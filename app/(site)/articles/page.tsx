import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { TestimonialsSlider } from "@/components/activities/testimonials-slider"
import { CheckCircle, TrendingUp, Users, Heart, Calendar, ArrowRight, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Articles & Actualités",
  description:
    "Suivez toute l'actualité, les articles de fond et les événements de l'Amicale des Femmes de la Présidence.",
}

const achievements = [
  {
    icon: Users,
    value: "15 000+",
    label: "Bénéficiaires directs",
  },
  {
    icon: Heart,
    value: "200+",
    label: "Projets réalisés",
  },
  {
    icon: TrendingUp,
    value: "30+",
    label: "Années d'engagement",
  },
  {
    icon: CheckCircle,
    value: "50+",
    label: "Partenaires actifs",
  },
]

export default async function ArticlesPage() {
  const articles = await prisma.activity.findMany({
    where: { published: true },
    orderBy: { date: "desc" }
  })

  return (
    <>
      <PageHeader
        badge="Articles"
        title="Actualités & Blog"
        description="Restez informés des dernières initiatives, événements et articles de fond de notre Amicale."
      />

      {/* Achievements Stats */}
      <SectionWrapper>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {achievements.map((item, index) => (
            <MotionWrapper key={item.label} delay={index * 100}>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  <item.icon className="size-6 text-primary" />
                </div>
                <p className="font-serif text-3xl font-bold text-primary md:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* Dynamic Articles Grid */}
      <SectionWrapper variant="muted">
        <MotionWrapper>
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
              Notre Journal
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
              {"Tous nos Articles"}
            </h2>
          </div>
        </MotionWrapper>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article, index) => (
              <MotionWrapper key={article.id} delay={index * 100}>
                <article className="group h-full flex flex-col bg-white rounded-[2rem] border border-border/60 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                  <Link href={`/articles/${article.slug}`} className="flex-1 flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image || "/images/activities.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                        <Calendar className="size-4" />
                        <time className="text-xs font-bold uppercase tracking-widest">
                          {new Date(article.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary leading-tight group-hover:text-accent transition-colors mb-4 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-8">
                        {article.description}
                      </p>

                      <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                          Lire l'article <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </MotionWrapper>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-border/60 max-w-4xl mx-auto">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary/30">
              <FileText className="size-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">
              Aucun article publié
            </h3>
            <p className="text-muted-foreground">
              Revenez bientôt pour découvrir nos dernières actualités.
            </p>
          </div>
        )}
      </SectionWrapper>

      {/* Testimonials */}
      <TestimonialsSlider />
    </>
  )
}
