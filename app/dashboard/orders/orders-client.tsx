'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ShoppingBag, ChevronRight, FileText } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { mockOrders, orderStatusMeta, type OrderStatus } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const statusFilters: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'completed', label: 'Selesai' },
  { value: 'activating', label: 'Aktivasi' },
  { value: 'processing', label: 'Diproses' },
]

export function OrdersClient() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const filtered = filter === 'all' ? mockOrders : mockOrders.filter(o => o.status === filter)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Reveal direction="up">
        <div>
          <h1 className="text-2xl font-bold">Pesanan <span className="text-gradient">Saya</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">{mockOrders.length} total pesanan</p>
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal direction="up" delay={0.06}>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((f) => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={cn('rounded-xl border px-4 py-2 text-sm font-medium transition-all', filter === f.value ? 'border-brand bg-brand/15 text-foreground' : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground')}>
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <ShoppingBag className="mx-auto size-12 text-white/10 mb-3" />
          <p className="text-muted-foreground">Tidak ada pesanan dengan status ini.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order, i) => {
            const status = orderStatusMeta[order.status]
            return (
              <Reveal key={order.id} direction="up" delay={i * 0.06}>
                <Link href={`/dashboard/orders/${order.id}`}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25 }}
                    className="gradient-border glass flex items-center gap-4 rounded-3xl p-4 transition-shadow hover:shadow-[0_10px_40px_-20px_color-mix(in_oklab,var(--brand)_60%,transparent)]"
                  >
                    <div className="grid size-14 shrink-0 place-items-center rounded-2xl" style={{ backgroundImage: order.productTile }}>
                      <Image src={order.productLogo} alt="" width={28} height={28}
                        className={cn('h-7 w-auto object-contain', ['chatgpt','capcut','disney-plus'].includes(order.productSlug) && 'logo-white')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{order.productName} {order.productTier}</p>
                        <span className={cn('rounded-full border border-current/20 bg-current/10 px-2 py-0.5 text-[10px] font-semibold', status.color)}>{status.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{order.duration} · {order.paymentMethod}</p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">{order.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="font-bold text-gradient">{formatRupiah(order.amount)}</p>
                        <p className="text-xs text-muted-foreground">{order.invoiceNumber}</p>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      )}
    </div>
  )
}
