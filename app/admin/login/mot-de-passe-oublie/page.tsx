"use client"

import { ArrowLeft, Loader2, MailCheck, Mail as MailIcon, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { requestPasswordReset } from "@/lib/actions/auth"
import { useTransition, useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function ForgotPasswordPage() {
    const [isPending, startTransition] = useTransition()
    const [isSent, setIsSent] = useState(false)
    const [devToken, setDevToken] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await requestPasswordReset(formData)
            if (result?.success) {
                setIsSent(true)
                if (result.token) {
                    setDevToken(result.token)
                    toast.success(`Token (DEV ONLY): ${result.token}`, { duration: 15000 })
                }
            } else if (result?.error) {
                toast.error(result.error)
            }
        })
    }

    if (isSent) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary z-50" />
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[80px]" />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-8 relative z-10"
                >
                    <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.04)] space-y-7 group">
                        <div className="mx-auto size-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2 transition-transform duration-500 group-hover:scale-110">
                            <MailCheck className="size-12" />
                        </div>
                        <div>
                            <h1 className="font-serif text-3xl font-bold text-primary tracking-tight mb-4">Email Envoyé !</h1>
                            <p className="text-muted-foreground font-medium leading-relaxed">
                                Si l'adresse mail est valide, vous recevrez un lien de réinitialisation d'ici quelques instants.
                            </p>
                        </div>
                        
                        {devToken && (
                            <div className="mt-8 p-6 bg-accent/5 rounded-2xl border border-accent/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Simulateur de Mail (Dev mode)</p>
                                <Link 
                                    href={`/admin/login/reinitialiser/${devToken}`}
                                    className="text-xs font-bold text-primary underline underline-offset-4 hover:text-accent transition-colors"
                                >
                                    Cliquer ici pour réinitialiser (Lien du mail)
                                </Link>
                            </div>
                        )}

                        <Button asChild className="w-full bg-primary hover:bg-primary/95 rounded-2xl h-14 font-bold shadow-xl shadow-primary/10 transition-all hover:-translate-y-0.5">
                            <Link href="/admin/login">Retour à la connexion</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary z-50" />
            
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-8 left-8"
            >
                <Link href="/admin/login" className="flex items-center gap-2 text-primary/60 hover:text-primary transition-all duration-300 group font-bold">
                    <div className="size-8 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:scale-110">
                        <ArrowLeft className="size-4" />
                    </div>
                    <span className="text-xs uppercase tracking-widest">Connexion</span>
                </Link>
            </motion.div>

            <div className="w-full max-w-sm relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Accès perdu ?</h1>
                    <p className="mt-3 text-muted-foreground text-sm font-medium">Récupérez vos accès en quelques secondes.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <form action={handleSubmit} className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.04)] space-y-7">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 ml-1">Email Institutionnel</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors">
                                        <MailIcon className="size-4" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="votre@amfpr.sn"
                                        className="w-full pl-12 pr-5 py-4 bg-secondary/20 border border-transparent rounded-2xl text-sm transition-all focus:bg-white focus:border-accent/30 font-medium outline-hidden"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            disabled={isPending}
                            className="group w-full h-15 bg-accent hover:bg-accent/95 text-accent-foreground rounded-2xl font-bold tracking-wide transition-all shadow-xl shadow-accent/20 hover:-translate-y-0.5"
                        >
                            {isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <div className="flex items-center justify-center gap-3">
                                    <span>Générer un lien</span>
                                    <Send className="size-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            )}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}
