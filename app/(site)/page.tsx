import { HeroSection } from "@/components/home/hero-section"
import { PresentationSection } from "@/components/home/presentation-section"
import { ArticlesSection } from "@/components/home/articles-section"
import { GalleryPreview } from "@/components/home/gallery-preview"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PresentationSection />
      <ArticlesSection />
      <GalleryPreview />
      <CTASection />
    </>
  )
}
