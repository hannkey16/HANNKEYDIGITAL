'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Heart, ShoppingBag, Trash2, LayoutGrid } from 'lucide-react'
import { Reveal, RevealGroup, RevealChild } from '@/components/motion/reveal'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { productDetails } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { useWishlist } from '@/lib/store'
import { cn } from '@/lib/utils'

export function WishlistClient() {
  const { items, remove } = useWishlist()
  const products = productDetails.filter(p => items.includes(p.slug))

  return (
    <PageWrapper>
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal direction="up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Wishlist <span className="text-gradient">Saya</span>
                </h1>
                <p className="mt-1 text-muted-foreground">{items.length} produk tersimpan</p>
              </div>
              {items.length > 0 && (
                <Heart className="size-8 fill-red-400 text-red-400 opacity-60" />
              )}
            </div>
          </Reveal>

          {products.length === 0 ? (
            <div className="py-32 text-center">
              <Heart className="mx-auto size-16 text-white/10 mb-4" />
              <p className="text-muted-foreground">Wishlist kamu masih kosong.</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Tambahkan produk favorit dari halaman produk.</p>
              <Link href="/products" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white glow-brand">
                <LayoutGrid className="size-4" />
                Jelajahi Produk
              </Link>
            </div>
          ) : (
            <>
              <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.06}>
                {products.map((product) => (
                  <RevealChild key={product.slug} as="article">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="gradient-border glass group relative flex flex-col rounded-3xl p-4 transition-shadow hover:shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--brand)_80%,transparent)]"
                    >
                      <button
                        onClick={() => remove(product.slug)}
                        className="absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors"
                        aria-label="Hapus dari wishlist"
                      >
                        <Trash2 className="size-4" />
                      </button>

                      <div className="relative mb-4 grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-2xl" style={{ backgroundImage: product.tile }}>
                        <Image src={product.logo} alt={product.name} width={140} height={70} loading="lazy"
                          className={cn('h-10 w-auto max-w-[60%] object-contain transition-transform duration-500 group-hover:scale-110', product.whiteLogo && 'logo-white')} />
                      </div>

                      <h3 className="text-lg font-semibold">{product.name} <span className="text-muted-foreground font-normal">{product.tier}</span></h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>

                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-4 mt-5">
                        <div>
                          <p className="text-xs text-muted-foreground">Mulai dari</p>
                          <p className="text-lg font-bold text-gradient">{formatRupiah(product.price)}</p>
                        </div>
                        <Link
                          href={`/checkout?product=${product.slug}&duration=0&account=0`}
                          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-brand-gradient px-3.5 text-[12px] font-semibold text-white transition-transform group-hover:scale-105"
                        >
                          <ShoppingBag className="size-3.5" />
                          Beli
                        </Link>
                      </div>
                    </motion.div>
                  </RevealChild>
                ))}
              </RevealGroup>

              <Reveal delay={0.2} className="mt-10 text-center">
                <Link href="/products" className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 text-sm font-medium hover:bg-white/10 transition-colors">
                  Tambah Produk Lainnya
                </Link>
              </Reveal>
            </>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
