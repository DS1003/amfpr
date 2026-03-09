import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Scale, Users, LayoutDashboard, Flag, ShieldCheck, Coins, CreditCard, HandHeart } from "lucide-react"

const governanceItems = [
    {
        icon: <Users className="h-6 w-6" strokeWidth={1.5} />,
        title: "L'Assemblée Générale",
        description: "Organe suprême de l'association, elle regroupe l'ensemble des membres. Elle se réunit en session ordinaire une fois par an et peut se réunir en session extraordinaire à la demande des deux tiers des membres.",
        color: "bg-primary",
        shadow: "shadow-primary/20",
    },
    {
        icon: <LayoutDashboard className="h-6 w-6" strokeWidth={1.5} />,
        title: "Le Comité Directeur",
        description: "Organe exécutif élu pour un mandat de trois ans renouvelables, il assure la mise en œuvre des orientations adoptées par l'Assemblée Générale.",
        color: "bg-accent",
        shadow: "shadow-accent/20",
    },
    {
        icon: <Flag className="h-6 w-6" strokeWidth={1.5} />,
        title: "Le Bureau",
        description: "Élu au sein du Comité Directeur, il comprend au minimum :",
        color: "bg-secondary",
        shadow: "shadow-secondary/20",
        list: ["Une Présidente", "Une Secrétaire Générale", "Une Trésorière Générale"],
        note: "Les fonctions exercées sont bénévoles.",
    },
]

const resources = [
    {
        icon: <Coins className="h-5 w-5" strokeWidth={1.5} />,
        text: "Des cotisations des membres",
    },
    {
        icon: <CreditCard className="h-5 w-5" strokeWidth={1.5} />,
        text: "De la vente des cartes de membre",
    },
    {
        icon: <HandHeart className="h-5 w-5" strokeWidth={1.5} />,
        text: "Des contributions volontaires",
    },
]

export function Governance() {
    return (
        <SectionWrapper className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                {/* Governance Structure */}
                <MotionWrapper direction="left">
                    <span className="inline-block mb-3 text-xs font-medium tracking-widest uppercase text-accent">
                        Organisation interne
                    </span>
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl mb-10">
                        Gouvernance
                    </h2>
                    <div className="relative space-y-5">
                        {/* Connecting vertical line */}
                        <div className="absolute left-[30px] sm:left-[33px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/20 via-accent/30 to-secondary/20 hidden sm:block" />

                        {governanceItems.map((item, index) => (
                            <MotionWrapper key={item.title} delay={index * 150} direction="left">
                                <div className="group relative flex gap-5 sm:gap-6 p-6 sm:p-8 bg-white rounded-[1.5rem] border border-border/40 hover:border-primary/20 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                                    {/* Top gradient line on hover */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="flex flex-col items-center shrink-0">
                                        {/* Step number badge */}
                                        <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent text-[11px] font-bold">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                        {/* Icon */}
                                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg ${item.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className="min-w-0 pt-1">
                                        <h3 className="font-serif text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                        {item.list && (
                                            <ul className="mt-4 space-y-2 ml-0.5">
                                                {item.list.map((li) => (
                                                    <li key={li} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                                        <div className="h-2 w-2 rounded-full bg-accent/70 shrink-0" />
                                                        {li}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {item.note && (
                                            <div className="mt-4 inline-block px-3 py-1.5 rounded-full bg-accent/10 text-xs font-semibold text-accent italic">
                                                {item.note}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </MotionWrapper>

                {/* Principles and Resources */}
                <MotionWrapper delay={200} direction="right">
                    <div className="relative bg-gradient-to-br from-primary to-[#0a2d22] rounded-[2rem] p-8 sm:p-10 lg:p-12 h-full overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent/10 blur-2xl translate-y-1/3 -translate-x-1/4" />

                        <div className="relative">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-accent shadow-lg shadow-black/10">
                                    <Scale className="h-7 w-7" strokeWidth={1.5} />
                                </div>
                                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                    Principes fondamentaux
                                </h2>
                            </div>
                            <div className="space-y-5 text-[15px] text-white/80 leading-relaxed">
                                <p>
                                    L'Amicale est ouverte à toute personne acceptant ses statuts et son règlement intérieur.
                                </p>
                                <div className="relative pl-5 border-l-2 border-accent/60 bg-white/5 backdrop-blur-sm rounded-r-xl py-4 pr-5">
                                    <p className="text-white/90">
                                        Elle exerce ses activités dans le respect des convictions individuelles et dans une stricte <strong className="text-accent">indépendance vis-à-vis des partis politiques</strong>. Toute activité politique, religieuse ou syndicale est interdite en son sein.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/15">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                                        <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-white">
                                        Ressources
                                    </h3>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {resources.map((res) => (
                                        <li key={res.text} className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-accent shrink-0">
                                                {res.icon}
                                            </div>
                                            <span className="text-sm text-white/85 font-medium">{res.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-white/50 italic">
                                    *En cas de dissolution, l'actif restant est dévolu à une œuvre laïque, conformément aux statuts.
                                </p>
                            </div>
                        </div>
                    </div>
                </MotionWrapper>

            </div>
        </SectionWrapper>
    )
}
