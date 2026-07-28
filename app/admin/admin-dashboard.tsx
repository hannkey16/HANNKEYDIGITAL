'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ShoppingBag, Users, CreditCard, TrendingUp, Package, Star, ArrowUpRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Reveal, RevealGroup, RevealChild } from '@/components/motion/reveal'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { mockOrders, orderStatusMeta, productDetails } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const stats = [
  { label: 'Total Pendapatan', value: 'Rp 12.4 Jt', change: '+18.2%', trend: 'up', icon: TrendingUp, color: 'text-brand' },
  { label: 'Total Pesanan', value: '1.847', change: '+12.5%', trend: 'up', icon: ShoppingBag, color: 'text-brand-2' },
  { label: 'Pelanggan Baru', value: '324', change: '+8.3%', trend: 'up', icon: Users, color: 'text-purple-400' },
  { label: 'Produk Aktif', value: productDetails.length.toString(), change: 'stabil', trend: 'flat', icon: Package, color: 'text-green-400' },
]

const topProducts = productDetails.slice(0, 5).map((p, i) => ({
  ...p,
  sales: [247, 198, 176, 134, 89][i],
  revenue: [247 * p.price, 198 * p.price, 176 * p.price, 134 * p.price, 89 * p.price][i],
  progress: [100, 80, 71, 54, 36][i],
}))

const recentOrdersAdmin = mockOrders.slice(0, 5)

export function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Reveal direction="up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin <span className="text-gradient">Dashboard</span></h1>
            <p className="text-sm text-muted-foreground mt-0.5">Ringkasan aktivitas HannKey Digital</p>
          </div>
          <span className="text-xs text-muted-foreground">Senin, 28 Juli 2026</span>
        </div>
      </Reveal>

      {/* Stats */}
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {stats.map((s) => (
          <RevealChild key={s.label}>
            <div className="gradient-border glass rounded-3xl p-5">
              <div className="flex items-start justify-between mb-3">
                <span className={cn('grid size-10 place-items-center rounded-2xl bg-white/8', s.color)}>
                  <s.icon className="size-5" />
                </span>
                <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', s.trend === 'up' ? 'bg-green-500/15 text-green-400' : 'bg-white/8 text-muted-foreground')}>
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          </RevealChild>
        ))}
      </RevealGroup>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Top Products */}
        <Reveal direction="up" delay={0.1}>
          <div className="gradient-border glass rounded-3xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold">Produk Terlaris</h2>
              <Link href="/admin/products" className="text-xs text-brand hover:underline flex items-center gap-1">
                Kelola <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {topProducts.map((p, i) => (
                <div key={p.slug}>
                  {i > 0 && <Separator className="mb-4" />}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-4">#{i + 1}</span>
                    <div className="grid size-9 shrink-0 place-items-center rounded-xl" style={{ backgroundImage: p.tile }}>
                      <Image src={p.logo} alt="" width={18} height={18} className={cn('h-[18px] w-auto object-contain', p.whiteLogo && 'logo-white')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-medium truncate">{p.name} {p.tier}</p>
                        <p className="text-xs font-semibold text-gradient shrink-0 ml-2">{p.sales} terjual</p>
                      </div>
                      <Progress value={p.progress} className="h-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Recent Orders */}
        <Reveal direction="up" delay={0.12}>
          <div className="gradient-border glass rounded-3xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold">Pesanan Terbaru</h2>
              <Link href="/admin/orders" className="text-xs text-brand hover:underline flex items-center gap-1">
                Semua <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrdersAdmin.map((o) => {
                const status = orderStatusMeta[o.status]
                const StatusIcon = o.status === 'completed' ? CheckCircle2 : o.status === 'pending' ? Clock : AlertCircle
                return (
                  <Link key={o.id} href={`/dashboard/orders/${o.id}`}>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/3 px-3 py-2.5 hover:bg-white/6 transition-colors">
                      <div className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ backgroundImage: o.productTile }}>
                        <Image src={o.productLogo} alt="" width={16} height={16} className={cn('h-4 w-auto object-contain', ['chatgpt','capcut','disney-plus'].includes(o.productSlug) && 'logo-white')} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate">{o.productName} {o.productTier}</p>
                        <p className="text-[10px] text-muted-foreground">{o.invoiceNumber}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-semibold">{formatRupiah(o.amount)}</p>
                        <span className={cn('text-[10px] font-medium', status.color)}>{status.label}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Quick Admin Links */}
      <Reveal direction="up" delay={0.16}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-4">Kelola</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { href: '/admin/products', label: 'Produk', icon: Package, desc: `${productDetails.length} aktif` },
              { href: '/admin/orders', label: 'Pesanan', icon: ShoppingBag, desc: '1,847 total' },
              { href: '/admin/customers', label: 'Pelanggan', icon: Users, desc: '50K+ user' },
              { href: '/admin/reviews', label: 'Review', icon: Star, desc: '4.9 avg rating' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/4 p-4 hover:border-brand/25 hover:bg-brand/8 transition-all group">
                <item.icon className="size-5 text-muted-foreground group-hover:text-brand transition-colors" />
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
