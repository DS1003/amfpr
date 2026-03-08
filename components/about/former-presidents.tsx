import Image from "next/image"
import { MotionWrapper } from "@/components/motion-wrapper"
import { SenegalStripe } from "@/components/senegal-stripe"

const formerPresidents = [
    {
        name: "Mme Katy Ndiaye",
        tenure: "2016 — 2017",
        image: "/images/katy_ndiaye.jpg",
    },
    {
        name: "Mme Ndèye Fatou Sy",
        tenure: "Déc. 2017 — Déc. 2020",
        image: "/images/ndeye_fatou_sy.jpg",
    },
    {
        name: "Mme MBAYE Bougouma",
        tenure: "Déc. 2020 — Déc. 2023",
        image: "/images/mbaye_bougouma.jpg",
    },
    {
        name: "Mme Marianne Diouf",
        tenure: "Déc. 2023 — Mars 2024",
        image: "/images/about.jpg",
    },
]

export function FormerPresidents() {
    return (
        <section className="py-24 lg:py-32 bg-secondary/20">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <MotionWrapper>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <span className="h-px w-8 bg-accent" />
                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Héritage</span>
                            <span className="h-px w-8 bg-accent" />
                        </div>
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-5xl leading-[1.15]">
                            Nos anciennes présidentes
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
                            Hommage à ces femmes d'exception qui ont guidé notre amicale avec sagesse et dévouement à travers les époques.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {formerPresidents.map((president, index) => (
                        <MotionWrapper key={president.name} delay={index * 150}>
                            <div className="group relative">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 mb-6 bg-white border border-border">
                                    <Image
                                        src={president.image}
                                        alt={president.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                </div>

                                <div className="text-center">
                                    <p className="font-serif text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                        {president.name}
                                    </p>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-1">
                                        {president.tenure}
                                    </p>
                                </div>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <SenegalStripe className="max-w-[160px] rounded-full overflow-hidden opacity-50" />
                </div>
            </div>
        </section>
    )
}
