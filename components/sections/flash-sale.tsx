'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Zap, Clock, ArrowRight } from 'lucide-react'
import { Reveal, RevealGroup, RevealChild } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { flashSaleProducts, flashSaleEndTime, productDetails } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

function useCountdown(endTime: Date) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, endTime.getTime() - Date.now())
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const t = setInterval(calc, 1000)
    return () => clearInterval(t)
  }, [endTime])

  return timeLeft
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass min-w-[40px] rounded-xl border border-white/10 px-3 py-2 text-center font-mono text-lg font-bold tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-1 text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}

export function FlashSale() {
  const { h, m, s } = useCountdown(flashSaleEndTime)
  const saleItems = flashSaleProducts.map(fs => ({
    ...fs,
    product: productDetails.find(p => p.slug === fs.slug)!,
  })).filter(i => i.product)

  return (
    <section className="relative py-14 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-brand/8 blur-[150px]" />
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <Reveal direction="up">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/15 px-4 py-2 text-sm font-bold text-red-400 mb-3">
                <Zap className="size-4 fill-red-400" />
                Flash Sale
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Diskon Hingga <span className="text-gradient">44%</span>
              </h2>
              <p className="mt-1 text-muted-foreground">Penawaran terbatas — jangan sampai kehabisan!</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground mr-2">Berakhir dalam:</span>
              <div className="flex items-center gap-2">
                <Digit value={h} label="Jam" />
                <span className="mb-4 font-bold text-muted-foreground">:</span>
                <Digit value={m} label="Menit" />
                <span className="mb-4 font-bold text-muted-foreground">:</span>
                <Digit value={s} label="Detik" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Products */}
        <RevealGroup className="grid gap-4 sm:grid-cols-3" stagger={0.08}>
          {saleItems.map(({ product, discountPercent, flashPrice }) => (
            <RevealChild key={product.slug}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group gradient-border glass relative flex flex-col rounded-3xl p-5 transition-shadow hover:shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--brand)_90%,transparent)]"
              >
                {/* Badge */}
                <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1.5 shadow-lg">
                  <Zap className="size-3 fill-white text-white" />
                  <span className="text-xs font-bold text-white">-{discountPercent}%</span>
                </div>

                {/* Logo tile */}
                <div className="relative mb-4 grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-2xl" style={{ backgroundImage: product.tile }}>
                  <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(1_0_0/18%),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <Image src={product.logo} alt={product.name} width={160} height={80} loading="lazy"
                    className={cn('relative h-10 w-auto max-w-[62%] object-contain transition-transform duration-500 group-hover:scale-110', product.whiteLogo && 'logo-white')} />
                </div>

                <h3 className="text-lg font-semibold">{product.name} <span className="text-muted-foreground font-normal">{product.tier}</span></h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/8 pt-4 mt-5">
                  <div>
                    <p className="text-[11px] text-muted-foreground">Flash Sale</p>
                    <p className="text-xl font-bold text-gradient">{formatRupiah(flashPrice)}</p>
                    {product.strikePrice && (
                      <p className="text-xs text-muted-foreground/60 line-through">{formatRupiah(product.strikePrice)}</p>
                    )}
                  </div>
                  <Link
                    href={`/checkout?product=${product.slug}&duration=0`}
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-brand-gradient px-4 text-[13px] font-semibold text-white transition-transform group-hover:scale-105"
                  >
                    Beli <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </motion.div>
            </RevealChild>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
