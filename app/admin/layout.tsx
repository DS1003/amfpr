import { redirect } from "next/navigation"
import { Shield, LayoutDashboard, FileText, Calendar, MessageSquare, Settings, LogOut, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Authentication check (skipping logic for simplicity in layout, will add to wrap later)

    return (
        <div className="flex min-h-screen bg-[#FAF8F5]">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-primary-foreground flex flex-col fixed h-full z-30">
                <div className="p-6 border-b border-primary-foreground/10">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="size-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-serif font-bold transition-transform group-hover:scale-105">
                            AF
                        </div>
                        <div>
                            <h2 className="font-serif font-bold text-lg leading-tight">AFPR</h2>
                            <p className="text-[10px] uppercase tracking-widest text-primary-foreground/50">Panel Admin</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <AdminNavLink href="/admin" icon={LayoutDashboard} label="Tableau de bord" />
                    <AdminNavLink href="/admin/activites" icon={Calendar} label="Activités" />
                    <AdminNavLink href="/admin/publications" icon={FileText} label="Publications" />
                    <AdminNavLink href="/admin/galeries" icon={ImageIcon} label="Galeries" />
                    <AdminNavLink href="/admin/messages" icon={MessageSquare} label="Messages" />
                    <div className="pt-8 pb-2">
                        <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/30 font-semibold">Système</p>
                    </div>
                    <AdminNavLink href="/admin/settings" icon={Settings} label="Paramètres" />
                </nav>

                <div className="p-4 border-t border-primary-foreground/10">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-primary-foreground/70 hover:text-white group">
                        <LogOut className="size-5 transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-medium">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 lg:p-12">
                <div className="max-w-screen-2xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

function AdminNavLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-primary-foreground/70 hover:text-white"
        >
            <Icon className="size-5 shrink-0" />
            <span className="text-sm font-medium">{label}</span>
        </Link>
    )
}
