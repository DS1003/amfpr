import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Target, Eye, Gem } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Nos Missions",
    items: [
      "Promouvoir le bien-être social des communautés",
      "Soutenir l'éducation et la formation des femmes",
      "Renforcer l'accès aux soins de santé",
      "Développer des programmes d'autonomisation économique",
    ],
  },
  {
    icon: Eye,
    title: "Notre Vision",
    items: [
      "Une société où chaque femme réalise son potentiel",
      "Des communautés solidaires et résilientes",
      "Un avenir inclusif et équitable pour toutes",
      "L'excellence dans le service à la nation",
    ],
  },
  {
    icon: Gem,
    title: "Nos Valeurs",
    items: [
      "Solidarité et entraide mutuelle",
      "Dignité et respect de la personne",
      "Intégrité et transparence",
      "Engagement et dévouement",
    ],
  },
]

export function MissionsSection() {
  return (
    <SectionWrapper variant="muted">
      <MotionWrapper>
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
            {"Missions & Valeurs"}
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
            {"Les piliers de notre engagement"}
          </h2>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <MotionWrapper key={pillar.title} delay={index * 150}>
            <div className="p-8 rounded-2xl bg-card border border-border h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-6">
                <pillar.icon className="size-5 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary mb-6">
                {pillar.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  )
}
