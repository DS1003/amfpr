import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Globe2, Handshake } from "lucide-react"

export const metadata: Metadata = {
  title: "Partenariats",
  description:
    "Découvrez nos partenaires institutionnels et privés qui soutiennent nos actions pour le bien-être social.",
}

const institutionalPartners = [
  { name: "UNICEF", category: "Organisation internationale" },
  { name: "OMS", category: "Organisation mondiale de la santé" },
  { name: "UNESCO", category: "Éducation et culture" },
  { name: "Banque Mondiale", category: "Développement économique" },
  { name: "Union Africaine", category: "Organisation continentale" },
  { name: "ONU Femmes", category: "Égalité des genres" },
  { name: "PNUD", category: "Programme des Nations Unies" },
  { name: "Croix-Rouge", category: "Aide humanitaire" },
]

const privatePartners = [
  { name: "Fondation Orange", category: "Télécommunications" },
  { name: "Fondation Total", category: "Énergie" },
  { name: "Banque de Développement", category: "Finance" },
  { name: "Société Minière Nationale", category: "Industries" },
]

const partnershipTypes = [
  {
    icon: Building2,
    title: "Partenariats institutionnels",
    description:
      "Collaborations avec les organisations internationales et gouvernementales pour des programmes d'envergure nationale.",
  },
  {
    icon: Globe2,
    title: "Coopération internationale",
    description:
      "Échanges et partenariats avec des fondations et ONG internationales pour partager les bonnes pratiques.",
  },
  {
    icon: Handshake,
    title: "Secteur privé",
    description:
      "Collaboration avec les entreprises pour financer et soutenir nos programmes sociaux et éducatifs.",
  },
]

export default function PartnershipsPage() {
  return (
    <>
      <PageHeader
        badge="Partenariats"
        title="Nos Partenaires"
        description="Des collaborations solides avec des organisations nationales et internationales pour maximiser notre impact social."
      />

      {/* Partnership Types */}
      <SectionWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {partnershipTypes.map((type, index) => (
            <MotionWrapper key={type.title} delay={index * 150}>
              <div className="p-8 rounded-2xl bg-card border border-border text-center h-full">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  <type.icon className="size-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary">
                  {type.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* Institutional Partners Grid */}
      <SectionWrapper variant="muted">
        <MotionWrapper>
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
              Institutions
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
              Partenaires institutionnels
            </h2>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {institutionalPartners.map((partner, index) => (
            <MotionWrapper key={partner.name} delay={index * 80}>
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center h-full">
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <span className="font-serif text-lg font-bold text-primary">
                    {partner.name.slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-primary">
                  {partner.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {partner.category}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* Private Partners */}
      <SectionWrapper>
        <MotionWrapper>
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
              Secteur privé
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
              Partenaires privés
            </h2>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {privatePartners.map((partner, index) => (
            <MotionWrapper key={partner.name} delay={index * 80}>
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-secondary border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center h-full">
                <div className="h-16 w-16 rounded-full bg-card flex items-center justify-center mb-4">
                  <span className="font-serif text-lg font-bold text-primary">
                    {partner.name.slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-primary">
                  {partner.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {partner.category}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="primary">
        <MotionWrapper>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl text-balance">
              Devenez partenaire
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/70">
              {
                "Rejoignez notre réseau de partenaires et contribuez à faire avancer nos programmes pour le bien-être social et l'autonomisation des femmes."
              }
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8 h-12 text-sm font-medium"
            >
              <Link href="/contact">
                Nous contacter
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </MotionWrapper>
      </SectionWrapper>

      {/* Partnership Image */}
      <SectionWrapper>
        <MotionWrapper>
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
            <Image
              src="/images/partnership.jpg"
              alt="Partenariats de l'AFPR"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-primary/20" />
          </div>
        </MotionWrapper>
      </SectionWrapper>
    </>
  )
}
