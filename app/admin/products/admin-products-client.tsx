'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Plus, Search, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { productDetails } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function AdminProductsClient() {
  const [query, setQuery] = useState('')
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>(
    Object.fromEntries(productDetails.map(p => [p.slug, true]))
  )

  const filtered = productDetails.filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Reveal direction="up">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kelola <span className="text-gradient">Produk</span></h1>
          <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-gradient px-4 text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.02]">
            <Plus className="size-4" /> Tambah Produk
          </button>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.06}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari produk..."
            className="glass w-full rounded-2xl border border-white/10 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand/40 transition-colors" />
        </div>
      </Reveal>

      <div className="gradient-border glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                <th className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground">Produk</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground">Kategori</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground">Harga</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground">Rating</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-xl" style={{ backgroundImage: p.tile }}>
                        <Image src={p.logo} alt="" width={18} height={18} className={cn('h-[18px] w-auto object-contain', p.whiteLogo && 'logo-white')} />
                      </div>
                      <div>
                        <p className="font-medium">{p.name} {p.tier}</p>
                        <p className="text-xs text-muted-foreground">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs capitalize">{p.category.replace('-', ' ')}</span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gradient">{formatRupiah(p.price)}</p>
                    {p.strikePrice && <p className="text-xs text-muted-foreground/60 line-through">{formatRupiah(p.strikePrice)}</p>}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-medium">{p.rating}</span>
                    <span className="text-xs text-muted-foreground"> ({p.reviewCount.toLocaleString('id-ID')})</span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => setActiveMap(m => ({ ...m, [p.slug]: !m[p.slug] }))}
                      className={cn('flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all', activeMap[p.slug] ? 'border-green-500/25 bg-green-500/10 text-green-400' : 'border-white/15 bg-white/5 text-muted-foreground')}>
                      {activeMap[p.slug] ? <ToggleRight className="size-3.5" /> : <ToggleLeft className="size-3.5" />}
                      {activeMap[p.slug] ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/products/${p.slug}`} target="_blank" className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="size-3.5" />
                      </Link>
                      <button className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                        <Edit className="size-3.5" />
                      </button>
                      <button className="grid size-8 place-items-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
