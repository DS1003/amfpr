import { ArticleForm } from "@/components/admin/article-form"
import { createActivity } from "@/lib/actions/activity"

export default function NouveauArticlePage() {
    return (
        <div className="space-y-8 pb-10">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">Nouveau Contenu</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">Ajouter un article</h1>
                <p className="mt-2 text-muted-foreground">Créez un nouvel article pour partager les actualités de l'amicale.</p>
            </div>

            <ArticleForm action={createActivity} />
        </div>
    )
}
