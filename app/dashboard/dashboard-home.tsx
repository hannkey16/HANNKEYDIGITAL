'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ShoppingBag, Wallet, Users, Bell, TrendingUp, Check, Clock, Zap, ChevronRight } from 'lucide-react'
import { Reveal, RevealGroup, RevealChild } from '@/components/motion/reveal'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { mockUser, mockOrders, orderStatusMeta } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { useNotifications } from '@/lib/store'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

export function DashboardHome() {
  const { items: notifs, markRead } = useNotifications()
  const recentOrders = mockOrders.slice(0, 3)
  const activeOrders = mockOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled')

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Greeting */}
      <Reveal direction="up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Selamat datang, <span className="text-gradient">{mockUser.name.split(' ')[0]}</span> 👋</h1>
            <p className="mt-1 text-sm text-muted-foreground">Member sejak {mockUser.joinDate}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">Member Aktif</span>
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <RevealGroup className="grid gap-4 sm:grid-cols-3" stagger={0.08}>
        {[
          { icon: ShoppingBag, label: 'Total Pesanan', value: mockUser.totalOrders, sub: `${activeOrders.length} sedang aktif`, color: 'text-brand' },
          { icon: Wallet, label: 'Saldo Dompet', value: formatRupiah(mockUser.walletBalance), sub: 'Tersedia', color: 'text-brand-2' },
          { icon: Users, label: 'Komisi Referral', value: formatRupiah(mockUser.referralEarning), sub: 'Total earned', color: 'text-purple-400' },
        ].map((stat) => (
          <RevealChild key={stat.label}>
            <div className="gradient-border glass rounded-3xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-xl font-bold">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</p>
                </div>
                <span className={cn('grid size-10 place-items-center rounded-2xl bg-white/8', stat.color)}>
                  <stat.icon className="size-5" />
                </span>
              </div>
            </div>
          </RevealChild>
        ))}
      </RevealGroup>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Recent Orders */}
        <Reveal direction="up" delay={0.1}>
          <div className="gradient-border glass rounded-3xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold">Pesanan Terbaru</h2>
              <Link href="/dashboard/orders" className="text-xs text-brand hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="size-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => {
                const status = orderStatusMeta[order.status]
                return (
                  <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
                    <div className="group flex items-center gap-3 rounded-2xl border border-white/6 bg-white/3 px-4 py-3 hover:border-brand/20 hover:bg-white/6 transition-all">
                      <div className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ backgroundImage: order.productTile }}>
                        <Image src={order.productLogo} alt="" width={20} height={20} className={cn('h-5 w-auto object-contain', order.productSlug === 'chatgpt' || order.productSlug === 'capcut' || order.productSlug === 'disney-plus' ? 'logo-white' : '')} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{order.productName} {order.productTier}</p>
                        <p className="text-xs text-muted-foreground">{order.duration}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={cn('text-xs font-medium', status.color)}>{status.label}</p>
                        <p className="text-xs text-muted-foreground">{formatRupiah(order.amount)}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Notifications + Quick Links */}
        <div className="space-y-4">
          <Reveal direction="up" delay={0.12}>
            <div className="gradient-border glass rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="size-4 text-brand" />
                <h2 className="font-semibold">Notifikasi</h2>
              </div>
              <div className="space-y-2">
                {notifs.slice(0, 3).map((n) => (
                  <button key={n.id} onClick={() => markRead(n.id)} className={cn('w-full rounded-2xl border p-3 text-left transition-all', !n.read ? 'border-brand/20 bg-brand/8' : 'border-white/8 bg-white/3 opacity-70')}>
                    <div className="flex items-start gap-2">
                      <div className={cn('mt-0.5 size-2 shrink-0 rounded-full', !n.read ? 'bg-brand' : 'bg-transparent')} />
                      <div>
                        <p className="text-xs font-semibold">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.16}>
            <div className="gradient-border glass rounded-3xl p-5">
              <h2 className="font-semibold mb-4">Aksi Cepat</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: '/products', label: 'Beli Produk', icon: ShoppingBag, color: 'bg-brand/15 text-brand' },
                  { href: '/dashboard/wallet', label: 'Top Up Saldo', icon: Wallet, color: 'bg-brand-2/15 text-brand-2' },
                  { href: '/dashboard/referral', label: 'Referral', icon: Users, color: 'bg-purple-500/15 text-purple-400' },
                  { href: '/dashboard/tickets', label: 'Bantuan', icon: Bell, color: 'bg-orange-500/15 text-orange-400' },
                ].map((a) => (
                  <Link key={a.href} href={a.href} className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-white/4 py-4 hover:bg-white/8 transition-colors">
                    <span className={cn('grid size-9 place-items-center rounded-xl', a.color)}><a.icon className="size-4" /></span>
                    <span className="text-xs font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Referral Card */}
      <Reveal direction="up" delay={0.2}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand/25 via-brand-2/20 to-purple-500/15 border border-white/10 p-6">
          <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-brand/20 blur-[60px]" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="size-4 text-brand-2" />
                <span className="text-sm font-semibold">Program Referral</span>
              </div>
              <p className="text-muted-foreground text-sm">Ajak teman dan dapatkan komisi hingga <span className="text-foreground font-semibold">15%</span> setiap transaksi.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/8 px-4 py-2.5">
                <p className="text-xs text-muted-foreground mb-0.5">Kode Referral</p>
                <p className="font-mono font-bold text-gradient tracking-widest">{mockUser.referralCode}</p>
              </div>
              <Link href="/dashboard/referral" className="rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.03]">
                Detail
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
