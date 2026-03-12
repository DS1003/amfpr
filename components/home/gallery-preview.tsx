import Image from "next/image"
import Link from "next/link"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import prisma from "@/lib/prisma"

export async function GalleryPreview() {
  // Fetch up to 6 most recent published gallery photos from DB
  const galeries = await prisma.gallery.findMany({
    where: { published: true },
    include: { photos: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })

  // Flatten all photos and take the first 6
  const allPhotos = galeries.flatMap((g) =>
    g.photos.map((p) => ({
      src: p.url,
      alt: p.caption || g.title || "Galerie AMFPR",
    }))
  ).slice(0, 6)

  // Fallback to static images if no DB photos yet
  const fallbackImages = [
    { src: "/images/hero.jpg", alt: "Événement officiel de l'AFPR" },
    { src: "/images/about.jpg", alt: "Réunion du bureau exécutif" },
    { src: "/images/activities.jpg", alt: "Distribution de dons" },
    { src: "/images/education.jpg", alt: "Programme éducatif" },
    { src: "/images/health.jpg", alt: "Campagne de santé" },
    { src: "/images/partnership.jpg", alt: "Partenariats institutionnels" },
  ]

  const images = allPhotos.length > 0 ? allPhotos : fallbackImages

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {images.map((image, index) => (
          <MotionWrapper key={image.src + index} delay={index * 80}>
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-all duration-700 ease-out" />
            </div>
          </MotionWrapper>
        ))}
      </div>

      {/* Voir plus button */}
      <MotionWrapper delay={500}>
        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-2xl px-10 h-14 text-sm font-bold uppercase tracking-wide shadow-lg shadow-primary/10 transition-all duration-300"
          >
            <Link href="/galerie">
              Voir toute la galerie
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </MotionWrapper>
    </SectionWrapper>
  )
}
