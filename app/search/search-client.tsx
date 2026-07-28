'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, Check, ArrowRight, TrendingUp } from 'lucide-react'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Reveal } from '@/components/motion/reveal'
import { productDetails, popularSearches, categoryMeta, type Category } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'ai-subscription', label: 'AI Subscription' },
  { value: 'streaming', label: 'Streaming' },
  { value: 'design', label: 'Design' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'video-editing', label: 'Video Editing' },
]

export function SearchClient() {
  const router = useRouter()
  const sp = useSearchParams()
  const [query, setQuery] = useState(sp.get('q') ?? '')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return []
    return productDetails.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
  }, [query])

  const results = useMemo(() => {
    return productDetails.filter(p => {
      const q = query.toLowerCase()
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tier.toLowerCase().includes(q)
      const matchC = category === 'all' || p.category === category
      return matchQ && matchC
    })
  }, [query, category])

  return (
    <PageWrapper>
      <section className="relative py-12 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-brand/10 blur-[120px]" />
        </div>
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal direction="up">
            <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Cari <span className="text-gradient">Produk</span>
            </h1>
          </Reveal>

          {/* Search input */}
          <Reveal direction="up" delay={0.1} className="mt-8 mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true) }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Cari Netflix, ChatGPT, Canva..."
                className="glass w-full rounded-2xl border border-white/10 py-4 pl-12 pr-12 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-brand/40 focus:ring-2 focus:ring-brand/20 transition-all"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="size-4" />
                </button>
              )}

              {/* Autocomplete */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className="glass-strong absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/10 p-2 z-20"
                  >
                    {suggestions.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/6 transition-colors"
                      >
                        <div className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ backgroundImage: p.tile }}>
                          <Image src={p.logo} alt="" width={16} height={16} className={cn('size-4 object-contain', p.whiteLogo && 'logo-white')} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{p.name} {p.tier}</p>
                          <p className="text-xs text-muted-foreground">{formatRupiah(p.price)}/bln</p>
                        </div>
                        <ArrowRight className="ml-auto size-3.5 text-muted-foreground" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!query && (
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="size-4 text-brand" />
                  <span className="text-sm font-medium">Pencarian Populer</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((s) => (
                    <button key={s} onClick={() => setQuery(s)} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground hover:border-brand/40 hover:text-foreground transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          {/* Category filter */}
          <Reveal direction="up" delay={0.15} className="mt-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((c) => (
                <button key={c.value} onClick={() => setCategory(c.value)}
                  className={cn('rounded-xl border px-4 py-2 text-sm font-medium transition-all', category === c.value ? 'border-brand bg-brand/15 text-foreground' : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground')}>
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Results */}
          <div className="mt-10">
            {query && <p className="mb-6 text-sm text-muted-foreground">{results.length} hasil untuk "<span className="text-foreground">{query}</span>"</p>}
            {results.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-muted-foreground">Tidak ada produk yang cocok.</p>
                <button onClick={() => { setQuery(''); setCategory('all') }} className="mt-4 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm hover:bg-white/10 transition-colors">Reset</button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((p, i) => (
                  <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    <Link href={`/products/${p.slug}`}>
                      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                        className="gradient-border glass group flex flex-col rounded-3xl p-4 h-full transition-shadow hover:shadow-[0_20px_60px_-30px_color-mix(in_oklab,var(--brand)_80%,transparent)]">
                        <div className="relative mb-4 grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-2xl" style={{ backgroundImage: p.tile }}>
                          {p.badge && <span className="absolute top-3 right-3 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold text-white uppercase">{p.badge}</span>}
                          <Image src={p.logo} alt={p.name} width={120} height={60} className={cn('h-9 w-auto max-w-[60%] object-contain transition-transform duration-500 group-hover:scale-110', p.whiteLogo && 'logo-white')} />
                        </div>
                        <h3 className="font-semibold">{p.name} <span className="text-muted-foreground font-normal">{p.tier}</span></h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                        <div className="mt-auto pt-3 border-t border-white/8 mt-4 flex items-center justify-between">
                          <p className="text-sm font-bold text-gradient">{formatRupiah(p.price)}<span className="text-xs font-normal text-muted-foreground">/bln</span></p>
                          <span className="rounded-xl bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand">Lihat Detail</span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
