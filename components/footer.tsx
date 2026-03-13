import Link from "next/link"
import Image from "next/image"
import { SenegalStripe } from "@/components/senegal-stripe"
import { Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "A Propos" },
    { href: "/galerie/photos", label: "Nos Photos" },
    { href: "/galerie/videos", label: "Nos Vidéos" },
    { href: "/articles", label: "Articles" },
  ],
  ressources: [
    { href: "#", label: "Ressources à venir" },
    { href: "/partenariats", label: "Partenariats" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "#", label: "Mentions légales" },
    { href: "#", label: "Politique de confidentialité" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      {/* Senegalese identity stripe at the top of the footer */}
      <SenegalStripe />
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-20 w-20 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/logo.png"
                  alt="Logo Amicale des Femmes de la Présidence de la République"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/70 max-w-xs">
              {
                "L'Amicale des Femmes de la Présidence de la République œuvre pour le bien-être social et l'autonomisation des femmes."
              }
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 text-primary-foreground/50">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 text-primary-foreground/50">
              Ressources
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 text-primary-foreground/50">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">
                  {"Palais de la Pr\u00e9sidence de la R\u00e9publique, Dakar, S\u00e9n\u00e9gal"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">
                  +221 77 532 95 85
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">
                  contact@amfpr.sn
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 py-8 mt-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-xs text-primary-foreground/50 text-center md:text-left">
              {"© 2026 Amicale des Femmes de la Présidence de la République. Tous droits réservés."}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-xs font-medium text-primary-foreground/60 hover:text-accent transition-colors duration-300"
                aria-label="Facebook"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="text-xs font-medium text-primary-foreground/60 hover:text-accent transition-colors duration-300"
                aria-label="Twitter / X"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-xs font-medium text-primary-foreground/60 hover:text-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
