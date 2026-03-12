"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/motion-wrapper"
import { ArrowUpRight, HeartHandshake } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-[#FAF8F5] pt-20 sm:pt-24 lg:pt-40 pb-8 sm:pb-12 lg:pb-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[auto] sm:min-h-[600px] lg:min-h-[700px] flex flex-col lg:flex-row overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-white border border-border/50 shadow-xl">
          {/* Text Column - Dark Green Background */}
          <div className="w-full lg:w-[45%] bg-[#0E3B2E] flex items-center z-20 order-2 lg:order-1 relative">
            {/* Subtle decorative element */}
            <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-[#0E3B2E]/20 hidden lg:block translate-x-full pointer-events-none" />

            <div className="px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24 w-full">
              <MotionWrapper delay={0}>
                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                  <HeartHandshake className="size-4 lg:size-5 text-accent" />
                  <span className="text-[10px] lg:text-xs font-bold tracking-widest text-accent uppercase font-serif italic">
                    Présidence de la République du Sénégal
                  </span>
                </div>
              </MotionWrapper>

              <MotionWrapper delay={150}>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.1] mb-6">
                  Solidarité, <span className="text-accent underline decoration-accent/30 underline-offset-8">Leadership</span> <br className="hidden sm:block" />
                  et Engagement <br className="hidden sm:block" />
                  Citoyen
                </h1>
              </MotionWrapper>

              <MotionWrapper delay={300}>
                <p className="text-base lg:text-lg leading-relaxed text-white/80 max-w-md mb-8 lg:mb-10">
                  Fédérer les femmes employées à la Présidence de la République autour d'un idéal commun pour bâtir un réseau fort d'entraide et d'action sociale.
                </p>
              </MotionWrapper>

              <MotionWrapper delay={450}>
                <Button
                  asChild
                  className="bg-accent text-accent-foreground hover:bg-white hover:text-primary rounded-2xl px-8 sm:px-12 h-12 sm:h-14 text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-accent/10 transition-all w-full sm:w-auto"
                >
                  <Link href="/a-propos">
                    En savoir plus sur l'Amicale
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </MotionWrapper>
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full lg:w-[55%] relative min-h-[280px] sm:min-h-[400px] lg:min-h-full order-1 lg:order-2">
            <Image
              src="/images/hero-group.jpg"
              alt="Membres de l'Amicale des Femmes de la Présidence de la République"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Subtle overlay for mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B2E] via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
