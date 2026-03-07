import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Presentation } from "@/components/about/presentation"
import { MissionsActions } from "@/components/about/missions-actions"
import { Governance } from "@/components/about/governance"
import { PresidentWord } from "@/components/about/president-word"
import { FormerPresidents } from "@/components/about/former-presidents"

export const metadata: Metadata = {
  title: "A Propos",
  description:
    "Découvrez l'histoire, les missions et les valeurs de l'Amicale des Femmes de la Présidence de la République.",
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="A propos"
        title="Notre histoire, nos valeurs"
        description="L'Amicale des Femmes de la Présidence de la République s'engage depuis des décennies pour le développement social et l'autonomisation des femmes au Sénégal."
      />
      <Presentation />
      <MissionsActions />
      <Governance />
      <PresidentWord />
      <FormerPresidents />
    </>
  )
}
