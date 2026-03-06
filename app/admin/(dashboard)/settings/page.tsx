import { redirect } from "next/navigation"
import { getSession } from "@/lib/actions/auth"
import SettingsClient from "@/components/admin/settings-client"

export default async function SettingsPage() {
    const { user } = await getSession()

    if (!user) {
        redirect("/admin/login")
    }

    return (
        <SettingsClient user={user} />
    )
}
