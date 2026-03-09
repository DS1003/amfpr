import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EventForm } from "@/components/admin/event-form"
import { createEvent } from "@/lib/actions/event"

export default function NewEventPage() {
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
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Nouvel événement</h1>
                <p className="mt-2 text-muted-foreground">Remplissez les informations pour ajouter un événement à l'agenda.</p>
            </div>

            <EventForm action={createEvent} />
        </div>
    )
}
