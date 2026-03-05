import Image from "next/image"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"

const galleryImages = [
  { src: "/images/hero.jpg", alt: "Événement officiel de l'AFPR" },
  { src: "/images/about.jpg", alt: "Réunion du bureau exécutif" },
  { src: "/images/activities.jpg", alt: "Distribution de dons" },
  { src: "/images/education.jpg", alt: "Programme éducatif" },
  { src: "/images/health.jpg", alt: "Campagne de santé" },
  { src: "/images/partnership.jpg", alt: "Partenariats institutionnels" },
]

export function GalleryPreview() {
  return (
    <SectionWrapper>
      <MotionWrapper>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
              Galerie
            </span>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl leading-[1.15]">
            Nos moments forts
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
            {
              "Retour en images sur les événements, cérémonies et actions qui marquent l'engagement de notre amicale."
            }
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {galleryImages.map((image, index) => (
          <MotionWrapper key={image.src} delay={index * 80}>
            <div
              className={`group relative overflow-hidden rounded-2xl ${index === 0 || index === 5
                  ? "aspect-[4/3] md:row-span-1"
                  : "aspect-square"
                }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-all duration-700 ease-out" />
            </div>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  )
}
