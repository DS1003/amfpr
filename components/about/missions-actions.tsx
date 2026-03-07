import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Users, Heart, Target, Lightbulb, Stethoscope, Gift, Handshake } from "lucide-react"

const missions = [
    {
        icon: <Users className="h-6 w-6" />,
        title: "Fédérer les femmes",
        description: "Réunir toutes les femmes employées à la Présidence de la République autour d'un idéal commun.",
    },
    {
        icon: <Heart className="h-6 w-6" />,
        title: "Entraide & Solidarité",
        description: "Promouvoir l’entraide, la solidarité et la cohésion au sein de ses membres pour bâtir une grande famille.",
    },
    {
        icon: <Lightbulb className="h-6 w-6" />,
        title: "Leadership féminin",
        description: "Développer le leadership, l'autonomie et les capacités professionnelles des femmes.",
    },
    {
        icon: <Target className="h-6 w-6" />,
        title: "Initiatives sociales",
        description: "Soutenir et mettre en œuvre des initiatives sociales et communautaires à fort impact.",
    },
]

const actions = [
    {
        icon: <Stethoscope className="h-6 w-6 text-accent" />,
        title: "Sensibilisation et Santé",
        description: "Campagnes de dépistage des cancers avec la Ligue Sénégalaise contre le Cancer (LISCA).",
    },
    {
        icon: <Gift className="h-6 w-6 text-accent" />,
        title: "Dons et Soutien",
        description: "Distribution de produits alimentaires et phytosanitaires à des structures nécessiteuses (INEFJA, Maison Rose de Guédiawaye, Hôpital Dalal Jamm, Maison de l’Espoir...).",
    },
    {
        icon: <Users className="h-6 w-6 text-accent" />,
        title: "Célébration du 8 mars",
        description: "Actions sociales phares menées chaque année pour marquer la Journée internationale des droits des femmes.",
    },
    {
        icon: <Handshake className="h-6 w-6 text-accent" />,
        title: "Renforcement de capacités",
        description: "Séminaires et ateliers dédiés à la promotion du leadership et au développement personnel.",
    },
]

export function MissionsActions() {
    return (
        <SectionWrapper className="bg-secondary/5">
            {/* Missions Section */}
            <div className="mb-24">
                <MotionWrapper>
                    <div className="text-center mb-12">
                        <span className="inline-block mb-3 text-xs font-medium tracking-widest uppercase text-accent">
                            Nos objectifs
                        </span>
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
                            Missions et objectifs
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
                            L’association constitue un cadre structuré de concertation, d’échange et d’entraide au sein de la haute administration.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {missions.map((item, index) => (
                        <MotionWrapper key={item.title} delay={index * 100} direction="up">
                            <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-md hover:border-accent/30 transition-all text-center group h-full">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="font-serif text-lg font-bold text-primary mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            </div>

            {/* Actions Section */}
            <div>
                <MotionWrapper>
                    <div className="text-center mb-12">
                        <span className="inline-block mb-3 text-xs font-medium tracking-widest uppercase text-accent">
                            Sur le terrain
                        </span>
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
                            Actions et initiatives
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
                            Dans le cadre de ses activités, l’Amicale s'engage activement auprès des communautés à travers diverses initiatives.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {actions.map((item, index) => (
                        <MotionWrapper key={item.title} delay={index * 100}>
                            <div className="flex flex-col sm:flex-row gap-5 p-6 bg-white rounded-2xl shadow-sm border border-border/50 group hover:border-accent/40 transition-colors h-full">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-serif text-[17px] font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-foreground/80 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
