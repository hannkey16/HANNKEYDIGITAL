import { motion } from 'framer-motion'
import { Check, LayoutGrid, ShoppingBag } from 'lucide-react'

import { Reveal, RevealChild, RevealGroup } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { formatRupiah, products } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function Products() {
  return (
    <section id="produk" className="relative scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Katalog Produk"
          title="Produk Premium"
          highlight="Terpopuler"
          description="Pilih layanan digital favoritmu dengan harga terbaik dan kualitas terjamin."
        />

        <RevealGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.07}
        >
          {products.map((product) => (
            <RevealChild key={product.slug} as="article">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group gradient-border glass relative flex h-full flex-col rounded-3xl p-4 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--brand)_90%,transparent)]"
              >
                {product.badge ? (
                  <span className="absolute top-4 right-4 z-10 rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                    {product.badge}
                  </span>
                ) : null}

                <div
                  className="relative mb-4 grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-2xl"
                  style={{ backgroundImage: product.tile }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(1_0_0/18%),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <img
                    src={product.logo}
                    alt={`Logo ${product.name}`}
                    width={160}
                    height={80}
                    loading="lazy"
                    className={cn(
                      'relative h-10 w-auto max-w-[62%] object-contain transition-transform duration-500 group-hover:scale-110',
                      product.whiteLogo && 'logo-white',
                    )}
                  />
                </div>

                <h3 className="text-lg leading-tight font-semibold">
                  {product.name}{' '}
                  <span className="text-muted-foreground">{product.tier}</span>
                </h3>

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

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/8 pt-4">
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">Mulai dari</p>
                    <p className="text-lg font-bold text-gradient">{formatRupiah(product.price)}</p>
                    {product.strikePrice ? (
                      <p className="text-[11px] text-muted-foreground/70 line-through">{formatRupiah(product.strikePrice)}</p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-brand-gradient px-3.5 text-[12px] font-semibold text-white transition-transform duration-300 group-hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:outline-none"
                  >
                    <ShoppingBag className="size-3.5" />
                    Beli Sekarang
                    <span className="sr-only"> {product.name} {product.tier}</span>
                  </button>
                </div>
              </motion.div>
            </RevealChild>
          ))}
        </RevealGroup>

        <Reveal direction="up" delay={0.1} className="mt-10 flex justify-center">
          <a
            href="#produk"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-7 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/10"
          >
            Lihat Semua Produk
            <LayoutGrid className="size-4 text-brand-2" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
