"use client"

import { useState, useCallback, useEffect } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Grâce au programme de formation de l'Amicale, j'ai pu créer ma propre entreprise de couture. Aujourd'hui, j'emploie cinq autres femmes de mon village.",
    name: "Fatoumata K.",
    role: "Bénéficiaire du programme de formation",
    location: "Région de Thiès",
  },
  {
    quote:
      "La campagne de santé maternelle m'a permis de bénéficier d'un suivi médical gratuit pendant toute ma grossesse. Je suis reconnaissante envers l'Amicale.",
    name: "Mariame S.",
    role: "Bénéficiaire de la campagne santé",
    location: "Région de Saint-Louis",
  },
  {
    quote:
      "L'Amicale a financé ma scolarité jusqu'au baccalauréat. Sans cette bourse, je n'aurais jamais pu poursuivre mes études. Je suis maintenant étudiante en médecine.",
    name: "Aïcha D.",
    role: "Boursière de l'Amicale",
    location: "Dakar",
  },
  {
    quote:
      "Le programme d'alphabétisation a changé ma vie. Savoir lire et écrire m'a donné confiance en moi et m'a ouvert de nouvelles opportunités.",
    name: "Djènè B.",
    role: "Participante au programme d'alphabétisation",
    location: "Région de Ziguinchor",
  },
]

export function TestimonialsSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % testimonials.length),
    []
  )
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length),
    []
  )

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const testimonial = testimonials[current]

  return (
    <SectionWrapper variant="primary">
      <MotionWrapper>
        <div className="text-center mb-12">
          <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
            Témoignages
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl text-balance">
            {"Ce qu'elles disent de nous"}
          </h2>
        </div>
      </MotionWrapper>

      <div className="max-w-3xl mx-auto text-center">
        <Quote className="mx-auto mb-8 size-10 text-accent/50" />

        <div className="relative min-h-[200px] flex items-center justify-center">
          <div
            key={current}
            className="animate-in fade-in duration-500"
          >
            <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-primary-foreground/90 italic">
              {`"${testimonial.quote}"`}
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold text-primary-foreground">
                {testimonial.name}
              </p>
              <p className="text-sm text-primary-foreground/60 mt-1">
                {testimonial.role}
              </p>
              <p className="text-xs text-accent mt-1">{testimonial.location}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="size-5" />
          </Button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-accent"
                    : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                }`}
                aria-label={`Aller au témoignage ${i + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
