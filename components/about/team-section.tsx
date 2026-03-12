import Image from "next/image"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"

const teamMembers = [
  {
    name: "Mme Ndiaye Mame Jacques SECK",
    role: "Présidente de l'Amicale",
    image: "/images/mame_jacques_seck.jpg",
  },
  {
    name: "Fatoumata Ly BA",
    role: "Secrétaire Générale",
    image: "/images/fatoumata_ly_ba.jpg",
  },
  {
    name: "Mme Bintou Malick GUÈYE",
    role: "Secrétaire Générale Adjointe",
    image: "/images/bintou_malick_gueye.jpg",
  },
  {
    name: "Mame Awa DIOP",
    role: "Trésorière Générale",
    image: "/images/mame_awa_diop.jpg",
  },
  // {
  //   name: "Fatma Guèye THIAM",
  //   role: "Trésorière Adjointe",
  //   image: "/placeholder-user.jpg",
  // },
]

export function TeamSection() {
  return (
    <SectionWrapper className="pb-4 sm:pb-8">
      <MotionWrapper>
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
            Bureau exécutif
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
            {"Les présidentes de commission"}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
            {
              "Des femmes d'exception, unies par une vision commune de service et d'engagement pour le bien-être de la communauté."
            }
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <MotionWrapper key={member.name} delay={index * 100}>
            <div className="group text-center">
              <div className="relative mx-auto mb-6 h-56 w-56 overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="224px"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-accent font-medium">
                {member.role}
              </p>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  )
}
