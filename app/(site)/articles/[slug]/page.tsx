import { notFound } from "next/navigation"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { Calendar, Tag, ArrowLeft, Quote } from "lucide-react"
import Link from "next/link"
import { SenegalStripe } from "@/components/senegal-stripe"
import { ShareButton } from "@/components/share-button"

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const activity = await prisma.activity.findUnique({
        where: { slug },
    })

    if (!activity || !activity.published) {
        notFound()
    }

    return (
        <article className="bg-[#FAF8F5]">
            <PageHeader
                badge={activity.category}
                title={activity.title}
                description={activity.description}
            />

            <SectionWrapper>
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Sidebar / Info Panel */}
                    <aside className="lg:col-span-3 order-2 lg:order-1">
                        <div className="sticky top-24 space-y-12">
                            {/* Meta Card */}
                            <div className="relative p-8 rounded-3xl bg-white border border-border shadow-sm overflow-hidden group">
                                <div className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="size-11 rounded-2xl bg-secondary/50 flex items-center justify-center shrink-0">
                                                <Calendar className="size-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Date de publication</p>
                                                <p className="text-base font-bold text-primary">
                                                    {new Date(activity.date).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="size-11 rounded-2xl bg-secondary/50 flex items-center justify-center shrink-0">
                                                <Tag className="size-5 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Catégorie</p>
                                                <p className="text-base font-bold text-primary">{activity.category}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <SenegalStripe className="h-1 rounded-full opacity-60" />

                                    <div className="pt-2">
                                        <ShareButton
                                            title={activity.title}
                                            text={activity.description || ""}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="px-4">
                                <Link
                                    href="/articles"
                                    className="group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent hover:text-primary transition-all"
                                >
                                    <div className="size-10 rounded-full border border-accent/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <ArrowLeft className="size-4" />
                                    </div>
                                    <span>Tous nos articles</span>
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 order-1 lg:order-2">
                        <div className="space-y-12">
                            {/* Introduction / Chapeau */}
                            <div className="relative">
                                <Quote className="absolute -top-10 -left-10 size-20 text-secondary/40 -z-10 rotate-180" />
                                <p className="text-xl md:text-2xl font-serif font-medium text-primary leading-relaxed italic border-l-4 border-accent pl-8 py-2">
                                    {activity.description}
                                </p>
                            </div>

                            {/* Featured Image */}
                            {activity.image && (
                                <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border group">
                                    <Image
                                        src={activity.image}
                                        alt={activity.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </div>
                            )}

                            {/* Rich Content Area */}
                            <div className="article-body">
                                <div
                                    className="prose prose-lg prose-primary max-w-none 
                                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary prose-headings:tracking-tight
                                    prose-p:text-muted-foreground prose-p:leading-[1.9] prose-p:text-lg prose-p:mb-8
                                    prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-border prose-img:my-16
                                    prose-strong:text-primary prose-strong:font-bold
                                    prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                    prose-blockquote:border-l-4 prose-blockquote:border-l-accent prose-blockquote:bg-secondary/10 prose-blockquote:p-10 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:text-primary/90 prose-blockquote:my-12
                                    prose-li:text-muted-foreground prose-li:leading-relaxed prose-li:mb-4
                                    prose-ul:list-disc prose-ol:list-decimal"
                                    dangerouslySetInnerHTML={{ __html: activity.content || "" }}
                                />
                            </div>

                            {/* Footer Signature */}
                            <div className="pt-12 mt-12 border-t border-border flex items-center justify-between opacity-60">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                                    &copy; {new Date().getFullYear()} AMFPR - Communication
                                </p>
                                <SenegalStripe className="w-24 h-1 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </article>
    )
}
