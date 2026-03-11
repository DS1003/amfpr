'use client'

import { useState } from "react"
import { Trash, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteEvent } from "@/lib/actions/event"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteEventButtonProps {
    id: string
    title: string
}

export function DeleteEventButton({ id, title }: DeleteEventButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteEvent(id)
            toast.success("Événement supprimé")
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors de la suppression")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-red-50 hover:text-red-600 size-8 text-red-500">
                    {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash className="size-4" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl border-border bg-white text-primary">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-serif font-bold">Supprimer l'événement ?</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        Êtes-vous sûr de vouloir supprimer "<strong>{title}</strong>" ? Cette action est irréversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl border-border">Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault()
                            handleDelete()
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                    >
                        {isDeleting ? "Suppression..." : "Supprimer"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
