"use server"

import { lucia } from "@/lib/auth"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

const loginSchema = z.object({
    email: z.string().email("Format d'email invalide"),
    password: z.string().min(1, "Mot de passe requis"),
})

export async function login(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries())
    const validated = loginSchema.safeParse(rawData)

    if (!validated.success) {
        return { error: validated.error.errors[0].message }
    }

    const { email, password } = validated.data

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user || !user.passwordHash) {
        return { error: "Email ou mot de passe incorrect" }
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) {
        return { error: "Email ou mot de passe incorrect" }
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
        ; (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )

    return redirect("/admin")
}

export async function logout() {
    const sessionCookie = (await cookies()).get(lucia.sessionCookieName)
    if (!sessionCookie) return redirect("/admin/login")

    const { session } = await lucia.validateSession(sessionCookie.value)
    if (!session) return redirect("/admin/login")

    await lucia.invalidateSession(session.id)

    const blankSessionCookie = lucia.createBlankSessionCookie()
        ; (await cookies()).set(
            blankSessionCookie.name,
            blankSessionCookie.value,
            blankSessionCookie.attributes
        )

    return redirect("/admin/login")
}

export async function getSession() {
    const sessionCookie = (await cookies()).get(lucia.sessionCookieName)
    if (!sessionCookie) return { user: null, session: null }

    const result = await lucia.validateSession(sessionCookie.value)
    return result
}

export async function changePassword(id: string, formData: FormData) {
    const { user: current } = await getSession();
    if (!current || (current.id !== id && current.role !== "ADMIN")) {
        return { error: "Non autorisé" }
    }

    const oldPassword = formData.get("oldPassword") as string
    const newPassword = formData.get("newPassword") as string

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user || !user.passwordHash) return { error: "Utilisateur non trouvé" }

    const validPassword = await bcrypt.compare(oldPassword, user.passwordHash)
    if (!validPassword) return { error: "Ancien mot de passe incorrect" }

    const passwordHash = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
        where: { id },
        data: { passwordHash }
    })

    return { success: true }
}

export async function requestPasswordReset(formData: FormData) {
    const email = formData.get("email") as string
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        // Pour des raisons de sécurité, on ne dit pas si l'email existe ou non.
        return { success: true, message: "Si cet email existe, un lien de réinitialisation sera envoyé." }
    }

    const token = Math.random().toString(36).slice(-8)
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 heure

    await prisma.resetToken.create({
        data: {
            token,
            userId: user.id,
            expiresAt
        }
    })

    // Ici on enverrait normalement un email.
    // Pour cet exercice, on va simuler l'envoi ou retourner le token pendant le dev.
    console.log(`[PASS_RESET_TOKEN] Token for ${email}: ${token}`)

    return {
        success: true,
        token: process.env.NODE_ENV === "development" ? token : undefined,
        message: "Lien de réinitialisation généré (voir les logs en dev)."
    }
}

export async function resetPassword(token: string, formData: FormData) {
    const newPassword = formData.get("password") as string

    const resetToken = await prisma.resetToken.findUnique({
        where: { token },
        include: { user: true }
    })

    if (!resetToken || resetToken.expiresAt < new Date()) {
        return { error: "Token invalide ou expiré" }
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash }
    })

    await prisma.resetToken.delete({ where: { token } })

    return { success: true }
}
