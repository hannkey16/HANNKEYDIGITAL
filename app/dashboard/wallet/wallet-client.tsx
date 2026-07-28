'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Wallet, Plus, ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { Separator } from '@/components/ui/separator'
import { mockUser } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const transactions = [
  { id: 1, type: 'in', label: 'Cashback pesanan Netflix', amount: 2500, date: '20 Jul 2026', status: 'completed' },
  { id: 2, type: 'out', label: 'Pembelian ChatGPT Plus', amount: 25000, date: '20 Jul 2026', status: 'completed' },
  { id: 3, type: 'in', label: 'Bonus referral BUDI2026', amount: 5000, date: '18 Jul 2026', status: 'completed' },
  { id: 4, type: 'in', label: 'Refund pesanan #ord-004', amount: 10500, date: '15 Jul 2026', status: 'completed' },
  { id: 5, type: 'out', label: 'Pembelian Netflix Premium', amount: 45000, date: '15 Jul 2026', status: 'completed' },
]

const topupOptions = [25000, 50000, 100000, 200000]

export function WalletClient() {
  const [amount, setAmount] = useState<number | null>(null)
  const [custom, setCustom] = useState('')
  const [method, setMethod] = useState('qris')

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Reveal direction="up">
        <h1 className="text-2xl font-bold">Dompet <span className="text-gradient">Digital</span></h1>
      </Reveal>

      {/* Balance Card */}
      <Reveal direction="up" delay={0.06}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand/30 via-brand-2/20 to-purple-500/15 border border-white/10 p-6">
          <div aria-hidden className="absolute -right-8 -top-8 size-32 rounded-full bg-brand/20 blur-[50px]" />
          <div aria-hidden className="absolute -left-8 -bottom-8 size-32 rounded-full bg-brand-2/20 blur-[50px]" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="size-5 text-brand-2" />
              <span className="text-sm font-medium text-muted-foreground">Saldo Tersedia</span>
            </div>
            <p className="text-4xl font-bold tracking-tight">{formatRupiah(mockUser.walletBalance)}</p>
            <p className="mt-2 text-xs text-muted-foreground">Dapat digunakan untuk pembelian produk digital</p>
          </div>
        </div>
      </Reveal>

      {/* Top Up */}
      <Reveal direction="up" delay={0.1}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Plus className="size-4 text-brand" /> Top Up Saldo</h2>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {topupOptions.map((opt) => (
              <button key={opt} onClick={() => { setAmount(opt); setCustom('') }}
                className={cn('rounded-2xl border py-3 text-sm font-medium transition-all', amount === opt && !custom ? 'border-brand bg-brand/15 text-foreground' : 'border-white/10 bg-white/4 text-muted-foreground hover:border-white/20 hover:text-foreground')}>
                {formatRupiah(opt)}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setAmount(null) }}
            placeholder="Nominal lainnya (min. Rp 10.000)"
            className="glass w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-brand/40 transition-colors mb-4"
          />
          <div className="flex gap-2 mb-4">
            {['qris', 'dana', 'gopay'].map((m) => (
              <button key={m} onClick={() => setMethod(m)}
                className={cn('flex-1 rounded-2xl border py-2.5 text-xs font-medium uppercase transition-all', method === m ? 'border-brand bg-brand/15' : 'border-white/10 bg-white/4 text-muted-foreground hover:border-white/20')}>
                {m}
              </button>
            ))}
          </div>
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.02]">
            <Plus className="size-4" />
            Top Up {amount ? formatRupiah(amount) : custom ? `Rp ${Number(custom).toLocaleString('id-ID')}` : ''}
          </button>
        </div>
      </Reveal>

      {/* Transaction History */}
      <Reveal direction="up" delay={0.14}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-5">Riwayat Transaksi</h2>
          <div className="space-y-3">
            {transactions.map((t, i) => (
              <div key={t.id}>
                {i > 0 && <Separator className="mb-3" />}
                <div className="flex items-center gap-3">
                  <div className={cn('grid size-10 shrink-0 place-items-center rounded-xl', t.type === 'in' ? 'bg-green-500/15' : 'bg-red-500/15')}>
                    {t.type === 'in' ? <ArrowDownLeft className="size-5 text-green-400" /> : <ArrowUpRight className="size-5 text-red-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn('font-semibold text-sm', t.type === 'in' ? 'text-green-400' : 'text-red-400')}>
                      {t.type === 'in' ? '+' : '-'}{formatRupiah(t.amount)}
                    </p>
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <CheckCircle2 className="size-3 text-green-400" />
                      <span className="text-[10px] text-muted-foreground">Berhasil</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
