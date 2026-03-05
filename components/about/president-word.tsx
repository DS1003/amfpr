import Image from "next/image"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Quote } from "lucide-react"

export function PresidentWord() {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/30 -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Image Column */}
                    <div className="lg:col-span-5">
                        <MotionWrapper direction="left">
                            <div className="relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-[6px] md:border-8 border-white group">
                                <Image
                                    src="/images/president.jpg"
                                    alt="Présidente de l'AFPR"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/10 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 transform translate-y-1 opacity-95 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <p className="font-serif text-lg md:text-xl font-bold text-primary leading-tight">Mme NDIAYE Mame Jacques Seck</p>
                                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-accent mt-1.5 leading-snug">
                                        Présidente de l'Amicale des Femmes de la Présidence de la République
                                    </p>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>

                    {/* Text Column */}
                    <div className="lg:col-span-7">
                        <MotionWrapper delay={200}>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-px w-8 bg-accent" />
                                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Mot de la Présidente</span>
                            </div>

                            <div className="relative">
                                <Quote className="absolute -top-6 -left-6 md:-top-10 md:-left-10 size-16 md:size-20 text-secondary/40 -z-10" />
                                <h2 className="font-serif text-2xl font-bold tracking-tight text-primary md:text-3xl lg:text-4xl leading-[1.2]">
                                    "Je tiens à exprimer ma sincère reconnaissance pour votre confiance et votre soutien"
                                </h2>
                            </div>

                            <div className="mt-8 space-y-4 text-[15px] md:text-base leading-relaxed text-muted-foreground/90 italic">
                                <p className="not-italic font-medium text-primary mb-2">
                                    Aux membres de l'Amicale des Femmes,
                                </p>
                                <p>
                                    Je tiens à exprimer ma sincère reconnaissance pour votre confiance et votre soutien en m'élisant présidente lors du récent vote. C’est avec un grand honneur et enthousiasme que j’accepte cette responsabilité, déterminée à collaborer avec vous pour enrichir notre amicale et contribuer ainsi à son essor.
                                </p>
                                <p>
                                    Je tenais à rendre un vibrant hommage à mes prédécesseurs pour l'excellent travail qu'elles ont abattu durant leur magistère, il s'agit de madame Katy Ndiaye initiatrice de cette amicale, de madame Ndeye Fatou Sy, madame Bougouma Mbaye et de madame Marie Anne Yande Diouf Ndiaye. Qu'Allah le Tout puissant vous guide et veille sur vous et vos familles respectives.
                                </p>
                                <p>
                                    Je souhaite également exprimer mes remerciements à chacune d’entre vous pour votre engagement continu envers la grande famille que nous formons. Je suis impatiente de travailler avec vous pour nos diverses activités.
                                </p>
                                <p className="not-italic font-medium text-primary mt-6">
                                    Avec gratitude,
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-px flex-1 bg-border/60" />
                                <div className="font-serif text-xl font-bold text-primary/40">MJS</div>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            </div>
        </section>
    )
}
