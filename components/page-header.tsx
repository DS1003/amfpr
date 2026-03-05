import { MotionWrapper } from "@/components/motion-wrapper"
import { SenegalStripe } from "@/components/senegal-stripe"

interface PageHeaderProps {
  title: string
  description: string
  badge?: string
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-secondary overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-screen-2xl px-6 lg:px-8">
        <MotionWrapper>
          {badge && (
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
                {badge}
              </span>
            </div>
          )}
          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-[3.25rem] leading-[1.1]">
            {title}
          </h1>
          <p className="mt-6 max-w-5xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          <SenegalStripe className="mt-8 max-w-[120px] rounded-full overflow-hidden" />
        </MotionWrapper>
      </div>

      {/* Decorative separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  )
}
