"use client"

import { ArrowLeft, Loader2, MailCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { requestPasswordReset } from "@/lib/actions/auth"
import { useTransition, useState } from "react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const [isPending, startTransition] = useTransition()
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await requestPasswordReset(formData)
            if (result?.success) {
                setIsSent(true)
                if (result.token) {
                    toast.success(`Token de dev: ${result.token}`, { duration: 10000 })
                }
            } else if (result?.error) {
                toast.error(result.error)
            }
        })
    }

    if (isSent) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-white p-10 rounded-3xl border border-border shadow-xl space-y-6">
                        <div className="mx-auto size-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                            <MailCheck className="size-10" />
                        </div>
                        <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Email envoyé !</h1>
                        <p className="text-muted-foreground leading-relaxed">
                            Si un compte est associé à cette adresse, vous recevrez un lien de réinitialisation sous peu.
                        </p>
                        <Button asChild className="w-full bg-primary hover:bg-primary/90 rounded-2xl h-14 font-bold border-none shadow-lg">
                            <Link href="/admin/login">Retour à la connexion</Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            <Link href="/admin/login" className="absolute top-8 left-8 flex items-center gap-2 text-primary/60 hover:text-primary transition-colors group">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Retour à la connexion</span>
            </Link>

            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-center">
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Mot de passe oublié ?</h1>
                    <p className="mt-3 text-muted-foreground">Entrez votre email pour réinitialiser vos identifiants.</p>
                </div>

                <form action={handleSubmit} className="bg-white p-8 rounded-3xl border border-border shadow-xl shadow-primary/5 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-primary/70">Email Institutionnel</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="admin@afpr.org"
                                className="w-full px-5 py-4 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0 outline-hidden"
                            />
                        </div>
                    </div>

                    <Button
                        disabled={isPending}
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-2xl h-14 text-sm font-bold tracking-wide transition-all shadow-lg"
                    >
                        {isPending ? <Loader2 className="size-4 animate-spin" /> : "Envoyer le lien"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
