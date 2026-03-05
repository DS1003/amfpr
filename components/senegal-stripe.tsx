/**
 * Subtle decorative stripe using the official colours of the Senegalese flag:
 * Vert (#00853F) — Or (#FDEF42) avec l'étoile verte — Rouge (#E31B23)
 * Bandes verticales de gauche à droite, comme le drapeau du Sénégal.
 */

import { cn } from "@/lib/utils"

/* Official Senegalese flag hex values */
export const SN_GREEN = "#00853F"
export const SN_GOLD = "#FDEF42"
export const SN_RED = "#E31B23"

interface SenegalStripeProps {
  className?: string
  /** Show the green star on the gold band (only visible when stripe is tall enough) */
  withStar?: boolean
}

export function SenegalStripe({
  className,
  withStar = false,
}: SenegalStripeProps) {
  return (
    <div
      className={cn("flex w-full", withStar ? "h-6" : "h-[3px]", className)}
      aria-hidden="true"
    >
      <span className="flex-1" style={{ backgroundColor: SN_GREEN }} />
      <span
        className="relative flex-1 flex items-center justify-center"
        style={{ backgroundColor: SN_GOLD }}
      >
        {withStar && (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={SN_GREEN}
            aria-hidden="true"
          >
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l7.1-1.01z" />
          </svg>
        )}
      </span>
      <span className="flex-1" style={{ backgroundColor: SN_RED }} />
    </div>
  )
}
