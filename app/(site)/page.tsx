import { HeroSection } from "@/components/home/hero-section"
export const dynamic = "force-dynamic"
import { EventBanner } from "@/components/home/event-banner"
import { PresentationSection } from "@/components/home/presentation-section"
import { ArticlesSection } from "@/components/home/articles-section"
import { GalleryPreview } from "@/components/home/gallery-preview"
import { CTASection } from "@/components/home/cta-section"
import { WomensDayCelebration } from "@/components/home/womens-day-celebration"

export default function HomePage() {
  return (
    <>
      <WomensDayCelebration />
      <HeroSection />
      {/* <EventBanner /> */}
      <PresentationSection />
      <ArticlesSection />
      <GalleryPreview />
      <CTASection />
    </>
  )
}
