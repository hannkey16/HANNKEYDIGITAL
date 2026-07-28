import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { SectionHeading } from '@/components/section-heading'
import { testimonials } from '@/lib/site-data'
import { cn } from '@/lib/utils'

function useSlidesPerView() {
  const [perView, setPerView] = useState(1)

  useEffect(() => {
    const queries: [MediaQueryList, number][] = [
      [window.matchMedia('(min-width: 1024px)'), 3],
      [window.matchMedia('(min-width: 640px)'), 2],
    ]

    const update = () => {
      const match = queries.find(([query]) => query.matches)
      setPerView(match ? match[1] : 1)
    }

    update()
    queries.forEach(([query]) => query.addEventListener('change', update))
    return () => queries.forEach(([query]) => query.removeEventListener('change', update))
  }, [])

  return perView
}

export function Testimonials() {
  const perView = useSlidesPerView()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const maxIndex = Math.max(0, testimonials.length - perView)

  const next = useCallback(
    () => setIndex((current) => (current >= maxIndex ? 0 : current + 1)),
    [maxIndex],
  )
  const prev = useCallback(
    () => setIndex((current) => (current <= 0 ? maxIndex : current - 1)),
    [maxIndex],
  )

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(next, 4500)
    return () => window.clearInterval(timer)
  }, [paused, next])

  return (
    <section id="testimoni" className="relative scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Testimoni"
            title="Apa Kata"
            highlight="Mereka?"
            description="Ribuan pelanggan puas dengan layanan kami setiap bulannya."
          />

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Testimoni sebelumnya"
              className="grid size-11 place-items-center rounded-xl border border-white/12 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:outline-none"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Testimoni berikutnya"
              className="grid size-11 place-items-center rounded-xl border border-white/12 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:outline-none"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <motion.ul
            className="flex"
            animate={{ x: `-${index * (100 / perView)}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {testimonials.map((testimonial) => (
              <li
                key={testimonial.name}
                className="shrink-0 px-2 first:pl-0 last:pr-0"
                style={{ width: `${100 / perView}%` }}
              >
                <figure className="gradient-border glass relative h-full overflow-hidden rounded-3xl p-6">
                  <Quote aria-hidden="true" className="absolute top-6 right-6 size-8 text-brand/35" />
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white',
                        testimonial.accent,
                      )}
                      aria-hidden="true"
                    >
                      {testimonial.initial}
                    </span>
                    <figcaption className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{testimonial.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">{testimonial.role}</span>
                    </figcaption>
                  </div>

                  <div className="mt-4 flex gap-0.5" aria-label={`Rating ${testimonial.rating} dari 5`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-[#FFC53D] text-[#FFC53D]" />
                    ))}
                  </div>

                  <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {testimonial.comment}
                  </blockquote>
                </figure>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Ke slide ${dotIndex + 1}`}
              aria-current={dotIndex === index}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                dotIndex === index ? 'w-8 bg-brand-gradient' : 'w-3 bg-white/15 hover:bg-white/30',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
