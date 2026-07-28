'use client'

import { Users, Search, Eye, MoreHorizontal } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { formatRupiah } from '@/lib/site-data'
import { useState } from 'react'

const customers = [
  { id: 'USR-001', name: 'Budi Santoso', email: 'budi.santoso@email.com', orders: 5, spent: 112500, joined: '1 Jan 2026', status: 'aktif' },
  { id: 'USR-002', name: 'Andi Pratama', email: 'andi.p@gmail.com', orders: 12, spent: 345000, joined: '15 Feb 2026', status: 'aktif' },
  { id: 'USR-003', name: 'Dewi Lestari', email: 'dewi.l@yahoo.com', orders: 3, spent: 67500, joined: '10 Mar 2026', status: 'aktif' },
  { id: 'USR-004', name: 'Rizky Maulana', email: 'rizky.m@gmail.com', orders: 8, spent: 215000, joined: '5 Apr 2026', status: 'aktif' },
  { id: 'USR-005', name: 'Siti Nurhaliza', email: 'siti.n@email.com', orders: 2, spent: 38000, joined: '20 Apr 2026', status: 'nonaktif' },
]

export function AdminCustomersClient() {
  const [query, setQuery] = useState('')
  const filtered = customers.filter(c => !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.email.includes(query))

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Reveal direction="up">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kelola <span className="text-gradient">Pelanggan</span></h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">50.000+ total pelanggan</span>
          </div>
        </div>
      </Reveal>
      <Reveal direction="up" delay={0.06}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama atau email..."
            className="glass w-full rounded-2xl border border-white/10 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand/40 transition-colors" />
        </div>
      </Reveal>
      <div className="gradient-border glass rounded-3xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              {['Pelanggan', 'Total Pesanan', 'Total Belanja', 'Bergabung', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-4 text-left text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-semibold">{c.orders}</td>
                <td className="px-4 py-4 font-semibold text-gradient">{formatRupiah(c.spent)}</td>
                <td className="px-4 py-4 text-xs text-muted-foreground">{c.joined}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${c.status === 'aktif' ? 'border-green-500/25 bg-green-500/10 text-green-400' : 'border-white/15 bg-white/5 text-muted-foreground'}`}>{c.status}</span>
                </td>
                <td className="px-4 py-4">
                  <button className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                    <Eye className="size-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
