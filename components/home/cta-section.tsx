import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { SenegalStripe } from "@/components/senegal-stripe"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <SectionWrapper variant="primary">
      <MotionWrapper>
        <div className="text-center max-w-2xl mx-auto">
          <SenegalStripe className="mx-auto mb-10 max-w-[120px] rounded-full overflow-hidden" />
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] text-primary-foreground leading-[1.15]">
            {"Rejoignez notre élan de solidarité et d'engagement"}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-primary-foreground/70">
            {"Découvrez comment vous pouvez soutenir nos initiatives sociales en faveur des communautés vulnérables et encourager le leadership féminin. Ensemble, nous avons un impact plus fort."}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-2xl px-12 h-14 text-sm font-bold uppercase tracking-wide"
            >
              <Link href="/contact">
                Nous contacter
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-2xl px-8 h-12 text-sm font-medium bg-transparent"
            >
              <Link href="/articles">Parcourir nos articles</Link>
            </Button>
          </div>
        </div>
      </MotionWrapper>
    </SectionWrapper>
  )
}
