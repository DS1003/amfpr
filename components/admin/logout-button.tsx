"use client"

import { logout } from "@/lib/actions/auth"
import { LogOut, Loader2 } from "lucide-react"
import { useTransition } from "react"

export function LogoutButton() {
    const [isPending, startTransition] = useTransition()

    const handleLogout = () => {
        startTransition(async () => {
            await logout()
        })
    }

    return (
        <button
            disabled={isPending}
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-primary-foreground/70 hover:text-white group disabled:opacity-50"
        >
            {isPending ? (
                <Loader2 className="size-5 animate-spin" />
            ) : (
                <LogOut className="size-5 transition-transform group-hover:-translate-x-1" />
            )}
            <span className="text-sm font-medium">Déconnexion</span>
        </button>
    )
}
