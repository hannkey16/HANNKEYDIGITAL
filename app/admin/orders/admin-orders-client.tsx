'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Search, Eye } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { mockOrders, orderStatusMeta } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function AdminOrdersClient() {
  const [query, setQuery] = useState('')
  const filtered = mockOrders.filter(o => !query || o.invoiceNumber.toLowerCase().includes(query.toLowerCase()) || o.productName.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Reveal direction="up"><h1 className="text-2xl font-bold">Kelola <span className="text-gradient">Pesanan</span></h1></Reveal>
      <Reveal direction="up" delay={0.06}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari no. invoice atau produk..."
            className="glass w-full rounded-2xl border border-white/10 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand/40 transition-colors" />
        </div>
      </Reveal>
      <div className="gradient-border glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {['Invoice', 'Produk', 'Pelanggan', 'Jumlah', 'Metode', 'Status', 'Tanggal', ''].map(h => (
                  <th key={h} className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => {
                const status = orderStatusMeta[o.status]
                return (
                  <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{o.invoiceNumber}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ backgroundImage: o.productTile }}>
                          <Image src={o.productLogo} alt="" width={14} height={14} className={cn('h-3.5 w-auto object-contain', ['chatgpt','capcut','disney-plus'].includes(o.productSlug) && 'logo-white')} />
                        </div>
                        <span className="font-medium">{o.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">Budi S.</td>
                    <td className="px-4 py-4 font-semibold text-gradient">{formatRupiah(o.amount)}</td>
                    <td className="px-4 py-4"><span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs">{o.paymentMethod}</span></td>
                    <td className="px-4 py-4"><span className={cn('rounded-full border border-current/20 bg-current/10 px-2.5 py-1 text-xs font-medium', status.color)}>{status.label}</span></td>
                    <td className="px-4 py-4 text-xs text-muted-foreground">{o.createdAt}</td>
                    <td className="px-4 py-4">
                      <Link href={`/dashboard/orders/${o.id}`} className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="size-3.5" />
                      </Link>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
