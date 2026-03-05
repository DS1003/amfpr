import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                    backgroundSize: "32px 32px"
                }}
            />

            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-primary/60 hover:text-primary transition-colors group">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Retour au site</span>
            </Link>

            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-center">
                    <div className="mx-auto size-16 rounded-full bg-primary flex items-center justify-center shadow-xl mb-6">
                        <span className="font-serif text-xl font-bold text-primary-foreground">AF</span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Espace Administration</h1>
                    <p className="mt-3 text-muted-foreground">Accès réservé au personnel autorisé de l'AFPR.</p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-border shadow-xl shadow-primary/5 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-primary/70">Email Institutionnel</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="admin@afpr.org"
                                className="w-full px-5 py-4 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="pass" className="text-xs font-bold uppercase tracking-widest text-primary/70">Mot de passe</label>
                            <input
                                id="pass"
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-5 py-4 bg-secondary/30 border-transparent focus:bg-white focus:border-accent rounded-2xl text-sm transition-all focus:ring-0"
                            />
                        </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-2xl h-14 text-sm font-bold tracking-wide transition-all hover:shadow-lg hover:shadow-primary/20">
                        Se connecter
                    </Button>

                    <Button variant="link" className="w-full text-xs text-muted-foreground hover:text-accent font-medium">
                        Identifiants oubliés ?
                    </Button>
                </div>

                <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium opacity-50">
                        Amicale des Femmes de la Présidence de la République
                    </p>
                </div>
            </div>
        </div>
    )
}
