'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Search, SlidersHorizontal, Heart, Check, X, LayoutGrid, List } from 'lucide-react'
import { Reveal, RevealGroup, RevealChild } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { productDetails, categoryMeta, popularSearches, type Category } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { useWishlist } from '@/lib/store'
import { cn } from '@/lib/utils'

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'ai-subscription', label: 'AI Subscription' },
  { value: 'streaming', label: 'Streaming' },
  { value: 'design', label: 'Design' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'video-editing', label: 'Video Editing' },
]

export function ProductsClient() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const { toggle, has } = useWishlist()

  const filtered = useMemo(() => {
    return productDetails.filter((p) => {
      const q = query.toLowerCase()
      const matchQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tier.toLowerCase().includes(q)
      const matchCat = category === 'all' || p.category === category
      const matchPrice = !maxPrice || p.price <= maxPrice
      return matchQuery && matchCat && matchPrice
    })
  }, [query, category, maxPrice])

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative py-12 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-brand/12 blur-[120px]" />
        </div>
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal direction="up">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground">
                <LayoutGrid className="size-4 text-brand" />
                Katalog Lengkap
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Semua <span className="text-gradient">Produk</span>
              </h1>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Aplikasi premium dan langganan AI terbaik dengan harga terjangkau, garansi 30 hari, dan aktivasi instan.
              </p>
            </div>
          </Reveal>

          {/* Search */}
          <Reveal direction="up" delay={0.1} className="mt-8">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari produk... (Netflix, ChatGPT, Canva)"
                  className="glass w-full rounded-2xl border border-white/10 py-4 pl-12 pr-12 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-brand/40 focus:ring-2 focus:ring-brand/20 transition-all"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="size-4" />
                  </button>
                )}
              </div>
              {!query && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Populer:</span>
                  {popularSearches.slice(0, 6).map((s) => (
                    <button key={s} onClick={() => setQuery(s)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground hover:border-brand/40 hover:text-foreground transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={cn(
                  'rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200',
                  category === c.value ? 'border-brand bg-brand/15 text-foreground' : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground'
                )}
              >
                {c.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{filtered.length} produk</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-muted-foreground">Produk tidak ditemukan. Coba kata kunci lain.</p>
              <button onClick={() => { setQuery(''); setCategory('all') }} className="mt-4 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm hover:bg-white/10 transition-colors">
                Reset Filter
              </button>
            </div>
          ) : (
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.06}>
              {filtered.map((product) => (
                <RevealChild key={product.slug} as="article">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group gradient-border glass relative flex h-full flex-col rounded-3xl p-4 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--brand)_90%,transparent)]"
                  >
                    {product.badge && (
                      <span className="absolute top-4 right-4 z-10 rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">{product.badge}</span>
                    )}

                    <div className="relative mb-4 grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-2xl" style={{ backgroundImage: product.tile }}>
                      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(1_0_0/18%),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <Image src={product.logo} alt={`Logo ${product.name}`} width={160} height={80} loading="lazy"
                        className={cn('relative h-10 w-auto max-w-[62%] object-contain transition-transform duration-500 group-hover:scale-110', product.whiteLogo && 'logo-white')} />
                    </div>

                    <h3 className="text-lg leading-tight font-semibold">{product.name} <span className="text-muted-foreground">{product.tier}</span></h3>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{product.description}</p>

                    <ul className="mt-3 flex flex-col gap-1.5">
                      {product.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                          <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand/18 text-brand">
                            <Check className="size-2.5" strokeWidth={3.5} />
                          </span>
                          {perk}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/8 pt-4 mt-5">
                      <div className="min-w-0">
                        <p className="text-[11px] text-muted-foreground">Mulai dari</p>
                        <p className="text-lg font-bold text-gradient">{formatRupiah(product.price)}</p>
                        {product.strikePrice && <p className="text-[11px] text-muted-foreground/70 line-through">{formatRupiah(product.strikePrice)}</p>}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggle(product.slug)}
                          className={cn('grid size-9 place-items-center rounded-xl border transition-all', has(product.slug) ? 'border-red-500/40 bg-red-500/15 text-red-400' : 'border-white/10 bg-white/5 text-muted-foreground hover:text-foreground')}
                          aria-label="Wishlist"
                        >
                          <Heart className={cn('size-4', has(product.slug) && 'fill-red-400')} />
                        </button>
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-brand-gradient px-3.5 text-[12px] font-semibold text-white transition-transform duration-300 group-hover:scale-105"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </RevealChild>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
