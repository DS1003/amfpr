"use client"

import { Shield, Key, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { resetPassword } from "@/lib/actions/auth"
import { useTransition, useState, use } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage({ params: paramsPromise }: { params: Promise<{ token: string }> }) {
    const params = use(paramsPromise)
    const [isPending, startTransition] = useTransition()
    const [isDone, setIsDone] = useState(false)
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const pass = formData.get("password") as string
        const confirm = formData.get("confirm") as string

        if (pass !== confirm) {
            toast.error("Les mots de passe ne correspondent pas")
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
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="bg-white p-12 rounded-3xl border border-border shadow-xl space-y-6 max-w-md animate-in zoom-in-95 duration-500">
                    <div className="mx-auto size-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                        <CheckCircle2 className="size-10" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary">C'est fait !</h1>
                    <p className="text-muted-foreground">Votre mot de passe a été réinitialisé avec succès. Redirection en cours...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-center">
                    <div className="mx-auto size-16 rounded-full bg-accent flex items-center justify-center shadow-xl mb-6">
                        <Key className="size-8 text-accent-foreground" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Nouveau mot de passe</h1>
                    <p className="mt-3 text-muted-foreground">Choisissez un mot de passe robuste et sécurisé.</p>
                </div>

                <form action={handleSubmit} className="bg-white p-8 rounded-3xl border border-border shadow-xl shadow-primary/5 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="pass" className="text-xs font-bold uppercase tracking-widest text-primary/70">Nouveau mot de passe</label>
                            <input
                                id="pass"
                                name="password"
                                type="password"
                                required
                                minLength={8}
                                placeholder="••••••••"
                                className="w-full px-5 py-4 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0 outline-hidden"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirm" className="text-xs font-bold uppercase tracking-widest text-primary/70">Confirmez le mot de passe</label>
                            <input
                                id="confirm"
                                name="confirm"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-5 py-4 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0 outline-hidden"
                            />
                        </div>
                    </div>

                    <Button
                        disabled={isPending}
                        className="w-full bg-primary hover:bg-primary/90 rounded-2xl h-14 text-sm font-bold tracking-wide transition-all shadow-lg"
                    >
                        {isPending ? <Loader2 className="size-4 animate-spin" /> : "Réinitialiser mon mot de passe"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
