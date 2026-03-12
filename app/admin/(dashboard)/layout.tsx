import { redirect } from "next/navigation"
import { getSession } from "@/lib/actions/auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminPageWrapper } from "@/components/admin/admin-page-wrapper"
import { getUnreadCount } from "@/lib/actions/message"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

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
        <div className="flex min-h-screen bg-[#FAF9F6]">
            {/* Sidebar */}
            <AdminSidebar unreadCount={unreadCount} />

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
                <footer className="px-8 lg:px-12 py-6 border-t border-border/40 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 text-center lg:text-left">
                    &copy; {new Date().getFullYear()} AMFPR Administration • Excellence & Engagement Communautaire
                </footer>
            </div>
        </div>
    )
}
