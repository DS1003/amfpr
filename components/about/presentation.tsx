import Image from "next/image"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"

export function Presentation() {
    return (
        <SectionWrapper className="bg-white">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                <MotionWrapper direction="left">
                    <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
                        Notre histoire
                    </span>
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl">
                        Présentation de l’Amicale
                    </h2>
                    <div className="mt-6 space-y-6 text-base text-muted-foreground leading-relaxed">
                        <p>
                            Créée le <strong>1er février 2017</strong> à Dakar, conformément aux dispositions du Code des obligations civiles et commerciales, l’Amicale des Femmes de la Présidence de la République du Sénégal est une association à but non lucratif, à durée illimitée, dont le siège est établi à la Présidence de la République, avenue Léopold Sédar Senghor.
                        </p>
                        <p>
                            Elle regroupe les femmes employées au sein du Palais présidentiel autour d’un idéal commun : <strong className="text-secondary">renforcer les liens de solidarité, promouvoir le leadership féminin et encourager l’engagement social et citoyen.</strong>
                        </p>
                    </div>

                    <div className="mt-12 bg-secondary/5 rounded-2xl p-8 border border-secondary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h3 className="font-serif text-2xl font-bold text-primary mb-4">Une dynamique nouvelle impulsée en 2025</h3>
                        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed relative z-10">
                            <p>
                                En mars 2025, l’Amicale a été reçue en audience par la <strong>Première Dame, Marie Khone Faye</strong>. Cette rencontre historique marque une étape majeure dans la vie de l’association : pour la première fois depuis sa création, une Première Dame a accordé une audience officielle à l’Amicale.
                            </p>
                            <p>
                                Ce geste hautement symbolique traduit une reconnaissance institutionnelle et ouvre une nouvelle dynamique de collaboration. À cette occasion, les membres ont présenté leurs projets et sollicité l’accompagnement de la Première Dame afin de renforcer l’impact de leurs initiatives, notamment en matière de <strong>leadership féminin transformationnel et d’actions sociales</strong>.
                            </p>
                        </div>
                    </div>
                </MotionWrapper>

                <MotionWrapper delay={200} direction="right">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
                        <Image
                            src="/images/hero-group.jpg"
                            alt="Groupe des femmes de l'Amicale"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                    </div>
                </MotionWrapper>
            </div>
        </SectionWrapper>
    )
}
