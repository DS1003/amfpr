import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Users, Heart, Target, Lightbulb, Stethoscope, Gift, Handshake } from "lucide-react"

const MISSION_COLORS = [
    { bg: "bg-primary", shadow: "shadow-primary/20" },
    { bg: "bg-accent", shadow: "shadow-accent/20" },
    { bg: "bg-secondary", shadow: "shadow-secondary/20" },
    { bg: "bg-[#E8477D]", shadow: "shadow-[#E8477D]/20" },
]

const missions = [
    {
        icon: <Users className="h-7 w-7" strokeWidth={1.5} />,
        title: "Fédérer les femmes",
        description: "Réunir toutes les femmes employées à la Présidence de la République autour d'un idéal commun.",
    },
    {
        icon: <Heart className="h-7 w-7" strokeWidth={1.5} />,
        title: "Entraide & Solidarité",
        description: "Promouvoir l'entraide, la solidarité et la cohésion au sein de ses membres pour bâtir une grande famille.",
    },
    {
        icon: <Lightbulb className="h-7 w-7" strokeWidth={1.5} />,
        title: "Leadership féminin",
        description: "Développer le leadership, l'autonomie et les capacités professionnelles des femmes.",
    },
    {
        icon: <Target className="h-7 w-7" strokeWidth={1.5} />,
        title: "Initiatives sociales",
        description: "Soutenir et mettre en œuvre des initiatives sociales et communautaires à fort impact.",
    },
]

const ACTION_COLORS = [
    { bg: "bg-secondary", shadow: "shadow-secondary/20" },
    { bg: "bg-accent", shadow: "shadow-accent/20" },
    { bg: "bg-primary", shadow: "shadow-primary/20" },
    { bg: "bg-[#9B59B6]", shadow: "shadow-[#9B59B6]/20" },
]

const actions = [
    {
        icon: <Stethoscope className="h-6 w-6" strokeWidth={1.5} />,
        title: "Sensibilisation et Santé",
        description: "Campagnes de dépistage des cancers avec la Ligue Sénégalaise contre le Cancer (LISCA).",
    },
    {
        icon: <Gift className="h-6 w-6" strokeWidth={1.5} />,
        title: "Dons et Soutien",
        description: "Distribution de produits alimentaires et phytosanitaires à des structures nécessiteuses (INEFJA, Maison Rose de Guédiawaye, Hôpital Dalal Jamm, Maison de l'Espoir...).",
    },
    {
        icon: <Users className="h-6 w-6" strokeWidth={1.5} />,
        title: "Célébration du 8 mars",
        description: "Actions sociales phares menées chaque année pour marquer la Journée internationale des droits des femmes.",
    },
    {
        icon: <Handshake className="h-6 w-6" strokeWidth={1.5} />,
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
                            L'association constitue un cadre structuré de concertation, d'échange et d'entraide au sein de la haute administration.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {missions.map((item, index) => (
                        <MotionWrapper key={item.title} delay={index * 120} direction="up">
                            <div className="group relative flex flex-col items-center p-8 sm:p-10 bg-white rounded-[2rem] border border-border/40 hover:border-primary/15 hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 text-center h-full overflow-hidden">
                                {/* Top gradient line */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {/* Background flair */}
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-secondary/5 blur-2xl group-hover:bg-secondary/10 transition-all duration-700" />

                                <div className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${MISSION_COLORS[index].bg} text-white shadow-lg ${MISSION_COLORS[index].shadow} group-hover:scale-110 transition-transform duration-500`}>
                                    {item.icon}
                                </div>
                                <h3 className="relative font-serif text-lg font-bold text-primary mb-3">
                                    {item.title}
                                </h3>
                                <p className="relative text-sm text-muted-foreground leading-relaxed">
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
                            Dans le cadre de ses activités, l'Amicale s'engage activement auprès des communautés à travers diverses initiatives.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {actions.map((item, index) => (
                        <MotionWrapper key={item.title} delay={index * 120}>
                            <div className="group relative flex flex-col sm:flex-row gap-5 p-7 sm:p-8 bg-white rounded-[1.5rem] border border-border/40 hover:border-accent/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 h-full overflow-hidden">
                                {/* Left accent line */}
                                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-accent via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${ACTION_COLORS[index].bg} text-white shadow-lg ${ACTION_COLORS[index].shadow} shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-serif text-[17px] font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
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
