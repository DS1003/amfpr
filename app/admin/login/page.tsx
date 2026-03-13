"use client"

import { Shield, ArrowLeft, Loader2, Eye, EyeOff, Lock, Mail as MailIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { login } from "@/lib/actions/auth"
import { useTransition, useState } from "react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminLoginPage() {
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await login(formData)
            if (result?.error) {
                toast.error(result.error)
            }
        })
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Elegant Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary z-50" />
            
            {/* Animated Decorative Blobs */}
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, #0E3B2E 1px, transparent 0)",
                    backgroundSize: "40px 40px"
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-8 left-8"
            >
                <Link href="/" className="flex items-center gap-2 text-primary/60 hover:text-primary transition-all duration-300 group font-bold tracking-tight">
                    <div className="size-8 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow group-hover:scale-110 transition-all">
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                    <span className="text-xs uppercase tracking-widest">Retour au site</span>
                </Link>
            </motion.div>

            <div className="w-full max-w-sm relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-10"
                >
                    <div className="relative mx-auto size-20 mb-6 group">
                        <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative size-20 rounded-[2rem] bg-primary flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:rotate-12">
                            <span className="font-serif text-2xl font-bold text-primary-foreground tracking-tighter">AMF</span>
                        </div>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Espace Admin</h1>
                    <p className="mt-3 text-muted-foreground text-sm font-medium">Accès sécurisé réservé au personnel de l'AMFPR.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <form action={handleSubmit} className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.04)] space-y-7 relative overflow-hidden">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 ml-1">Email Personnel</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors">
                                        <MailIcon className="size-4" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="admin@amfpr.sn"
                                        className="w-full pl-12 pr-5 py-4 bg-secondary/20 border border-transparent focus:bg-white focus:border-accent/30 focus:shadow-lg focus:shadow-accent/5 rounded-2xl text-sm transition-all outline-hidden font-medium placeholder:text-primary/20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="pass" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 ml-1">Mot de passe</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors">
                                        <Lock className="size-4" />
                                    </div>
                                    <input
                                        id="pass"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-secondary/20 border border-transparent focus:bg-white focus:border-accent/30 focus:shadow-lg focus:shadow-accent/5 rounded-2xl text-sm transition-all outline-hidden font-medium placeholder:text-primary/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-xl hover:bg-primary/5 text-primary/30 hover:text-accent transition-all"
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                disabled={isPending}
                                className="group relative w-full h-15 bg-primary hover:bg-primary/95 text-white rounded-2xl font-bold tracking-wide transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {isPending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Validation...</span>
                                    </div>
                                ) : "Accéder au tableau de bord"}
                            </Button>
                        </div>


                    </form>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-center mt-12"
                >
                    <p className="text-[9px] text-primary uppercase tracking-[0.3em] font-black leading-relaxed">
                        Amicale des Femmes de la Présidence de la République<br/>
                        République du Sénégal
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
