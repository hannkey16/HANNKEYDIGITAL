'use client'

import { motion, useInView } from 'motion/react'
import { ArrowDown, LayoutGrid, Sparkles, Wallet } from 'lucide-react'
import { useRef } from 'react'

import { SectionHeading } from '@/components/section-heading'
import { steps } from '@/lib/site-data'

const icons = {
  grid: LayoutGrid,
  wallet: Wallet,
  sparkles: Sparkles,
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="cara-belanja" className="relative scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Cara Belanja"
          title="Hanya Tiga Langkah"
          highlight="Selesai"
          description="Tanpa proses berbelit. Dari memilih produk hingga akun aktif, semuanya berjalan otomatis."
        />

        <div ref={ref} className="relative mt-14">
          {/* Horizontal timeline track (desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-[38px] right-[16%] left-[16%] hidden h-px overflow-hidden bg-white/8 lg:block"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="block h-full origin-left bg-brand-gradient"
            />
          </div>

          <ol className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = icons[step.icon]
              return (
                <li key={step.step} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.25 + index * 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="relative grid size-[76px] place-items-center rounded-3xl border border-white/10 bg-[#0b1124]">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-3xl bg-brand/15 blur-md"
                      />
                      <span className="relative grid size-full place-items-center rounded-3xl bg-brand-gradient/0">
                        <Icon className="size-7 text-brand-2" />
                      </span>
                      <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold text-white">
                        {step.step}
                      </span>
                    </span>

                    <div className="gradient-border glass mt-6 w-full rounded-3xl p-6">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {index < steps.length - 1 ? (
                    <motion.span
                      aria-hidden="true"
                      initial={{ opacity: 0, y: -6 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.28 }}
                      className="mx-auto mt-5 grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 text-brand-2 lg:hidden"
                    >
                      <ArrowDown className="size-4" />
                    </motion.span>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
