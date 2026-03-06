import Image from "next/image"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { SenegalStripe } from "@/components/senegal-stripe"
import { Heart, Users, GraduationCap, Globe } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Solidarité",
    description:
      "Soutenir les communautés vulnérables à travers des actions sociales concrètes et durables.",
  },
  {
    icon: Users,
    title: "Autonomisation",
    description:
      "Promouvoir l'autonomie économique et sociale des femmes dans toutes les régions.",
  },
  {
    icon: GraduationCap,
    title: "Éducation",
    description:
      "Investir dans l'éducation des jeunes filles et l'alphabétisation des femmes.",
  },
  {
    icon: Globe,
    title: "Coopération",
    description:
      "Renforcer les partenariats nationaux et internationaux pour un impact durable.",
  },
]

export function PresentationSection() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
        {/* Text Content */}
        <div>
          <MotionWrapper>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
                Qui sommes-nous
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem] leading-[1.15]">
              {"Au service de la communauté depuis des décennies"}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {
                "L'Amicale des Femmes de la Présidence de la République est une organisation dédiée à la promotion du bien-être social, de l'éducation et de l'autonomisation des femmes. Fondée sur les valeurs de solidarité, de dignité et de service à la communauté, notre amicale œuvre chaque jour pour un impact positif et durable."
              }
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {
                "Nos membres, issues de divers horizons professionnels, partagent une vision commune : celle d'un avenir où chaque femme a la possibilité de réaliser son plein potentiel."
              }
            </p>
          </MotionWrapper>
        </div>

        {/* Image */}
        <MotionWrapper delay={200} direction="right">
          <div className="relative aspect-video lg:aspect-[3/2] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/about-new.jpg?v=1"
              alt="Célébration du 8 Mars - Amicale des Femmes de la Présidence"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </MotionWrapper>
      </div>

      {/* Senegalese stripe divider */}
      <SenegalStripe className="mt-12 md:mt-20 mb-14 max-w-xs mx-auto rounded-full overflow-hidden" />

      {/* Values Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <MotionWrapper key={value.title} delay={index * 100}>
            <div className="group p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary mb-4 group-hover:bg-accent/10 transition-colors duration-500">
                <value.icon className="size-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  )
}
