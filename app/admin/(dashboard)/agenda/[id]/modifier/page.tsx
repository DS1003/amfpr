import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { EventForm } from "@/components/admin/event-form"
import { updateEvent } from "@/lib/actions/event"

interface EditEventPageProps {
    params: {
        id: string
    }
}

export default async function EditEventPage({ params }: EditEventPageProps) {
    const event = await prisma.event.findUnique({
        where: { id: params.id },
    })

    if (!event) {
        notFound()
    }

    const updateEventWithId = updateEvent.bind(null, event.id)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <Link
                    href="/admin/agenda"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
                >
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Retour à l'agenda</span>
                </Link>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Planification</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Modifier l'événement</h1>
                <p className="mt-2 text-muted-foreground">Modifier les informations de l'événement "{event.title}".</p>
            </div>

            <EventForm
                initialData={event}
                action={updateEventWithId}
            />
        </div>
    )
}
