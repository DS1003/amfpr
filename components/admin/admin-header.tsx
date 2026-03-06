"use client"

import { Bell, User as UserIcon, Plus, ChevronDown } from "lucide-react"
import { AdminSearch } from "./admin-search"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/actions/auth"

export function AdminHeader({ user, unreadCount = 0 }: { user: any, unreadCount?: number }) {
    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border/50 h-20 px-8 flex items-center justify-between">
            {/* Left side - Search */}
            <div className="flex-1">
                <AdminSearch />
            </div>

            {/* Right side - Actions & User */}
            <div className="flex items-center gap-6">
                {/* Quick Add */}
                <div className="hidden md:block">
                    <Button asChild variant="outline" className="rounded-xl px-6 h-10 text-[10px] font-black uppercase tracking-widest border-accent/20 text-accent hover:bg-accent hover:text-white transition-all shadow-sm">
                        <Link href="/admin/activites/nouveau">
                            <Plus className="mr-1.5 size-3.5" />
                            Action Rapide
                        </Link>
                    </Button>
                </div>

                {/* Notifications */}
                <Link
                    href="/admin/messages"
                    className="relative size-12 rounded-2xl bg-secondary/30 hover:bg-secondary border border-transparent hover:border-border transition-all flex items-center justify-center text-primary/70 hover:text-primary active:scale-95"
                >
                    <Bell className="size-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-3 right-3 size-2 bg-accent rounded-full animate-pulse border-2 border-white" />
                    )}
                </Link>

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-border" />

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-secondary transition-all group">
                            <div className="size-10 rounded-xl bg-secondary border border-border/50 text-primary flex items-center justify-center font-serif font-bold group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <div className="hidden lg:block text-left mr-2">
                                <p className="text-sm font-bold text-primary truncate max-w-[120px]">{user?.name || "Administrateur"}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{user?.role || "Admin"}</p>
                            </div>
                            <ChevronDown className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border border-border shadow-2xl">
                        <DropdownMenuItem asChild className="rounded-xl p-3 focus:bg-secondary cursor-pointer">
                            <Link href="/admin/settings" className="flex items-center gap-3 w-full">
                                <UserIcon className="size-4 text-muted-foreground" />
                                <span className="text-sm font-semibold">Paramètres</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => logout()}
                            className="rounded-xl p-3 focus:bg-red-50 focus:text-red-600 text-red-500 cursor-pointer"
                        >
                            <span className="text-sm font-bold">Se déconnecter</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
