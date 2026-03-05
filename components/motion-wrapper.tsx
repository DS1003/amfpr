"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MotionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function MotionWrapper({
  children,
  className,
  delay = 0,
  direction = "up",
}: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [])

  /* Smaller offsets = subtler, more dignified entrances */
  const directionStyles = {
    up: "translate-y-5",
    down: "-translate-y-5",
    left: "translate-x-5",
    right: "-translate-x-5",
    none: "",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)]",
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0 duration-900"
          : `opacity-0 ${directionStyles[direction]} duration-0`,
        className
      )}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  )
}
