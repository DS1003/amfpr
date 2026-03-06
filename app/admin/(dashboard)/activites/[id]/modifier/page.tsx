import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { ArticleForm } from "@/components/admin/article-form"
import { updateActivity } from "@/lib/actions/activity"

export default async function ModifierArticlePage({ params }: { params: { id: string } }) {
    const { id } = await params
    const activity = await prisma.activity.findUnique({
        where: { id },
    })

    if (!activity) {
        notFound()
    }

    const updateWithId = updateActivity.bind(null, id)

    return (
        <div className="space-y-8 pb-10">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Édition</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Modifier l'activité</h1>
                <p className="mt-2 text-muted-foreground">Mettez à jour les informations de cet article.</p>
            </div>

            <ArticleForm initialData={activity} action={updateWithId} />
        </div>
    )
}
