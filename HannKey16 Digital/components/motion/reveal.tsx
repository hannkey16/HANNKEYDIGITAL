'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.94 },
  none: {},
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  className,
  once = true,
  as = 'div',
}: {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  as?: 'div' | 'li' | 'span' | 'section'
}) {
  const Comp = motion[as]
  const from = offsets[direction]

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.2, margin: '0px 0px -80px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Comp>
  )
}

/** Parent that staggers direct `RevealChild` descendants. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  as?: 'div' | 'ul' | 'section'
}) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Comp>
  )
}

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function RevealChild({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const Comp = motion[as]
  return (
    <Comp className={className} variants={childVariants}>
      {children}
    </Comp>
  )
}
