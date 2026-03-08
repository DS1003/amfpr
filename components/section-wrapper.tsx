import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  variant?: "default" | "muted" | "primary"
}

export function SectionWrapper({
  children,
  className,
  id,
  variant = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 lg:py-32",
        variant === "muted" && "bg-secondary/50",
        variant === "primary" && "bg-primary text-primary-foreground",
        className
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
