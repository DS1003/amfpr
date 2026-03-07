import Image from "next/image"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { SenegalStripe } from "@/components/senegal-stripe"
import { Heart, Users, GraduationCap, Globe } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Entraide & Solidarité",
    description:
      "Promouvoir la cohésion et le soutien mutuel au sein des employées présidentielles pour bâtir une grande famille.",
  },
  {
    icon: Users,
    title: "Voix fédératrice",
    description:
      "Fédérer les femmes employées au sein du Palais autour d'un cadre structuré de concertation et d'échange.",
  },
  {
    icon: GraduationCap,
    title: "Leadership féminin",
    description:
      "Développer le leadership, l'autonomie et les capacités professionnelles des femmes au quotidien.",
  },
  {
    icon: Globe,
    title: "Engagement social",
    description:
      "Soutenir et mettre en œuvre des initiatives sociales à fort impact en faveur des autres.",
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
                Amicale des Femmes de la Présidence
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-[2.75rem] leading-[1.15]">
              {"Une nouvelle dynamique au service de l'action"}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {
                "Créée le 1er février 2017 à Dakar, l’Amicale des Femmes de la Présidence de la République du Sénégal est une association à but non lucratif qui regroupe les femmes employées au sein du Palais présidentiel."
              }
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {
                "En mars 2025, l’Amicale a été reçue de manière historique en audience par la Première Dame, Marie Khone Faye, traduisant une reconnaissance institutionnelle forte et ouvrant une nouvelle dynamique de collaboration dans le domaine du leadership et des actions sociales."
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <MotionWrapper key={value.title} delay={index * 100} className="h-full">
            <div className="group relative p-8 h-full flex flex-col rounded-[2rem] bg-white border border-border/40 hover:border-primary/20 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden z-10">

              {/* Premium Top Line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Highly visible Icon Container */}
              <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:bg-accent group-hover:shadow-accent/20 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                <value.icon className="size-8 text-primary-foreground" strokeWidth={1.5} />
              </div>

              <h3 className="font-serif text-xl font-bold text-primary mb-4 transition-colors duration-300">
                {value.title}
              </h3>

              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {value.description}
              </p>

              {/* Subtle background flair */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-accent/5 transition-colors duration-700 -z-10" />
            </div>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  )
}
