'use client'

import { motion } from 'motion/react'
import { Headphones, ShieldCheck, Tag, Zap } from 'lucide-react'

import { RevealChild, RevealGroup } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { benefits } from '@/lib/site-data'

const icons = {
  shield: ShieldCheck,
  zap: Zap,
  tag: Tag,
  headphones: Headphones,
}

export function Benefits() {
  return (
    <section id="keuntungan" className="relative scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14 lg:px-10">
        <SectionHeading
          align="left"
          eyebrow="Keuntungan"
          title="Kenapa Memilih"
          highlight="HannKey Digital?"
          description="Kami berkomitmen memberikan layanan terbaik untuk pengalaman belanja digital yang aman, cepat, dan memuaskan — didukung tim yang selalu siaga."
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
          {benefits.map((benefit) => {
            const Icon = icons[benefit.icon]
            return (
              <RevealChild key={benefit.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group gradient-border glass relative h-full overflow-hidden rounded-3xl p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 size-40 rounded-full bg-brand/18 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <motion.span
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                    className="relative grid size-12 place-items-center rounded-2xl bg-brand/15 text-brand"
                  >
                    <Icon className="size-6" />
                  </motion.span>
                  <h3 className="relative mt-5 text-base font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              </RevealChild>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
