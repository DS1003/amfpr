"use client"

import { Calendar, FileText, MessageSquare, Users, ArrowUpRight, Plus, Rocket, TrendingUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export default function AdminDashboard() {
    return (
        <div className="space-y-12">
            {/* Header Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-end justify-between"
            >
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-accent" />
                        <span className="text-[11px] font-black tracking-[0.3em] uppercase text-accent animate-pulse">Live</span>
                    </div>
                    <h1 className="font-serif text-4xl font-bold text-primary tracking-tight">Bonjour !</h1>
                    <p className="mt-2 text-muted-foreground font-medium">Voici ce qui se passe aujourd'hui à l'AFPR.</p>
                </div>
                <div className="flex gap-4">
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl px-6 h-12 font-bold shadow-lg shadow-accent/10 transition-all hover:scale-105 active:scale-95">
                        <Link href="/admin/activites/nouveau">
                            <Plus className="mr-2 size-4" />
                            Poster une Mise à jour
                        </Link>
                    </Button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <StatsCard variants={item} icon={Calendar} label="Activités" value="12" growth="+2 ce mois" />
                <StatsCard variants={item} icon={FileText} label="Publications" value="8" growth="+1 cette semaine" />
                <StatsCard variants={item} icon={MessageSquare} label="Messages" value="24" growth="3 non lus" color="accent" />
                <StatsCard variants={item} icon={Users} label="Membres" value="156" growth="+12 ce trimestre" />
            </motion.div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main feed */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-8 bg-white rounded-3xl border border-border/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                >
                    <div className="p-8 border-b border-border/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                <Rocket className="size-5" />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-primary">Activités récentes</h3>
                        </div>
                        <Link href="/admin/activites" className="text-sm font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5 group">
                            Voir tout l'historique
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>
                    <div className="divide-y divide-border/60">
                        {[
                            { title: "Campagne de Sensibilisation Octobre Rose", status: "Publié", time: "il y a 2h" },
                            { title: "Réunion du bureau exécutif", status: "Brouillon", time: "hier à 14:20" },
                            { title: "Collecte de dons pour l'éducation", status: "Publié", time: "il y a 2 jours" },
                        ].map((act, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 10 }}
                                className="p-6 cursor-pointer group flex items-center gap-5"
                            >
                                <div className="size-14 rounded-2xl bg-secondary/50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors group-hover:text-white">
                                    <Calendar className="size-6 transition-transform group-hover:scale-110" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-bold text-primary truncate group-hover:text-accent transition-colors">{act.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                        <TrendingUp className="size-3 text-accent" />
                                        Modifié {act.time}
                                    </p>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${act.status === 'Publié' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600'}`}>
                                    {act.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Side Feed */}
                <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-4 space-y-8"
                >
                    {/* Message Card */}
                    <div className="bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <Sparkles className="absolute -top-4 -right-4 size-24 text-white/10 group-hover:rotate-12 transition-transform duration-1000" />
                        <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-3">
                            Messages
                            <span className="flex size-2 bg-accent rounded-full animate-ping" />
                        </h3>
                        <div className="space-y-4 relative z-10">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-colors cursor-pointer">
                                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Mme Diop • 10:15</p>
                                    <p className="text-sm font-medium line-clamp-1">Nouvelle demande de sponsoring pour le gala...</p>
                                </div>
                            ))}
                        </div>
                        <Button asChild variant="link" className="mt-6 p-0 h-auto text-white/60 hover:text-white font-bold group">
                            <Link href="/admin/messages" className="flex items-center gap-2">
                                Accéder à la messagerie <ArrowUpRight className="size-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Quick Stats Summary */}
                    <div className="bg-white p-8 rounded-3xl border border-border/60 shadow-sm space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Analytique Rapide</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-primary">Taux d'engagement</span>
                                <span className="text-accent font-bold">84%</span>
                            </div>
                            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "84%" }} className="h-full bg-accent" />
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    )
}

function StatsCard({ icon: Icon, label, value, growth, color = "primary", variants }: { icon: any; label: string; value: string; growth: string; color?: "primary" | "accent", variants: any }) {
    return (
        <motion.div
            variants={variants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white p-6 rounded-[2.5rem] border border-border/60 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group"
        >
            <div className={`size-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${color === "accent" ? "bg-accent/10" : "bg-primary/5"}`}>
                <Icon className={`size-7 ${color === "accent" ? "text-accent" : "text-primary/70"}`} />
            </div>
            <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
                <div className="mt-2 flex items-baseline gap-4">
                    <span className="text-3xl font-black text-primary tracking-tighter">{value}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${color === 'accent' ? 'bg-accent/10 text-accent' : 'bg-emerald-50 text-emerald-600'}`}>{growth}</span>
                </div>
            </div>
        </motion.div>
    )
}

