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
            {"Rejoignez notre engagement pour un avenir meilleur"}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-primary-foreground/70">
            {"D\u00e9couvrez comment vous pouvez contribuer \u00e0 nos actions sociales, \u00e9ducatives et de sant\u00e9. Ensemble, nous pouvons faire la diff\u00e9rence."}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-2xl px-8 h-12 text-sm font-medium"
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
              <Link href="/activites">Nos activités</Link>
            </Button>
          </div>
        </div>
      </MotionWrapper>
    </SectionWrapper>
  )
}
