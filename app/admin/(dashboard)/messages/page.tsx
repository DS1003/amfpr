import { getMessages } from "@/lib/actions/message"
import { MessagesClient } from "@/components/admin/messages-client"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Messages | Panel Administration',
    description: 'Gestion des messages de contact institutionnels.',
}

export default async function MessagesPage() {
    const messages = await getMessages()

    return (
        <MessagesClient initialMessages={messages} />
    )
}
