"use server"

import prisma from "@/lib/prisma"
import { getSession } from "./auth"

export async function globalSearch(query: string) {
    const { user } = await getSession()
    if (!user) throw new Error("Non autorisé")

    if (!query || query.length < 2) return []

    const [activities, galeries, videos] = await Promise.all([
        prisma.activity.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: 5
        }),
        prisma.gallery.findMany({
            where: {
                title: { contains: query, mode: 'insensitive' }
            },
            take: 5
        }),
        prisma.video.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: 5
        })
    ])

    const results = [
        ...activities.map((a: any) => ({ id: a.id, title: a.title, type: 'Article', href: `/admin/activites/${a.id}/modifier` })),
        ...galeries.map((g: any) => ({ id: g.id, title: g.title, type: 'Galerie', href: `/admin/galeries/${g.id}/modifier` })),
        ...videos.map((v: any) => ({ id: v.id, title: v.title, type: 'Vidéo', href: `/admin/galeries/videos/${v.id}/modifier` }))
    ]

    return results
}
