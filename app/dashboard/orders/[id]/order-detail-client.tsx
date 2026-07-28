'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, CheckCircle2, Circle, Clock, Download, Copy, Eye, EyeOff } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { type Order, orderStatusMeta } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const steps: { key: string; label: string; desc: string }[] = [
  { key: 'pending', label: 'Menunggu Pembayaran', desc: 'Pesanan dibuat, menunggu konfirmasi pembayaran.' },
  { key: 'paid', label: 'Pembayaran Berhasil', desc: 'Pembayaran dikonfirmasi oleh sistem.' },
  { key: 'processing', label: 'Diproses', desc: 'Tim kami sedang memproses pesanan kamu.' },
  { key: 'activating', label: 'Aktivasi', desc: 'Akun sedang diaktivasi dan disiapkan.' },
  { key: 'completed', label: 'Selesai', desc: 'Akun berhasil diaktivasi dan siap digunakan.' },
]

export function OrderDetailClient({ order }: { order: Order }) {
  const [showPass, setShowPass] = useState(false)
  const [copied, setCopied] = useState(false)
  const status = orderStatusMeta[order.status]
  const currentStep = status.step
  const progressValue = order.status === 'completed' ? 100 : order.status === 'cancelled' ? 0 : (currentStep / 4) * 100

  function copy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Reveal direction="up">
        <Link href="/dashboard/orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-4" /> Kembali ke Pesanan
        </Link>
      </Reveal>

      <Reveal direction="up" delay={0.06}>
        <div className="gradient-border glass rounded-3xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
            <div>
              <h1 className="text-xl font-bold">Detail Pesanan</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{order.invoiceNumber}</p>
            </div>
            <span className={cn('rounded-full border border-current/20 bg-current/10 px-3 py-1.5 text-xs font-semibold', status.color)}>{status.label}</span>
          </div>

          {/* Product */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/4 p-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl" style={{ backgroundImage: order.productTile }}>
              <Image src={order.productLogo} alt="" width={28} height={28} className={cn('h-7 w-auto object-contain', ['chatgpt','capcut','disney-plus'].includes(order.productSlug) && 'logo-white')} />
            </div>
            <div>
              <p className="font-semibold">{order.productName} {order.productTier}</p>
              <p className="text-sm text-muted-foreground">{order.duration} · {order.accountTypes ?? order.productTier}</p>
              <p className="text-sm font-bold text-gradient mt-1">{formatRupiah(order.amount)}</p>
            </div>
          </div>

          {/* Progress Bar */}
          {order.status !== 'cancelled' && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Progress Pesanan</p>
                <p className="text-xs text-muted-foreground">{Math.round(progressValue)}%</p>
              </div>
              <Progress value={progressValue} />
            </div>
          )}

          <Separator className="my-6" />

          {/* Steps Timeline */}
          <div className="space-y-4">
            {steps.map((step, i) => {
              const done = currentStep > i || order.status === 'completed'
              const active = currentStep === i && order.status !== 'completed'
              return (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn('grid size-8 shrink-0 place-items-center rounded-full border-2 transition-colors', done ? 'border-green-500 bg-green-500/20' : active ? 'border-brand bg-brand/20' : 'border-white/20 bg-white/5')}>
                      {done ? <CheckCircle2 className="size-4 text-green-400" /> : active ? <Clock className="size-4 text-brand animate-pulse" /> : <Circle className="size-4 text-white/20" />}
                    </div>
                    {i < steps.length - 1 && <div className={cn('w-0.5 flex-1 mt-1', done ? 'bg-green-500/40' : 'bg-white/8')} style={{ minHeight: 24 }} />}
                  </div>
                  <div className="pb-4 min-w-0">
                    <p className={cn('text-sm font-medium', done ? 'text-foreground' : active ? 'text-brand' : 'text-muted-foreground')}>{step.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Account Details (if completed) */}
          {order.status === 'completed' && order.accountEmail && (
            <>
              <Separator className="my-6" />
              <div>
                <p className="text-sm font-semibold mb-3 text-green-400 flex items-center gap-2"><CheckCircle2 className="size-4" /> Detail Akun</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-mono text-sm">{order.accountEmail}</p>
                    </div>
                    <button onClick={() => copy(order.accountEmail!)} className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground">
                      <Copy className="size-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Password</p>
                      <p className="font-mono text-sm">{showPass ? 'HannKey@2026' : order.accountPassword}</p>
                    </div>
                    <button onClick={() => setShowPass(v => !v)} className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground">
                      {showPass ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator className="my-6" />

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { l: 'No. Pesanan', v: order.id },
              { l: 'Tanggal', v: order.createdAt },
              { l: 'Pembayaran', v: order.paymentMethod },
              { l: 'Total', v: formatRupiah(order.amount) },
            ].map(({ l, v }) => (
              <div key={l}>
                <p className="text-xs text-muted-foreground">{l}</p>
                <p className="font-medium mt-0.5">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 h-11 rounded-2xl border border-white/12 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Download className="size-4" /> Invoice
            </button>
            {order.status === 'pending' && (
              <Link href={`/checkout?product=${order.productSlug}&duration=0`} className="flex-1 flex h-11 items-center justify-center rounded-2xl bg-brand-gradient text-sm font-semibold text-white glow-brand">
                Bayar Sekarang
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
