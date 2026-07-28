'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Star, Heart, Shield, Zap, Check, ChevronDown, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Reveal, RevealGroup, RevealChild } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { type ProductDetail, getProductDetail, getProductReviews, productDetails, formatRupiah } from '@/lib/mock-data'
import { formatRupiah as fmtR } from '@/lib/site-data'
import { useWishlist } from '@/lib/store'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

export function ProductDetailClient({ product }: { product: ProductDetail }) {
  const router = useRouter()
  const [selectedDuration, setSelectedDuration] = useState(0)
  const [selectedAccount, setSelectedAccount] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { toggle, has } = useWishlist()
  const wishlisted = has(product.slug)
  const reviews = getProductReviews(product.slug)
  const related = productDetails.filter(p => product.related.includes(p.slug))
  const dur = product.durations[selectedDuration]
  const discount = dur.strikePrice ? Math.round((1 - dur.price / dur.strikePrice) * 100) : 0

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-10">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground transition-colors">Produk</Link>
          <span>/</span>
          <span className="text-foreground">{product.name} {product.tier}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden py-10 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-20 size-[400px] rounded-full bg-brand/15 blur-[120px]" />
          <div className="absolute -top-10 right-0 size-[300px] rounded-full bg-brand-2/10 blur-[100px]" />
        </div>
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          {/* Left: Product Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Link href="/products" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="size-4" /> Kembali ke Produk
            </Link>

            {/* Logo tile */}
            <div className="relative mb-6 grid aspect-video w-full max-w-sm place-items-center overflow-hidden rounded-3xl" style={{ backgroundImage: product.tile }}>
              {product.badge && (
                <span className="absolute top-4 right-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white uppercase tracking-wide">{product.badge}</span>
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(1_0_0/15%),transparent_65%)]" />
              <Image src={product.logo} alt={product.name} width={180} height={90} className={cn('relative h-14 w-auto max-w-[55%] object-contain', product.whiteLogo && 'logo-white')} priority />
            </div>

            {/* Name & rating */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name} <span className="text-muted-foreground font-medium">{product.tier}</span>
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn('size-4', i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20')} />
                ))}
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString('id-ID')} ulasan)</span>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground capitalize">{product.category.replace('-', ' ')}</span>
            </div>

            <p className="mt-5 leading-relaxed text-muted-foreground">{product.longDescription}</p>

            {/* Features */}
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/18 text-brand">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Warranty */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand/20 bg-brand/8 p-4">
              <Shield className="size-5 shrink-0 text-brand mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Garansi 30 Hari</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{product.warranty}</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Order panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}>
            <div className="gradient-border glass sticky top-24 rounded-3xl p-6">
              <p className="text-sm font-medium text-muted-foreground">Pilih Durasi</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {product.durations.map((d, i) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setSelectedDuration(i)}
                    className={cn(
                      'relative flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200',
                      selectedDuration === i ? 'border-brand bg-brand/12' : 'border-white/10 bg-white/4 hover:border-white/20'
                    )}
                  >
                    {d.badge && <span className="absolute -top-2 -right-1 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold text-white">{d.badge}</span>}
                    <span className="text-sm font-semibold">{d.label}</span>
                    <span className="mt-1 text-xs font-bold text-gradient">{fmtR(d.price)}</span>
                    {d.strikePrice && <span className="text-[10px] text-muted-foreground/60 line-through">{fmtR(d.strikePrice)}</span>}
                  </button>
                ))}
              </div>

              {product.accountTypes.length > 1 && (
                <>
                  <p className="mt-5 text-sm font-medium text-muted-foreground">Jenis Akun</p>
                  <div className="mt-3 flex flex-col gap-2">
                    {product.accountTypes.map((at, i) => (
                      <button
                        key={at}
                        type="button"
                        onClick={() => setSelectedAccount(i)}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-left transition-all',
                          selectedAccount === i ? 'border-brand bg-brand/10' : 'border-white/10 bg-white/4 hover:border-white/20'
                        )}
                      >
                        <span className={cn('grid size-4 place-items-center rounded-full border-2 transition-colors', selectedAccount === i ? 'border-brand' : 'border-white/30')}>
                          {selectedAccount === i && <span className="size-2 rounded-full bg-brand" />}
                        </span>
                        {at}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <Separator className="my-5" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Harga</p>
                  <p className="text-2xl font-bold text-gradient">{fmtR(dur.price)}</p>
                  {dur.strikePrice && (
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground/60 line-through">{fmtR(dur.strikePrice)}</span>
                      <span className="rounded-full bg-green-500/15 px-1.5 py-0.5 text-[10px] font-bold text-green-400">Hemat {discount}%</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggle(product.slug)}
                  className={cn('grid size-10 place-items-center rounded-xl border transition-all', wishlisted ? 'border-red-500/40 bg-red-500/15 text-red-400' : 'border-white/10 bg-white/5 text-muted-foreground hover:text-foreground')}
                  aria-label={wishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
                >
                  <Heart className={cn('size-5', wishlisted && 'fill-red-400')} />
                </button>
              </div>

              <Link
                href={`/checkout?product=${product.slug}&duration=${selectedDuration}&account=${selectedAccount}`}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient text-sm font-semibold text-white glow-brand transition-transform duration-300 hover:scale-[1.02]"
              >
                <ShoppingBag className="size-4" />
                Beli Sekarang
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Zap className="size-3.5 text-brand-2" />
                Aktivasi instan setelah pembayaran
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {product.perks.map((perk) => (
                  <div key={perk} className="flex flex-col items-center gap-1 rounded-xl bg-white/4 py-2.5 px-2">
                    <Check className="size-3.5 text-brand" strokeWidth={3} />
                    <span className="text-[10px] text-muted-foreground leading-tight">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Ulasan Pembeli" title="Rating &" highlight="Review" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.id} direction="up" delay={i * 0.07}>
                <div className="gradient-border glass flex flex-col gap-3 rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <span className={cn('grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white', r.accent)}>{r.initial}</span>
                    <div>
                      <p className="text-sm font-semibold">{r.user}</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(r.rating)].map((_, j) => <Star key={j} className="size-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{r.comment}"</p>
                  {r.verified && <span className="self-start rounded-full bg-green-500/12 px-2.5 py-1 text-[11px] font-medium text-green-400">✓ Pembelian terverifikasi</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {product.faq.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <SectionHeading eyebrow="Pertanyaan Umum" title="FAQ" highlight={product.name} />
            <div className="mx-auto mt-10 max-w-3xl space-y-3">
              {product.faq.map((item, i) => (
                <Reveal key={i} direction="up" delay={i * 0.06}>
                  <div className="gradient-border glass rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
                    >
                      {item.q}
                      <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform duration-300', openFaq === i && 'rotate-180')} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <SectionHeading eyebrow="Produk Lainnya" title="Produk" highlight="Terkait" />
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {related.map((p) => (
                <RevealChild key={p.slug}>
                  <Link href={`/products/${p.slug}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3, ease }}
                      className="gradient-border glass flex items-center gap-4 rounded-2xl p-4 transition-shadow hover:shadow-[0_20px_60px_-30px_color-mix(in_oklab,var(--brand)_80%,transparent)]"
                    >
                      <div className="grid size-14 shrink-0 place-items-center rounded-2xl" style={{ backgroundImage: p.tile }}>
                        <Image src={p.logo} alt={p.name} width={40} height={40} className={cn('h-7 w-auto object-contain', p.whiteLogo && 'logo-white')} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold">{p.name} <span className="text-muted-foreground font-normal">{p.tier}</span></p>
                        <p className="text-sm font-bold text-gradient mt-0.5">{fmtR(p.price)}<span className="text-muted-foreground font-normal text-xs">/bln</span></p>
                      </div>
                    </motion.div>
                  </Link>
                </RevealChild>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </PageWrapper>
  )
}
