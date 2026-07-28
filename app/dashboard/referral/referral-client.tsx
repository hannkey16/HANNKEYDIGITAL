'use client'

import { useState } from 'react'
import { Copy, CheckCircle2, Users, TrendingUp, Wallet } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { Progress } from '@/components/ui/progress'
import { mockUser } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const referrals = [
  { name: 'Andi P.', date: '20 Jul 2026', status: 'Berhasil', earning: 3750 },
  { name: 'Dewi L.', date: '18 Jul 2026', status: 'Berhasil', earning: 1875 },
  { name: 'Rizky M.', date: '12 Jul 2026', status: 'Berhasil', earning: 5000 },
  { name: 'Siti N.', date: '05 Jul 2026', status: 'Berhasil', earning: 3750 },
]

export function ReferralClient() {
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://hannkey.digital?ref=${mockUser.referralCode}`

  function copy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Reveal direction="up">
        <h1 className="text-2xl font-bold">Program <span className="text-gradient">Referral</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Ajak teman, dapatkan komisi hingga 15% per transaksi.</p>
      </Reveal>

      {/* Stats */}
      <Reveal direction="up" delay={0.06}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: 'Teman Diajak', value: referrals.length, color: 'text-brand' },
            { icon: TrendingUp, label: 'Total Komisi', value: formatRupiah(mockUser.referralEarning), color: 'text-brand-2' },
            { icon: Wallet, label: 'Bisa Ditarik', value: formatRupiah(20000), color: 'text-purple-400' },
          ].map((s) => (
            <div key={s.label} className="gradient-border glass rounded-3xl p-4 text-center">
              <s.icon className={cn('mx-auto size-5 mb-2', s.color)} />
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Code & Link */}
      <Reveal direction="up" delay={0.1}>
        <div className="gradient-border glass rounded-3xl p-5 space-y-3">
          <h2 className="font-semibold">Kode Referral Kamu</h2>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center justify-center rounded-2xl border border-brand/30 bg-brand/8 py-4">
              <span className="font-mono text-2xl font-bold text-gradient tracking-widest">{mockUser.referralCode}</span>
            </div>
            <button onClick={() => copy(mockUser.referralCode)} className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
              {copied ? <CheckCircle2 className="size-5 text-green-400" /> : <Copy className="size-5" />}
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
            <span className="truncate text-xs text-muted-foreground flex-1">{shareUrl}</span>
            <button onClick={() => copy(shareUrl)} className="shrink-0 text-xs text-brand hover:text-brand-2 transition-colors">Salin</button>
          </div>
          <p className="text-xs text-muted-foreground">Bagikan link atau kode ini ke teman. Kamu mendapat komisi setiap kali mereka berhasil bertransaksi.</p>
        </div>
      </Reveal>

      {/* Referral List */}
      <Reveal direction="up" delay={0.14}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-4">Teman yang Diajak</h2>
          <div className="space-y-3">
            {referrals.map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-400">+{formatRupiah(r.earning)}</p>
                  <span className="text-[10px] text-green-400/70">{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.18}>
        <button className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.02]">
          <Wallet className="size-4" />
          Tarik Komisi — {formatRupiah(20000)}
        </button>
      </Reveal>
    </div>
  )
}
