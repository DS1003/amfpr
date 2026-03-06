"use client"

import { Shield, Key, Loader2, Save, User as UserIcon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { changePassword, logout } from "@/lib/actions/auth"
import { useTransition, useState } from "react"
import { toast } from "sonner"
import { useSession } from "lucia/react" // Wait, I don't have this, I'll pass the user from the server component.

export default function SettingsPage({ user }: { user: any }) {
    const [isPending, startTransition] = useTransition()

    const handlePasswordChange = async (formData: FormData) => {
        const newPass = formData.get("newPassword") as string
        const confirm = formData.get("confirmPassword") as string

        if (newPass !== confirm) {
            toast.error("Les nouveaux mots de passe ne correspondent pas")
            return
        }

        startTransition(async () => {
            const result = await changePassword(user.id, formData)
            if (result.success) {
                toast.success("Mot de passe mis à jour !")
                // Clear the form
                const form = document.querySelector('form') as HTMLFormElement
                form?.reset()
            } else if (result.error) {
                toast.error(result.error)
            }
        })
    }

    return (
        <div className="space-y-8 pb-10 max-w-4xl">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Système</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Paramètres du compte</h1>
                <p className="mt-2 text-muted-foreground">Gérez vos informations de sécurité et vos préférences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-12">
                    <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="size-20 rounded-2xl bg-secondary flex items-center justify-center text-primary border border-border">
                                <UserIcon className="size-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary">{user.name || "Administrateur"}</h3>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <span className="inline-block mt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 rounded-full">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password Change */}
                <div className="lg:col-span-7">
                    <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Key className="size-5 text-accent" />
                            <h3 className="font-serif text-xl font-bold text-primary">Changer le mot de passe</h3>
                        </div>

                        <form action={handlePasswordChange} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="old" className="text-xs font-bold uppercase tracking-widest text-primary/70">Mot de passe actuel</label>
                                    <input
                                        id="old"
                                        name="oldPassword"
                                        type="password"
                                        required
                                        className="w-full px-5 py-4 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0 outline-hidden"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="new" className="text-xs font-bold uppercase tracking-widest text-primary/70">Nouveau mot de passe</label>
                                    <input
                                        id="new"
                                        name="newPassword"
                                        type="password"
                                        required
                                        minLength={8}
                                        className="w-full px-5 py-4 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0 outline-hidden"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="confirm" className="text-xs font-bold uppercase tracking-widest text-primary/70">Confirmez le nouveau mot de passe</label>
                                    <input
                                        id="confirm"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="w-full px-5 py-4 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0 outline-hidden"
                                    />
                                </div>
                            </div>

                            <Button
                                disabled={isPending}
                                className="w-full bg-primary hover:bg-primary/90 rounded-2xl h-14 text-sm font-bold tracking-wide transition-all shadow-lg"
                            >
                                {isPending ? <Loader2 className="size-4 animate-spin" /> : (
                                    <>
                                        <Save className="size-4 mr-2" />
                                        Mettre à jour le mot de passe
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Session Info / Help */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-secondary/30 p-8 rounded-3xl border border-transparent space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Conseils de sécurité</h4>
                        <ul className="text-sm text-muted-foreground space-y-3 list-disc pl-4">
                            <li>Utilisez au moins 8 caractères.</li>
                            <li>Incluez des chiffres et des symboles.</li>
                            <li>Évitez d'utiliser le même mot de passe pour plusieurs comptes.</li>
                        </ul>
                    </div>

                    <div className="bg-accent/5 p-8 rounded-3xl border border-accent/10">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-accent">Besoin d'aide ?</h4>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            Si vous rencontrez des difficultés pour gérer votre compte, veuillez contacter le support technique institutionnel.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
