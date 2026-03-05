"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Button } from "@/components/ui/button"
import { Download, FileText, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  "Tous",
  "Rapports annuels",
  "Documents officiels",
  "Études",
  "Communiqués",
]

const publications = [
  {
    title: "Rapport annuel 2025",
    description:
      "Bilan complet des activités, programmes et résultats de l'Amicale pour l'année 2025.",
    category: "Rapports annuels",
    date: "Janvier 2026",
    pages: 48,
    fileSize: "2.4 MB",
  },
  {
    title: "Étude sur l'autonomisation économique des femmes rurales",
    description:
      "Analyse approfondie de l'impact de nos programmes de formation sur l'autonomie financière des femmes.",
    category: "Études",
    date: "Décembre 2025",
    pages: 32,
    fileSize: "1.8 MB",
  },
  {
    title: "Plan stratégique 2024-2028",
    description:
      "Document cadre définissant les orientations et objectifs de l'Amicale pour les cinq prochaines années.",
    category: "Documents officiels",
    date: "Octobre 2025",
    pages: 24,
    fileSize: "1.2 MB",
  },
  {
    title: "Rapport d'activité semestriel 2025",
    description:
      "Compte-rendu détaillé des réalisations du premier semestre avec indicateurs de performance.",
    category: "Rapports annuels",
    date: "Septembre 2025",
    pages: 28,
    fileSize: "1.6 MB",
  },
  {
    title: "Communiqué : Partenariat avec l'UNICEF",
    description:
      "Annonce officielle du renouvellement de notre partenariat stratégique avec l'UNICEF.",
    category: "Communiqués",
    date: "Août 2025",
    pages: 4,
    fileSize: "0.5 MB",
  },
  {
    title: "Charte des valeurs de l'Amicale",
    description:
      "Document fondateur définissant les principes, valeurs et engagements de notre organisation.",
    category: "Documents officiels",
    date: "Juillet 2025",
    pages: 12,
    fileSize: "0.8 MB",
  },
  {
    title: "Rapport annuel 2024",
    description:
      "Bilan des activités et réalisations de l'année 2024, avec témoignages et données chiffrées.",
    category: "Rapports annuels",
    date: "Février 2025",
    pages: 52,
    fileSize: "3.1 MB",
  },
  {
    title: "Étude d'impact des campagnes de santé 2023-2024",
    description:
      "Évaluation de l'efficacité de nos campagnes de santé communautaire sur deux années.",
    category: "Études",
    date: "Janvier 2025",
    pages: 36,
    fileSize: "2.0 MB",
  },
]

export default function PublicationsPage() {
  const [activeFilter, setActiveFilter] = useState("Tous")

  const filteredPublications =
    activeFilter === "Tous"
      ? publications
      : publications.filter((p) => p.category === activeFilter)

  return (
    <>
      <PageHeader
        badge="Publications"
        title="Documents & Rapports"
        description="Accédez à nos rapports annuels, études, documents officiels et communiqués de presse."
      />

      <SectionWrapper>
        {/* Filter */}
        <MotionWrapper>
          <div className="mb-12 flex flex-wrap items-center gap-3">
            <Filter className="size-4 text-muted-foreground mr-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300",
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </MotionWrapper>

        {/* Publications List */}
        <div className="flex flex-col gap-4">
          {filteredPublications.map((pub, index) => (
            <MotionWrapper key={pub.title} delay={index * 60}>
              <div className="group flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all duration-300">
                {/* Icon */}
                <div className="shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors duration-300">
                    <FileText className="size-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-accent bg-accent/10 rounded-full">
                      {pub.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {pub.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                    {pub.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {pub.description}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{pub.pages} pages</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{pub.fileSize}</span>
                  </div>
                </div>

                {/* Download */}
                <div className="shrink-0 flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-border hover:bg-secondary gap-2"
                  >
                    <Download className="size-4" />
                    <span className="hidden sm:inline">Télécharger</span>
                  </Button>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              Aucune publication trouvée dans cette catégorie.
            </p>
          </div>
        )}
      </SectionWrapper>
    </>
  )
}
