"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react"

export function EventBanner() {
    return (
        <section className="py-8 bg-[#FAF8F5]">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[2rem] bg-white border border-border/50 shadow-2xl flex flex-col md:flex-row"
                >
                    {/* Background Decorative Gradient */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />

                    {/* Left Content */}
                    <div className="flex-1 p-8 sm:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-accent font-bold tracking-widest uppercase text-xs mb-4 font-serif italic">
                            <Sparkles className="size-4" />
                            <span>Activité Spéciale</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
                            COMMÉMORATION <br />
                            <span className="text-accent underline decoration-accent/30 underline-offset-8 italic">de la Journée de la femme</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                                    <Calendar className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Date</p>
                                    <p className="text-lg font-bold text-primary">Samedi 14 Mars 2026</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                                    <Clock className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Heure</p>
                                    <p className="text-lg font-bold text-primary">11 Heures</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 sm:col-span-2">
                                <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                                    <MapPin className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Lieu</p>
                                    <p className="text-lg font-bold text-primary">Hôtel Terrou Bi, Dakar</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-accent" />
                            <p className="text-sm font-medium text-primary/70">Une initiative de l&apos;Amicale des Femmes de la Présidence</p>
                        </div>
                    </div>

                    {/* Right Image/Visual */}
                    <div className="w-full md:w-[45%] lg:w-[40%] bg-black relative min-h-[300px] md:min-h-full overflow-hidden">
                        {/* If we had the image, we would use it here. For now, a stylized placeholder with the group photo if available */}
                        <Image
                            src="/images/hero-group.jpg"
                            alt="Commémoration Journée de la femme"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent md:block hidden" /> */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                        <div className="absolute bottom-8 left-8 right-8 text-white z-20">
                            <p className="font-serif italic text-2xl font-bold leading-tight">
                                "Solidarité et Engagement pour l&apos;autonomisation"
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
