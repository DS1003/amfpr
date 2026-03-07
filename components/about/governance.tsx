import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Scale, Users, LayoutDashboard, Flag, ShieldCheck } from "lucide-react"

export function Governance() {
    return (
        <SectionWrapper className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Governance Structure */}
                <MotionWrapper direction="left">
                    <span className="inline-block mb-3 text-xs font-medium tracking-widest uppercase text-accent">
                        Organisation interne
                    </span>
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl mb-8">
                        Gouvernance
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 shrink-0">
                                <Users className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg font-bold text-primary">L’Assemblée Générale</h3>
                                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                    Organe suprême de l’association, elle regroupe l’ensemble des membres. Elle se réunit en session ordinaire une fois par an et peut se réunir en session extraordinaire à la demande des deux tiers des membres.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 shrink-0">
                                <LayoutDashboard className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg font-bold text-primary">Le Comité Directeur</h3>
                                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                    Organe exécutif élu pour un mandat de trois ans renouvelables, il assure la mise en œuvre des orientations adoptées par l’Assemblée Générale.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 shrink-0">
                                <Flag className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg font-bold text-primary">Le Bureau</h3>
                                <p className="mt-1 text-sm text-muted-foreground leading-relaxed mb-2">
                                    Élu au sein du Comité Directeur, il comprend au minimum :
                                </p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-1">
                                    <li>Une Présidente</li>
                                    <li>Une Secrétaire Générale</li>
                                    <li>Une Trésorière Générale</li>
                                </ul>
                                <p className="mt-2 text-xs font-medium text-accent">Les fonctions exercées sont bénévoles.</p>
                            </div>
                        </div>
                    </div>
                </MotionWrapper>

                {/* Principles and Resources */}
                <MotionWrapper delay={200} direction="right">
                    <div className="bg-secondary/5 rounded-3xl p-8 lg:p-10 border border-secondary/10 h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <Scale className="h-8 w-8 text-secondary" />
                            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary">
                                Principes fondamentaux
                            </h2>
                        </div>
                        <div className="space-y-5 text-[15px] text-foreground/80 leading-relaxed">
                            <p>
                                L’Amicale est ouverte à toute personne acceptant ses statuts et son règlement intérieur.
                            </p>
                            <p className="relative pl-4 border-l-2 border-accent">
                                Elle exerce ses activités dans le respect des convictions individuelles et dans une stricte <strong>indépendance vis-à-vis des partis politiques</strong>. Toute activité politique, religieuse ou syndicale est interdite en son sein.
                            </p>
                        </div>

                        <div className="mt-10 pt-8 border-t border-border/60">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck className="h-6 w-6 text-primary/60" />
                                <h3 className="font-serif text-xl font-bold text-primary">
                                    Ressources
                                </h3>
                            </div>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                    Des cotisations des membres
                                </li>
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                    De la vente des cartes de membre
                                </li>
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                    Des contributions volontaires
                                </li>
                            </ul>
                            <p className="text-xs text-muted-foreground/80 italic">
                                *En cas de dissolution, l’actif restant est dévolu à une œuvre laïque, conformément aux statuts.
                            </p>
                        </div>
                    </div>
                </MotionWrapper>

            </div>
        </SectionWrapper>
    )
}
