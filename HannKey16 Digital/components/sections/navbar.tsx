'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ChevronDown, Menu, Moon, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { BrandLogo } from '@/components/brand-logo'
import { navLinks, products, formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-all duration-500',
          scrolled
            ? 'glass-strong border-b border-white/8 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)]'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-10"
        >
          <a href="#beranda" className="group flex items-center rounded-xl focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:outline-none">
            <BrandLogo className="transition-transform duration-300 group-hover:scale-[1.02]" />
            <span className="sr-only">HannKey Digital — kembali ke beranda</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link, index) => {
              const isProducts = link.label === 'Produk'
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => isProducts && setProductsOpen(true)}
                  onMouseLeave={() => isProducts && setProductsOpen(false)}
                >
                  <a
                    href={link.href}
                    className={cn(
                      'group relative flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                      index === 0
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                    {isProducts ? (
                      <ChevronDown
                        className={cn(
                          'size-3.5 transition-transform duration-300',
                          productsOpen && 'rotate-180',
                        )}
                      />
                    ) : null}
                    <span
                      className={cn(
                        'absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-brand-gradient transition-transform duration-300',
                        index === 0
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </a>

                  {isProducts ? (
                    <AnimatePresence>
                      {productsOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="glass-strong absolute top-full left-1/2 mt-3 w-[420px] -translate-x-1/2 rounded-2xl p-2.5"
                        >
                          <ul className="grid grid-cols-2 gap-1">
                            {products.slice(0, 6).map((product) => (
                              <li key={product.slug}>
                                <a
                                  href="#produk"
                                  className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/6"
                                >
                                  <span
                                    className="grid size-8 shrink-0 place-items-center rounded-lg"
                                    style={{ backgroundImage: product.tile }}
                                  >
                                    <Image
                                      src={product.logo}
                                      alt=""
                                      width={16}
                                      height={16}
                                      className={cn(
                                        'size-4 object-contain',
                                        product.whiteLogo && 'logo-white',
                                      )}
                                    />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block truncate text-[13px] font-medium">
                                      {product.name} {product.tier}
                                    </span>
                                    <span className="block text-[11px] text-muted-foreground">
                                      {formatRupiah(product.price)}
                                    </span>
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  ) : null}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              title="Mode gelap selalu aktif"
              aria-label="Mode gelap aktif"
              aria-pressed="true"
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:outline-none"
            >
              <Moon className="size-[18px]" />
            </button>

            <a
              href="#beranda"
              className="hidden h-10 items-center rounded-xl border border-white/12 bg-white/5 px-5 text-sm font-medium transition-colors hover:bg-white/10 sm:inline-flex"
            >
              Masuk
            </a>

            <a
              href="#produk"
              className="hidden h-10 items-center rounded-xl bg-brand-gradient px-5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03] sm:inline-flex glow-brand"
            >
              Daftar
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
            >
              {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-2">
                <a
                  href="#beranda"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-sm font-medium"
                >
                  Masuk
                </a>
                <a
                  href="#produk"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl bg-brand-gradient text-sm font-semibold text-white"
                >
                  Daftar
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
