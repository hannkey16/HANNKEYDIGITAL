'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Shield, Zap, Check, ChevronDown, Tag, MessageSquare, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Separator } from '@/components/ui/separator'
import { Reveal } from '@/components/motion/reveal'
import { getProductDetail, paymentOptions, type PaymentMethod } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const VALID_PROMOS: Record<string, number> = {
  'HANNKEY10': 10,
  'NEWUSER20': 20,
  'FLASH15': 15,
}

export function CheckoutClient() {
  const sp = useSearchParams()
  const router = useRouter()
  const productSlug = sp.get('product') ?? 'chatgpt'
  const durationIdx = Number(sp.get('duration') ?? 0)
  const accountIdx = Number(sp.get('account') ?? 0)

  const product = getProductDetail(productSlug)
  if (!product) return null

  const duration = product.durations[durationIdx] ?? product.durations[0]
  const accountType = product.accountTypes[accountIdx] ?? product.accountTypes[0]

  const [payment, setPayment] = useState<PaymentMethod>(paymentOptions[0])
  const [promoCode, setPromoCode] = useState('')
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [notes, setNotes] = useState('')
  const [step, setStep] = useState<'form' | 'confirm' | 'payment' | 'success'>('form')
  const [copied, setCopied] = useState(false)

  const subtotal = duration.price
  const fee = payment.fee
  const discountAmount = Math.round(subtotal * promoDiscount / 100)
  const total = subtotal + fee - discountAmount

  function applyPromo() {
    const disc = VALID_PROMOS[promoInput.toUpperCase()]
    if (disc) {
      setPromoDiscount(disc)
      setPromoCode(promoInput.toUpperCase())
      setPromoError('')
    } else {
      setPromoError('Kode promo tidak valid atau sudah kadaluarsa.')
    }
  }

  function copyVA() {
    navigator.clipboard.writeText('7800123456789')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const mockInvoice = 'INV-2026-07-' + Math.floor(Math.random() * 900 + 100)

  return (
    <PageWrapper>
      <section className="py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <Link href={`/products/${product.slug}`} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" /> Kembali ke Detail Produk
          </Link>

          {step === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="py-16 text-center"
            >
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-green-500/15 mb-6">
                <CheckCircle2 className="size-10 text-green-400" />
              </div>
              <h1 className="text-2xl font-bold">Pembayaran Berhasil!</h1>
              <p className="mt-2 text-muted-foreground">Pesanan kamu sedang diproses. Detail akun akan dikirim ke dashboard segera.</p>
              <div className="glass-strong mx-auto mt-8 max-w-sm rounded-3xl border border-white/10 p-6 text-left">
                <p className="text-xs text-muted-foreground">No. Invoice</p>
                <p className="font-semibold mt-0.5">{mockInvoice}</p>
                <Separator className="my-4" />
                <div className="flex items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ backgroundImage: product.tile }}>
                    <Image src={product.logo} alt="" width={24} height={24} className={cn('h-6 w-auto object-contain', product.whiteLogo && 'logo-white')} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{product.name} {product.tier}</p>
                    <p className="text-xs text-muted-foreground">{duration.label} · {accountType}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Dibayar</span>
                  <span className="font-bold text-gradient">{formatRupiah(total)}</span>
                </div>
              </div>
              <div className="mt-8 flex justify-center gap-3">
                <Link href="/dashboard/orders" className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white glow-brand">
                  Lihat Pesanan
                </Link>
                <Link href="/products" className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 text-sm font-medium hover:bg-white/10 transition-colors">
                  Belanja Lagi
                </Link>
              </div>
            </motion.div>
          ) : step === 'payment' ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
              <h1 className="text-2xl font-bold mb-2">Instruksi Pembayaran</h1>
              <p className="text-muted-foreground mb-8">Selesaikan pembayaran dalam <span className="font-semibold text-foreground">30 menit</span> agar pesanan diproses.</p>
              <div className="glass-strong rounded-3xl border border-white/10 p-6 max-w-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">{payment.name}</span>
                  <span className="text-xs text-muted-foreground rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{payment.type.toUpperCase()}</span>
                </div>
                {payment.type === 'qris' && (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <div className="grid size-40 place-items-center rounded-2xl bg-white p-3">
                      <div className="grid size-full place-items-center rounded-xl bg-[#070b1a] text-xs text-muted-foreground text-center p-2">QR Code akan tampil di sini</div>
                    </div>
                    <p className="text-sm text-muted-foreground">Scan QR menggunakan aplikasi e-wallet apapun</p>
                  </div>
                )}
                {(payment.type === 'bank' || payment.type === 'ewallet') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Nomor Virtual Account</p>
                        <p className="font-mono font-semibold tracking-wider">7800 1234 5678 9</p>
                      </div>
                      <button onClick={copyVA} className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                        {copied ? <CheckCircle2 className="size-4 text-green-400" /> : <Copy className="size-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">Transfer tepat sesuai jumlah tagihan untuk konfirmasi otomatis.</p>
                  </div>
                )}
                <Separator className="my-5" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Produk</span><span>{product.name} {product.tier}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Durasi</span><span>{duration.label}</span></div>
                  {promoDiscount > 0 && <div className="flex justify-between text-green-400"><span>Diskon ({promoCode})</span><span>-{formatRupiah(discountAmount)}</span></div>}
                  {fee > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Biaya Admin</span><span>{formatRupiah(fee)}</span></div>}
                  <div className="flex justify-between pt-2 border-t border-white/8 font-bold text-gradient"><span>Total</span><span>{formatRupiah(total)}</span></div>
                </div>
                <button
                  onClick={() => setStep('success')}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.02]"
                >
                  <CheckCircle2 className="size-4" />
                  Konfirmasi Pembayaran
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              {/* Left */}
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Checkout</h1>

                {/* Payment Method */}
                <Reveal direction="up">
                  <div className="gradient-border glass rounded-3xl p-5">
                    <h2 className="font-semibold mb-4">Metode Pembayaran</h2>
                    <div className="space-y-2">
                      {paymentOptions.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPayment(m)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all',
                            payment.id === m.id ? 'border-brand bg-brand/10' : 'border-white/10 bg-white/4 hover:border-white/20'
                          )}
                        >
                          <span className={cn('grid size-5 place-items-center rounded-full border-2 transition-colors shrink-0', payment.id === m.id ? 'border-brand' : 'border-white/30')}>
                            {payment.id === m.id && <span className="size-2.5 rounded-full bg-brand" />}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.description}</p>
                          </div>
                          {m.fee > 0 ? (
                            <span className="text-xs text-muted-foreground shrink-0">+{formatRupiah(m.fee)}</span>
                          ) : (
                            <span className="shrink-0 rounded-full bg-green-500/12 px-2 py-0.5 text-[10px] font-medium text-green-400">Gratis</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Promo Code */}
                <Reveal direction="up" delay={0.08}>
                  <div className="gradient-border glass rounded-3xl p-5">
                    <h2 className="font-semibold mb-4 flex items-center gap-2"><Tag className="size-4 text-brand" /> Kode Promo</h2>
                    {promoDiscount > 0 ? (
                      <div className="flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3">
                        <Check className="size-4 text-green-400 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-green-400">{promoCode} — Diskon {promoDiscount}%</p>
                          <p className="text-xs text-muted-foreground">Hemat {formatRupiah(discountAmount)}</p>
                        </div>
                        <button onClick={() => { setPromoDiscount(0); setPromoCode(''); setPromoInput('') }} className="ml-auto text-xs text-muted-foreground hover:text-foreground">Hapus</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError('') }}
                          placeholder="Masukkan kode promo"
                          className="glass flex-1 rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-brand/40 transition-colors uppercase"
                        />
                        <button onClick={applyPromo} className="rounded-2xl bg-brand/20 px-4 text-sm font-medium text-brand hover:bg-brand/30 transition-colors">
                          Pakai
                        </button>
                      </div>
                    )}
                    {promoError && <p className="mt-2 text-xs text-red-400">{promoError}</p>}
                    <p className="mt-2 text-xs text-muted-foreground">Coba: HANNKEY10, NEWUSER20, FLASH15</p>
                  </div>
                </Reveal>

                {/* Notes */}
                <Reveal direction="up" delay={0.12}>
                  <div className="gradient-border glass rounded-3xl p-5">
                    <h2 className="font-semibold mb-4 flex items-center gap-2"><MessageSquare className="size-4 text-brand" /> Catatan (Opsional)</h2>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Catatan untuk penjual..."
                      rows={3}
                      className="glass w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-brand/40 transition-colors resize-none"
                    />
                  </div>
                </Reveal>
              </div>

              {/* Right: Order Summary */}
              <div>
                <Reveal direction="up" delay={0.05}>
                  <div className="gradient-border glass sticky top-24 rounded-3xl p-5">
                    <h2 className="font-semibold mb-4">Ringkasan Pesanan</h2>

                    {/* Product */}
                    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-3">
                      <div className="grid size-12 shrink-0 place-items-center rounded-xl" style={{ backgroundImage: product.tile }}>
                        <Image src={product.logo} alt="" width={28} height={28} className={cn('h-7 w-auto object-contain', product.whiteLogo && 'logo-white')} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-tight">{product.name} {product.tier}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{duration.label} · {accountType}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Harga</span><span>{formatRupiah(subtotal)}</span></div>
                      {promoDiscount > 0 && <div className="flex justify-between text-green-400"><span>Diskon {promoCode}</span><span>-{formatRupiah(discountAmount)}</span></div>}
                      {fee > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Biaya Admin</span><span>{formatRupiah(fee)}</span></div>}
                    </div>

                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold text-gradient">{formatRupiah(total)}</span>
                    </div>

                    <button
                      onClick={() => setStep('payment')}
                      className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.02]"
                    >
                      Lanjutkan Pembayaran
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Shield className="size-3.5 text-brand" /> Transaksi Aman</span>
                      <span className="flex items-center gap-1"><Zap className="size-3.5 text-brand-2" /> Aktivasi Instan</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
