"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { submitContactMessage } from "@/lib/actions/message"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: MapPin,
    title: "Siège social",
    details: ["Palais de la Présidence de la République", "Dakar, Sénégal"],
  },
  {
    icon: Phone,
    title: "Téléphone direct",
    details: ["+221 77 532 95 85"],
  },
  {
    icon: Mail,
    title: "Adresse Email",
    details: ["contact@afpr.sn"],
  },
  {
    icon: Clock,
    title: "Heures d'ouverture",
    details: ["Lundi au Vendredi", "08:00 - 17:00"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const newErrors: Record<string, string> = {}

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || name.length < 2)
      newErrors.name = "Votre nom complet est requis"
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Une adresse email valide est requise"
    if (!subject) newErrors.subject = "Veuillez préciser l'objet de votre contact"
    if (!message || message.length < 10)
      newErrors.message = "Votre message doit être un peu plus détaillé (10 caractères min.)"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        await submitContactMessage(formData)
        setSubmitted(true)
        toast.success("Message envoyé !")
      } catch (err) {
        toast.error("Erreur lors de l'envoi. Veuillez réessayer.")
        console.error(err)
      }
    }
    setIsSubmitting(false)
  }

  return (
    <main className="bg-[#fafafa]">
      <PageHeader
        title="Contactez-nous"
        description="Une question, une suggestion ou une envie de rejoindre notre grande famille ? Notre équipe est à votre entière disposition."
      />

      <section className="py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] -z-10" />

        <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">

            {/* Contact Info Sidebar - 4 columns */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px w-8 bg-accent" aria-hidden="true" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
                      Nous Joindre
                    </span>
                  </div>
                  <h2 className="font-serif text-4xl font-bold text-primary tracking-tight mb-6">
                    Restons en <span className="text-accent underline decoration-accent/20 underline-offset-8">contact</span>
                  </h2>
                  <p className="text-muted-foreground/80 leading-relaxed text-lg max-w-md">
                    L'Amicale des Femmes de la Présidence de la République privilégie la proximité et l'écoute.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      variants={itemVariants}
                      className="group flex gap-6 p-4 rounded-3xl transition-all duration-500 hover:bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white border border-border/50 shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
                        <info.icon className="size-5 text-primary group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="pt-1">
                        <h3 className="font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-base text-primary font-medium leading-relaxed"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Media */}
                <motion.div variants={itemVariants} className="pt-10 border-t border-border/40">
                  <h3 className="font-bold text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-8">
                    Réseaux Sociaux
                  </h3>
                  <div className="flex gap-4">
                    {[
                      { icon: Facebook, href: "#" },
                      { icon: Twitter, href: "#" },
                      { icon: Instagram, href: "#" },
                      { icon: Linkedin, href: "#" }
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-border/50 text-primary hover:bg-accent hover:border-accent hover:text-white hover:-translate-y-1 shadow-sm transition-all duration-500"
                      >
                        <social.icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Contact Form - 8 columns */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="relative"
              >
                {/* Visual accent */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />

                <div className="p-8 sm:p-16 rounded-[3rem] bg-white border border-border/40 shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative overflow-hidden">

                  {submitted ? (
                    <div className="py-20 text-center relative z-10">
                      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-inner">
                        <CheckCircle className="size-12" />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-primary mb-6">
                        Message envoyé avec succès
                      </h3>
                      <p className="text-muted-foreground/80 text-lg max-w-md mx-auto mb-12 leading-relaxed">
                        Nous avons bien reçu votre message. Notre équipe va l'étudier et reviendra vers vous dans les plus brefs délais.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-500 rounded-2xl px-10 h-14 font-bold uppercase tracking-[0.1em] text-xs shadow-xl shadow-primary/10"
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <div className="mb-14">
                        <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                          Écrivez-nous
                        </h2>
                        <p className="text-muted-foreground/80 text-lg">
                          Remplissez ce formulaire de manière précise et nous vous recontacterons.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                          <div className="space-y-3">
                            <Label htmlFor="name" className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">
                              Nom complet <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Aïssatou Diop"
                              className="rounded-2xl border-border/60 bg-secondary/20 focus-visible:bg-white focus-visible:ring-primary/10 h-16 px-6 text-base transition-all duration-500 shadow-sm"
                              aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && <p id="name-error" className="text-xs text-destructive mt-2 ml-1 font-medium">{errors.name}</p>}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">
                              Adresse Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="votre@email.com"
                              className="rounded-2xl border-border/60 bg-secondary/20 focus-visible:bg-white focus-visible:ring-primary/10 h-16 px-6 text-base transition-all duration-500 shadow-sm"
                              aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && <p id="email-error" className="text-xs text-destructive mt-2 ml-1 font-medium">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="subject" className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">
                            Objet du message <span className="text-destructive">*</span>
                          </Label>
                          <Select name="subject">
                            <SelectTrigger
                              id="subject"
                              className="rounded-2xl border-border/60 bg-secondary/20 focus:bg-white h-16 px-6 text-base transition-all duration-500 shadow-sm"
                            >
                              <SelectValue placeholder="Sélectionnez un sujet" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border overflow-hidden p-2">
                              <SelectItem value="info" className="p-4 cursor-pointer rounded-xl focus:bg-primary/5 focus:text-primary transition-colors">Demande d'informations générales</SelectItem>
                              <SelectItem value="partenariat" className="p-4 cursor-pointer rounded-xl focus:bg-primary/5 focus:text-primary transition-colors">Proposition de partenariat ou sponsoring</SelectItem>
                              <SelectItem value="adhesion" className="p-4 cursor-pointer rounded-xl focus:bg-primary/5 focus:text-primary transition-colors">Comment adhérer à l'Amicale</SelectItem>
                              <SelectItem value="presse" className="p-4 cursor-pointer rounded-xl focus:bg-primary/5 focus:text-primary transition-colors">Relations presse et médias</SelectItem>
                              <SelectItem value="autre" className="p-4 cursor-pointer rounded-xl focus:bg-primary/5 focus:text-primary transition-colors">Autre sujet technique ou divers</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.subject && <p className="text-xs text-destructive mt-2 ml-1 font-medium">{errors.subject}</p>}
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="message" className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">
                            Votre message <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Écrivez votre message ici..."
                            rows={6}
                            className="rounded-[2rem] border-border/60 bg-secondary/20 focus-visible:bg-white focus-visible:ring-primary/10 resize-none p-6 text-base transition-all duration-500 shadow-sm"
                            aria-describedby={errors.message ? "message-error" : undefined}
                          />
                          {errors.message && <p id="message-error" className="text-xs text-destructive mt-2 ml-1 font-medium">{errors.message}</p>}
                        </div>

                        <div className="pt-6">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-[1.25rem] h-16 px-12 text-[11px] font-bold uppercase tracking-[0.2em] w-full sm:w-auto transition-all duration-500 shadow-xl shadow-primary/10 flex items-center justify-center gap-4 group"
                          >
                            {isSubmitting ? (
                              "Envoi en cours..."
                            ) : (
                              <>
                                Envoyer mon message
                                <div className="p-1 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                                  <Send className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Integrated & Refined */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[600px] rounded-[3rem] overflow-hidden border border-border shadow-[0_40px_100px_rgba(0,0,0,0.05)] bg-muted"
          >
            <iframe
              src="https://maps.google.com/maps?q=Palais%20de%20la%20Republique%20Dakar%20Senegal&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[0.8] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] z-10"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col text-primary/20 z-0">
              <MapPin className="size-12 mb-4 animate-pulse" />
              <p className="font-serif text-xl">Palais de la République, Dakar</p>
            </div>

            {/* Floating Map Detail Card */}
            <div className="absolute bottom-10 left-10 z-20 hidden md:block">
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] shadow-2xl max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">Ouvert actuellement</span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-primary mb-3">Notre Siège</h4>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  Retrouvez-nous au cœur de la capitale, au Palais de la Présidence, porte d'entrée de nos actions nationales.
                </p>
                <div className="mt-8 pt-6 border-t border-primary/5">
                  <Button variant="link" className="p-0 h-auto text-accent font-bold uppercase tracking-wider text-[10px] hover:text-primary transition-colors">
                    <a href="https://maps.google.com/maps?q=Palais+de+la+Republique+Dakar+Senegal" target="_blank" rel="noopener noreferrer">
                      Ouvrir dans Google Maps →
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
