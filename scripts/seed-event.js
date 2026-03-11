const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const eventDate = new Date('2026-03-14T11:00:00')

    const existingEvent = await prisma.event.findFirst({
        where: {
            title: {
                contains: 'COMMÉMORATION'
            },
            date: eventDate
        }
    })

    if (existingEvent) {
        console.log('Event already exists')
        return
    }

    await prisma.event.create({
        data: {
            title: 'COMMÉMORATION de la Journée de la femme',
            description: "L'Amicale des Femmes de la Présidence de la République célèbre la force et le leadership féminin lors d'une cérémonie de commémoration exceptionnelle à l'Hôtel Terrou-Bi. Au programme : échanges, solidarité et engagement citoyen.",
            date: eventDate,
            location: 'Hôtel Terrou Bi, Dakar',
            category: 'Officiel',
            published: true,
            image: '/images/hero-group.jpg' // Using group photo as placeholder
        }
    })

    console.log('Event created successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
