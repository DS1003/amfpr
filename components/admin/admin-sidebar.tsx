"use client"

import { usePathname } from "next/navigation"
import { Shield, LayoutDashboard, FileText, Calendar, MessageSquare, Settings, LogOut, Image as ImageIcon, ExternalLink, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NavItem {
    href: string
    icon: any
    label: string
    badge?: number
}

interface AdminSidebarProps {
    unreadCount: number
}

export function AdminSidebar({ unreadCount }: AdminSidebarProps) {
    const pathname = usePathname()

    const primaryLinks: NavItem[] = [
        { href: "/admin", icon: LayoutDashboard, label: "Tableau de bord" },
        { href: "/admin/activites", icon: FileText, label: "Articles" },
        { href: "/admin/galeries", icon: ImageIcon, label: "Galeries" },
        { href: "/admin/agenda", icon: Calendar, label: "Agenda" },
        { href: "/admin/messages", icon: MessageSquare, label: "Messages", badge: unreadCount },
    ]

    const systemLinks: NavItem[] = [
        { href: "/admin/settings", icon: Settings, label: "Paramètres" },
    ]

    return (
        <aside className="w-72 bg-white text-primary flex flex-col fixed h-full z-50 border-r border-border/60 shadow-sm">
            <div className="p-8 border-b border-border/60">
                <Link href="/admin" className="flex items-center gap-4 group">
                    <div className="size-11 rounded-2xl bg-secondary border border-border/50 flex items-center justify-center text-primary font-serif font-bold transition-all group-hover:scale-110 shadow-sm">
                        AF
                    </div>
                    <div>
                        <h2 className="font-serif font-bold text-xl leading-tight tracking-tight">AFPR</h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Administration</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                <div className="pb-3 px-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-black">Principal</p>
                </div>
                {primaryLinks.map((link) => (
                    <AdminNavLink key={link.href} {...link} active={pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))} />
                ))}

                <div className="pt-10 pb-3 px-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-black">Système</p>
                </div>
                {systemLinks.map((link) => (
                    <AdminNavLink key={link.href} {...link} active={pathname === link.href || pathname.startsWith(link.href)} />
                ))}
            </nav>

            <div className="p-6 border-t border-border/60">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all text-primary/70 hover:text-primary group border border-border/40 overflow-hidden relative"
                >
                    <div className="flex items-center gap-3 relative z-10">
                        <ExternalLink className="size-4 opacity-50 group-hover:opacity-100 transition-all" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Voir le Site</span>
                    </div>
                    <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-accent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
            </div>
        </aside>
    )
}

function AdminNavLink({ href, icon: Icon, label, badge, active }: NavItem & { active: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300",
                active 
                    ? "bg-primary text-white shadow-xl shadow-primary/10" 
                    : "text-muted-foreground/70 hover:bg-secondary/60 hover:text-primary"
            )}
        >
            {active && (
                <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute left-2 w-1 h-5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            
            <Icon className={cn(
                "size-5 shrink-0 transition-all duration-300",
                active 
                    ? "text-accent scale-110" 
                    : "text-muted-foreground/40 group-hover:text-accent group-hover:scale-110"
            )} />
            
            <span className={cn(
                "text-[13px] font-bold tracking-tight flex-1 transition-colors duration-300",
                active ? "text-white" : ""
            )}>
                {label}
            </span>

            {badge !== undefined && badge > 0 && (
                <span className={cn(
                    "text-[9px] font-black px-2 py-0.5 rounded-full border transition-all duration-300",
                    active 
                        ? "bg-accent text-white border-white/20" 
                        : "bg-accent/10 text-accent border-accent/20 group-hover:bg-accent group-hover:text-white"
                )}>
                    {badge}
                </span>
            )}
        </Link>
    )
}
