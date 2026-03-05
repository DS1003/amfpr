import Image from "next/image"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"

const timeline = [
  {
    year: "1995",
    title: "Création de l'Amicale",
    description:
      "Fondation de l'Amicale des Femmes de la Présidence de la République, portée par une vision de solidarité et d'entraide.",
  },
  {
    year: "2005",
    title: "Expansion des programmes",
    description:
      "Lancement de programmes d'alphabétisation et de santé communautaire dans les régions rurales.",
  },
  {
    year: "2015",
    title: "Partenariats internationaux",
    description:
      "Signature de partenariats avec des organisations internationales pour renforcer l'impact de nos actions.",
  },
  {
    year: "2024",
    title: "Nouvelle vision stratégique",
    description:
      "Adoption d'une feuille de route ambitieuse centrée sur l'autonomisation économique des femmes.",
  },
]

export function HistorySection() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <MotionWrapper>
          <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
            Notre histoire
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
            {"Un parcours d'engagement et de service"}
          </h2>
          <div className="mt-8 flex flex-col gap-8">
            {timeline.map((item, index) => (
              <MotionWrapper key={item.year} delay={index * 100}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0">
                      {item.year.slice(2)}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-xs font-medium text-accent">{item.year}</p>
                    <h3 className="font-serif text-lg font-semibold text-primary mt-1">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </MotionWrapper>

        <MotionWrapper delay={200} direction="right">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/about.jpg"
              alt="Histoire de l'Amicale"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </MotionWrapper>
      </div>
    </SectionWrapper>
  )
}
