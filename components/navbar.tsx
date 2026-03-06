"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Phone, Mail, Search, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "A Propos" },
  { href: "/galerie", label: "Galerie" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Top Bar */}
      <motion.div
        initial={false}
        animate={{
          height: scrolled ? 0 : 40,
          opacity: scrolled ? 0 : 1
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block bg-primary text-primary-foreground/90 text-[12px] overflow-hidden"
      >
        <div className="h-10 mx-auto max-w-screen-2xl px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="mailto:contact@afpr.sn" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="size-3.5 text-accent" />
              contact@afpr.sn
            </a>
            <span className="flex items-center gap-2">
              <Phone className="size-3.5 text-accent" />
              +221 33 823 10 10
            </span>
          </div>
          <div className="flex items-center gap-4">
            <motion.a whileHover={{ y: -2, color: "#fff" }} href="#" className="hover:text-accent transition-colors"><Facebook className="size-3.5" /></motion.a>
            <motion.a whileHover={{ y: -2, color: "#fff" }} href="#" className="hover:text-accent transition-colors"><Twitter className="size-3.5" /></motion.a>
            <motion.a whileHover={{ y: -2, color: "#fff" }} href="#" className="hover:text-accent transition-colors"><Instagram className="size-3.5" /></motion.a>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.div
        layout
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-1.5"
            : "bg-white py-2"
        )}>
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-12 w-36 sm:h-14 sm:w-44">
              <Image
                src="/images/logo.png"
                alt="Logo Amicale des Femmes de la Présidence de la République"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-bold transition-colors uppercase tracking-tighter hover:text-accent",
                    isActive ? "text-accent" : "text-primary/70"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[3px] bg-accent rounded-t-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-8 pl-8">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative"
            >
              {/* Outer soft glow that smooths in on hover */}
              <div className="absolute -inset-1 bg-accent/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500" />

              <a
                href="tel:+221775329585"
                className="relative flex items-center gap-4 bg-white px-2 py-2 pr-6 font-bold text-[13px] uppercase tracking-wide rounded-full shadow-lg border border-border/50 overflow-hidden"
              >
                {/* Dark sliding layer */}
                <div className="absolute inset-0 bg-primary translate-x-[-100%] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-0" />

                {/* Yellow Icon Circle */}
                <div className="relative flex items-center justify-center bg-accent text-accent-foreground h-10 w-10 min-w-[40px] rounded-full shadow-sm transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white z-10">
                  <motion.div
                    animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 0.6 }}
                  >
                    <Phone className="size-[18px]" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Text elements */}
                <span className="relative z-10 flex items-center gap-3 text-primary group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  <span>Appelez nous</span>
                  <span className="h-4 w-[2px] rounded-full bg-primary/20 group-hover:bg-white/30 transition-colors duration-300" />
                  <span>+221 77 532 95 85</span>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <SheetHeader className="border-b border-border pb-6">
                <SheetTitle className="font-serif text-xl text-primary">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-base font-bold rounded-xl transition-colors uppercase tracking-tight",
                      pathname === link.href ? "text-accent bg-secondary/30" : "text-primary/70 hover:bg-secondary/20"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </motion.header>
  )
}
