import { redirect } from "next/navigation"
import { Shield, LayoutDashboard, FileText, Calendar, MessageSquare, Settings, LogOut, Image as ImageIcon, ExternalLink } from "lucide-react"
import Link from "next/link"
import { getSession } from "@/lib/actions/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper"
import { getUnreadCount } from "@/lib/actions/message"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user } = await getSession()

    if (!user) {
        redirect("/admin/login")
    }

    const unreadCount = await getUnreadCount()

    return (
        <div className="flex min-h-screen bg-[#FAF8F5]">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0E3B2E] text-white flex flex-col fixed h-full z-50">
                <div className="p-8 border-b border-white/5">
                    <Link href="/admin" className="flex items-center gap-4 group">
                        <div className="size-11 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground font-serif font-bold transition-transform group-hover:scale-110 shadow-lg shadow-accent/20">
                            AF
                        </div>
                        <div>
                            <h2 className="font-serif font-bold text-xl leading-tight tracking-tight">AFPR</h2>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Administration</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                    <div className="pb-3">
                        <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Principal</p>
                    </div>
                    <AdminNavLink href="/admin" icon={LayoutDashboard} label="Tableau de bord" />
                    <AdminNavLink href="/admin/activites" icon={FileText} label="Articles" />
                    <AdminNavLink href="/admin/galeries" icon={ImageIcon} label="Galeries" />
                    <AdminNavLink href="/admin/messages" icon={MessageSquare} label="Messages" badge={unreadCount} />

                    <div className="pt-10 pb-3">
                        <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Système</p>
                    </div>
                    <AdminNavLink href="/admin/settings" icon={Settings} label="Paramètres" />
                </nav>

                <div className="p-6 border-t border-white/5">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white/70 hover:text-white group border border-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <ExternalLink className="size-4 opacity-50 group-hover:opacity-100 transition-all" />
                            <span className="text-xs font-bold uppercase tracking-widest">Voir le Site</span>
                        </div>
                        <ArrowUpRight className="size-3 text-white/30 group-hover:text-white transition-colors" />
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-72 flex flex-col min-h-screen">
                {/* Global Admin Header */}
                <AdminHeader user={user} unreadCount={unreadCount} />

                {/* Scoped Content with Motion */}
                <main className="flex-1 p-8 lg:p-12">
                    <div className="max-w-screen-2xl mx-auto">
                        <AdminPageWrapper>
                            {children}
                        </AdminPageWrapper>
                    </div>
                </main>

                {/* Footer Signature */}
                <footer className="px-8 lg:px-12 py-6 border-t border-border/40 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center lg:text-left">
                    &copy; {new Date().getFullYear()} AMFPR Administration • Système de Gestion Institutionnelle
                </footer>
            </div>
        </div>
    )
}

function AdminNavLink({ href, icon: Icon, label, badge }: { href: string; icon: any; label: string; badge?: number }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-all text-white/60 hover:text-white group font-medium"
        >
            <Icon className="size-5 shrink-0 transition-transform group-hover:scale-110" />
            <span className="text-sm tracking-tight flex-1">{label}</span>
            {badge !== undefined && badge > 0 && (
                <span className="bg-accent text-accent-foreground text-[10px] font-black px-2 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </Link>
    )
}

function ArrowUpRight({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
    )
}
