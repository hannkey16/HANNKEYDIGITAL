'use client'

import { CreditCard, CheckCircle2, Clock, TrendingUp } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { mockOrders, paymentOptions } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const paymentStats = [
  { method: 'QRIS', count: 847, amount: 18234000, share: 46 },
  { method: 'DANA', count: 412, amount: 8934000, share: 22 },
  { method: 'GoPay', count: 318, amount: 6892000, share: 17 },
  { method: 'Bank Transfer', count: 198, amount: 4298000, share: 11 },
  { method: 'OVO', count: 72, amount: 1562000, share: 4 },
]

export function AdminPaymentsClient() {
  const totalRevenue = paymentStats.reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Reveal direction="up"><h1 className="text-2xl font-bold">Kelola <span className="text-gradient">Pembayaran</span></h1></Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Pendapatan', value: 'Rp 39.9 Jt', icon: TrendingUp, color: 'text-brand' },
          { label: 'Transaksi Sukses', value: '1.847', icon: CheckCircle2, color: 'text-green-400' },
          { label: 'Pending', value: '12', icon: Clock, color: 'text-yellow-400' },
          { label: 'Metode Aktif', value: paymentOptions.length.toString(), icon: CreditCard, color: 'text-brand-2' },
        ].map((s) => (
          <Reveal key={s.label} direction="up">
            <div className="gradient-border glass rounded-3xl p-4">
              <s.icon className={cn('size-5 mb-2', s.color)} />
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal direction="up" delay={0.1}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-4">Distribusi Metode Pembayaran</h2>
          <div className="space-y-4">
            {paymentStats.map((s) => (
              <div key={s.method} className="flex items-center gap-3">
                <div className="w-24 shrink-0">
                  <p className="text-sm font-medium">{s.method}</p>
                  <p className="text-xs text-muted-foreground">{s.count} transaksi</p>
                </div>
                <div className="flex-1 overflow-hidden rounded-full bg-white/8 h-2">
                  <div className="h-full rounded-full bg-brand-gradient transition-all duration-700" style={{ width: `${s.share}%` }} />
                </div>
                <div className="w-20 text-right shrink-0">
                  <p className="text-xs font-semibold">{s.share}%</p>
                  <p className="text-[10px] text-muted-foreground">{formatRupiah(s.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
