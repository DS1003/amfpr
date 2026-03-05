"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { SectionWrapper } from "@/components/section-wrapper"
import { MotionWrapper } from "@/components/motion-wrapper"
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
      // Simulate API call for premium feeling
      await new Promise(resolve => setTimeout(resolve, 800))
      setSubmitted(true)
    }
    setIsSubmitting(false)
  }

  return (
    <main>
      <PageHeader
        title="Contactez-nous"
        description="Une question, une suggestion ou une envie de rejoindre notre grande famille ? Notre équipe est à votre entière disposition."
      />

      <SectionWrapper>
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

            {/* Contact Info Sidebar - 4 columns */}
            <div className="lg:col-span-4 lg:pr-8">
              <MotionWrapper>
                <div className="mb-10">
                  <h2 className="font-serif text-3xl font-bold text-primary tracking-tight mb-3">
                    Restons en contact
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    L'Amicale des Femmes de la Présidence de la République privilégie la proximité et l'écoute.
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  {contactInfo.map((info, index) => (
                    <MotionWrapper key={info.title} delay={index * 100}>
                      <div className="group flex gap-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary border border-border/50 shrink-0 group-hover:bg-accent group-hover:border-accent transition-colors duration-300 shadow-sm">
                          <info.icon className="size-5 text-primary group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="pt-1">
                          <h3 className="font-bold text-sm text-primary uppercase tracking-wider mb-1">
                            {info.title}
                          </h3>
                          {info.details.map((detail, idx) => (
                            <p
                              key={idx}
                              className="text-[15px] text-muted-foreground leading-relaxed"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </MotionWrapper>
                  ))}
                </div>

                {/* Social Media */}
                <div className="mt-12 pt-10 border-t border-border/60">
                  <h3 className="font-bold text-xs text-primary uppercase tracking-widest mb-6">
                    Réseaux Sociaux
                  </h3>
                  <div className="flex gap-4">
                    <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary border border-border/50 text-primary hover:bg-accent hover:border-accent hover:text-white hover:scale-110 shadow-sm transition-all duration-300">
                      <Facebook className="size-4" />
                    </a>
                    <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary border border-border/50 text-primary hover:bg-accent hover:border-accent hover:text-white hover:scale-110 shadow-sm transition-all duration-300">
                      <Twitter className="size-4" />
                    </a>
                    <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary border border-border/50 text-primary hover:bg-accent hover:border-accent hover:text-white hover:scale-110 shadow-sm transition-all duration-300">
                      <Instagram className="size-4" />
                    </a>
                    <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary border border-border/50 text-primary hover:bg-accent hover:border-accent hover:text-white hover:scale-110 shadow-sm transition-all duration-300">
                      <Linkedin className="size-4" />
                    </a>
                  </div>
                </div>
              </MotionWrapper>
            </div>

            {/* Contact Form - 8 columns */}
            <div className="lg:col-span-8">
              <MotionWrapper delay={200}>
                <div className="p-8 sm:p-12 rounded-3xl bg-white border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Mail className="size-48" />
                  </div>

                  {submitted ? (
                    <div className="py-20 text-center relative z-10">
                      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/5 text-primary">
                        <CheckCircle className="size-12" />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-primary mb-4">
                        Message envoyé avec succès
                      </h3>
                      <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
                        Nous avons bien reçu votre message. Notre équipe va l'étudier et reviendra vers vous dans les plus brefs délais.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        className="bg-accent text-accent-foreground hover:bg-primary transition-colors rounded-xl px-8 h-12 font-bold uppercase tracking-wider text-xs shadow-md"
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <div className="mb-10">
                        <h2 className="font-serif text-3xl font-bold text-primary mb-3">
                          Écrivez-nous
                        </h2>
                        <p className="text-muted-foreground text-lg">
                          Remplissez ce formulaire de manière précise et nous vous recontacterons.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-bold text-primary uppercase tracking-wider">
                              Nom & Prénom <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Ex: Aïssatou Diop"
                              className="rounded-xl border-border bg-secondary/30 focus-visible:bg-white h-14 px-5 text-[15px] transition-colors"
                              aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && <p id="name-error" className="text-xs text-destructive mt-1 font-medium">{errors.name}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-primary uppercase tracking-wider">
                              Adresse Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="votre@email.com"
                              className="rounded-xl border-border bg-secondary/30 focus-visible:bg-white h-14 px-5 text-[15px] transition-colors"
                              aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && <p id="email-error" className="text-xs text-destructive mt-1 font-medium">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-sm font-bold text-primary uppercase tracking-wider">
                            Sujet de votre message <span className="text-destructive">*</span>
                          </Label>
                          <Select name="subject">
                            <SelectTrigger
                              id="subject"
                              className="rounded-xl border-border bg-secondary/30 focus:bg-white h-14 px-5 text-[15px] transition-colors"
                            >
                              <SelectValue placeholder="Sélectionnez un sujet" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border">
                              <SelectItem value="info" className="p-3 cursor-pointer">Demande d'informations générales</SelectItem>
                              <SelectItem value="partenariat" className="p-3 cursor-pointer">Proposition de partenariat ou sponsoring</SelectItem>
                              <SelectItem value="adhesion" className="p-3 cursor-pointer">Comment adhérer à l'Amicale</SelectItem>
                              <SelectItem value="presse" className="p-3 cursor-pointer">Relations presse et médias</SelectItem>
                              <SelectItem value="autre" className="p-3 cursor-pointer">Autre sujet technique ou divers</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.subject && <p className="text-xs text-destructive mt-1 font-medium">{errors.subject}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-bold text-primary uppercase tracking-wider">
                            Détail de votre message <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Écrivez votre message ici de manière détaillée..."
                            rows={6}
                            className="rounded-2xl border-border bg-secondary/30 focus-visible:bg-white resize-none p-5 text-[15px] transition-colors"
                            aria-describedby={errors.message ? "message-error" : undefined}
                          />
                          {errors.message && <p id="message-error" className="text-xs text-destructive mt-1 font-medium">{errors.message}</p>}
                        </div>

                        <div className="pt-4">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-xl h-14 px-8 text-[13px] font-bold uppercase tracking-wider w-full sm:w-auto transition-all duration-300 shadow-md flex items-center justify-center gap-3 group"
                          >
                            {isSubmitting ? (
                              "Envoi en cours..."
                            ) : (
                              <>
                                Envoyer mon message
                                <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Full Width Map */}
      <div className="relative w-full h-[500px] bg-secondary border-t border-border mt-10">
        <iframe
          src="https://maps.google.com/maps?q=Palais%20de%20la%20Republique%20Dakar%20Senegal&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 ease-[0.16,1,0.3,1] z-10"
        />
        {/* Placeholder beneath the iframe in case it loads slowly */}
        <div className="absolute inset-0 flex items-center justify-center flex-col text-primary/30 z-0 bg-muted">
          <MapPin className="size-10 mb-2" />
          <p className="font-medium">Chargement de la carte...</p>
        </div>
      </div>
    </main>
  )
}
