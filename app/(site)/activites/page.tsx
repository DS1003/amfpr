import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { TestimonialsSlider } from "@/components/activities/testimonials-slider"
import { CheckCircle, TrendingUp, Users, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Activités & Programmes",
  description:
    "Découvrez nos programmes sociaux, projets en cours et réalisations au service de la communauté.",
}

const programs = [
  {
    title: "Actions Sociales",
    description:
      "Programmes d'assistance directe aux populations vulnérables : distribution de vivres, soutien aux orphelinats, aide aux personnes handicapées et accompagnement des familles en difficulté.",
    image: "/images/activities.jpg",
    stats: [
      { label: "Familles aidées", value: "5 000+" },
      { label: "Régions couvertes", value: "12" },
    ],
  },
  {
    title: "Éducation & Formation",
    description:
      "Programmes d'alphabétisation, bourses scolaires pour les jeunes filles, formations professionnelles en couture, informatique et gestion d'entreprise pour les femmes.",
    image: "/images/education.jpg",
    stats: [
      { label: "Femmes formées", value: "3 200+" },
      { label: "Bourses attribuées", value: "450" },
    ],
  },
  {
    title: "Santé Communautaire",
    description:
      "Campagnes de sensibilisation sur la santé maternelle et infantile, dépistage gratuit, distribution de moustiquaires et accès aux soins dans les zones reculées.",
    image: "/images/health.jpg",
    stats: [
      { label: "Consultations", value: "10 000+" },
      { label: "Campagnes", value: "25" },
    ],
  },
]

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

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        badge="Activités"
        title="Nos Programmes & Actions"
        description="Au cœur de notre mission, des programmes concrets qui transforment des vies et renforcent les communautés."
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

      {/* Programs */}
      <SectionWrapper variant="muted">
        <MotionWrapper>
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
              Nos programmes
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
              {"Domaines d'intervention"}
            </h2>
          </div>
        </MotionWrapper>

        <div className="flex flex-col gap-20">
          {programs.map((program, index) => (
            <MotionWrapper key={program.title} delay={150}>
              <div
                className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h3 className="font-serif text-2xl font-bold text-primary md:text-3xl">
                    {program.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <div className="mt-8 flex gap-8">
                    {program.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-serif text-2xl font-bold text-accent">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <TestimonialsSlider />
    </>
  )
}
