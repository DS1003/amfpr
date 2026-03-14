'use client'

import React, { useState } from "react"
import { Trash, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface DeleteButtonProps {
    id: string
    action: (id: string) => Promise<any>
    title?: string
    description?: string
}

export function DeleteButton({ id, action, title = "Supprimer cet élément ?", description = "Cette action est irréversible. Toutes les données associées seront définitivement supprimées." }: DeleteButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            await action(id)
            toast.success("Suppression réussie")
            setIsOpen(false)
        } catch (error) {
            console.error(error)
            toast.error("Erreur lors de la suppression")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-red-50 hover:text-red-600 size-8 text-red-500">
                    <Trash className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] border-white/60 bg-white/80 backdrop-blur-xl shadow-2xl sm:max-w-[425px]">
                <DialogHeader className="space-y-4 pt-4">
                    <div className="mx-auto size-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
                        <AlertCircle className="size-8" />
                    </div>
                    <div className="space-y-2 text-center">
                        <DialogTitle className="font-serif text-2xl font-bold text-primary">{title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground font-medium">
                            {description}
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <DialogFooter className="flex gap-3 pt-6 pb-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 rounded-xl h-12 font-bold uppercase tracking-wider text-muted-foreground hover:bg-secondary"
                    >
                        Annuler
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isLoading}
                        onClick={handleDelete}
                        className="flex-1 rounded-xl h-12 font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                    >
                        {isLoading ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            "Confirmer"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
