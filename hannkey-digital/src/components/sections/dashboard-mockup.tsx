import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import {
  ChevronRight,
  Gauge,
  Heart,
  LayoutGrid,
  LogOut,
  Receipt,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Tag,
  Truck,
  User,
  Wallet,
} from 'lucide-react'
import type { PointerEvent } from 'react'

import { formatRupiah, products } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { label: 'Beranda', icon: Gauge, active: true },
  { label: 'Produk', icon: LayoutGrid, chevron: true },
  { label: 'Pesanan', icon: ShoppingCart, chevron: true },
  { label: 'Akun Saya', icon: User },
  { label: 'Top Up Saldo', icon: Wallet },
  { label: 'Riwayat Transaksi', icon: Receipt },
  { label: 'Wishlist', icon: Heart },
  { label: 'Affiliate', icon: Sparkles },
  { label: 'Pengaturan', icon: Settings },
  { label: 'Logout', icon: LogOut },
]

const highlights = [
  { icon: Truck, title: 'Instant Delivery', caption: 'Langsung dikirim otomatis' },
  { icon: ShieldCheck, title: 'Aman & Terpercaya', caption: '100% garansi uang kembali' },
  { icon: Tag, title: 'Harga Terbaik', caption: 'Lebih murah setiap hari' },
]

export function DashboardMockup() {
  const rotateX = useSpring(0, { stiffness: 120, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 120, damping: 18 })
  const transform = useMotionTemplate`perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(600px circle at ${glowX}% ${glowY}%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 65%)`

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 6)
    rotateX.set((0.5 - py) * 5)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transform }}
      className="glass relative rounded-3xl p-2 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.95)] will-change-transform sm:p-2.5"
      role="img"
      aria-label="Pratinjau dashboard HannKey Digital dengan daftar produk digital populer"
    >
      <motion.div
        style={{ backgroundImage: glow }}
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[calc(var(--radius)*1.15)] border border-white/8 bg-[#080d1f]/90">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-white/6 px-3 py-3 sm:px-4">
          <div className="hidden w-[188px] shrink-0 items-center gap-2 md:flex">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-gradient text-[11px] font-bold text-white">H</span>
            <span className="flex flex-col text-[12px] leading-[1.1] font-semibold">
              <span>HannKey</span>
              <span className="text-gradient">Digital</span>
            </span>
          </div>

          <div className="flex h-9 flex-1 items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-3">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-[12px] text-muted-foreground">Cari produk digital...</span>
          </div>

          <div className="relative shrink-0">
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-brand/14 text-[11px] font-bold text-brand">A</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex" style={{ minHeight: '320px' }}>
          {/* Sidebar */}
          <aside className="hidden w-[188px] shrink-0 border-r border-white/6 p-2 md:block">
            <ul className="flex flex-col gap-0.5">
              {sidebarItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] font-medium transition-colors',
                      item.active
                        ? 'bg-brand/15 text-brand'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
                    )}
                  >
                    <item.icon className="size-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {item.chevron ? <ChevronRight className="ml-auto size-3 text-muted-foreground" /> : null}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main content */}
          <div className="flex-1 overflow-hidden p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-semibold">Produk Populer</h3>
              <span className="flex items-center gap-1 text-[11px] text-brand-2">
                Lihat semua <ChevronRight className="size-3" />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <motion.div
                  key={product.slug}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="group cursor-pointer rounded-2xl border border-white/7 bg-white/3 p-3"
                >
                  <span
                    className="mb-2 grid h-12 w-full place-items-center overflow-hidden rounded-xl"
                    style={{ background: product.tile }}
                  >
                    <img
                      src={product.logo}
                      alt=""
                      className={cn(
                        'h-6 w-auto max-w-[70%] object-contain transition-transform duration-300 group-hover:scale-110',
                        product.whiteLogo && 'logo-white',
                      )}
                    />
                  </span>
                  <p className="text-[12px] leading-tight font-medium">
                    {product.name}
                    <br />
                    <span className="text-muted-foreground">{product.tier}</span>
                  </p>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">Mulai dari</p>
                  <p className="text-[12px] font-semibold text-brand-2">{formatRupiah(product.price)}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/7 bg-white/3 px-3 py-2.5"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand/14 text-brand">
                    <item.icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-medium">{item.title}</span>
                    <span className="block truncate text-[10px] text-muted-foreground">{item.caption}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
