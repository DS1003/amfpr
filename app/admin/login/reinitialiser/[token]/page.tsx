"use client"

import { Shield, Key, Loader2, CheckCircle2, Eye, EyeOff, Lock, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { resetPassword } from "@/lib/actions/auth"
import { useTransition, useState, use } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function ResetPasswordPage({ params: paramsPromise }: { params: Promise<{ token: string }> }) {
    const params = use(paramsPromise)
    const [isPending, startTransition] = useTransition()
    const [isDone, setIsDone] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const pass = formData.get("password") as string
        const confirm = formData.get("confirm") as string

        if (pass !== confirm) {
            toast.error("Les mots de passe ne correspondent pas")
            return
        }

        if (pass.length < 8) {
            toast.error("Le mot de passe doit faire au moins 8 caractères")
            return
        }

        startTransition(async () => {
            const result = await resetPassword(params.token, formData)
            if (result?.success) {
                setIsDone(true)
                toast.success("Mot de passe mis à jour !")
                setTimeout(() => router.push("/admin/login"), 3000)
            } else if (result?.error) {
                toast.error(result.error)
            }
        })
    }

    if (isDone) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary z-50" />
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[80px]" />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 backdrop-blur-xl p-12 rounded-[2.5rem] border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.04)] space-y-7 max-w-md animate-in zoom-in-95 duration-500 relative z-10"
                >
                    <div className="mx-auto size-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2">
                        <CheckCircle2 className="size-12" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary">C'est fait !</h1>
                    <p className="text-muted-foreground font-medium">Votre mot de passe a été réinitialisé avec succès. Redirection vers la page de connexion en cours...</p>
                    
                    <div className="flex justify-center pt-4">
                        <Loader2 className="size-6 text-accent animate-spin" />
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

            <div className="w-full max-w-sm relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="mx-auto size-20 rounded-full bg-accent flex items-center justify-center shadow-2xl mb-6 ring-4 ring-white/50">
                        <Key className="size-10 text-accent-foreground" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Sécurisez votre accès</h1>
                    <p className="mt-3 text-muted-foreground text-sm font-medium">Définissez un nouveau mot de passe robuste.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <form action={handleSubmit} className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.04)] space-y-7">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="pass" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 ml-1">Nouveau mot de passe</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors">
                                        <Lock className="size-4" />
                                    </div>
                                    <input
                                        id="pass"
                                        name="password"
                                        type={showPass ? "text" : "password"}
                                        required
                                        minLength={8}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-secondary/20 border border-transparent rounded-2xl text-sm transition-all focus:bg-white focus:border-accent/30 font-medium outline-hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-xl hover:bg-primary/5 text-primary/30 hover:text-accent transition-all"
                                    >
                                        {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirm" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 ml-1">Confirmez le mot de passe</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-accent transition-colors">
                                        <Shield className="size-4" />
                                    </div>
                                    <input
                                        id="confirm"
                                        name="confirm"
                                        type={showConfirm ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-secondary/20 border border-transparent rounded-2xl text-sm transition-all focus:bg-white focus:border-accent/30 font-medium outline-hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-xl hover:bg-primary/5 text-primary/30 hover:text-accent transition-all"
                                    >
                                        {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            disabled={isPending}
                            className="group w-full h-15 bg-primary hover:bg-primary/95 text-white rounded-2xl font-bold tracking-wide transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5"
                        >
                            {isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <div className="flex items-center justify-center gap-3">
                                    <span>Mettre à jour</span>
                                    <RefreshCw className="size-4 opacity-70 group-hover:rotate-180 transition-transform duration-500" />
                                </div>
                            )}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}
