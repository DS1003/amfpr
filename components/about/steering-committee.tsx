import Image from "next/image"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"

const committeeMembers = [
    {
        name: "Mme Racky NDONGO",
        role: "Présidente de la Commission Organisation",
        image: "/placeholder-user.jpg",
    },
    {
        name: "Mme Marie Jeanne NDOYE",
        role: "Présidente de la Commission Communication",
        image: "/placeholder-user.jpg",
    },
    {
        name: "Mme Nafissatou Fall YOUM",
        role: "Présidente de la Commission Sociale",
        image: "/placeholder-user.jpg",
    },
    {
        name: "Mme Awa GUÈYE",
        role: "Présidente de la Commission Formation",
        image: "/placeholder-user.jpg",
    },
]

export function SteeringCommittee() {
    return (
        <SectionWrapper className="pt-8 sm:pt-16">
            <MotionWrapper>
                <div className="text-center mb-16">
                    <span className="inline-block mb-4 text-xs font-medium tracking-widest uppercase text-accent">
                        Le Comité Directeur
                    </span>
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl text-balance">
                        {"Les Présidentes de Commission"}
                    </h2>
                    <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
                        {
                            "Des responsables dévouées à la tête de nos différentes commissions pour coordonner nos actions."
                        }
                    </p>
                </div>
            </MotionWrapper>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {committeeMembers.map((member, index) => (
                    <MotionWrapper key={member.name} delay={index * 100}>
                        <div className="group text-center">
                            <div className="relative mx-auto mb-6 h-56 w-56 overflow-hidden rounded-2xl">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="224px"
                                />
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                            </div>
                            <h3 className="font-serif text-lg font-semibold text-primary">
                                {member.name}
                            </h3>
                            <p className="mt-1 text-sm text-accent font-medium">
                                {member.role}
                            </p>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </SectionWrapper>
    )
}
