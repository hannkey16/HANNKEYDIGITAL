'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, Search, MessageCircle, Send, HelpCircle } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { cn } from '@/lib/utils'

const categories = [
  {
    id: 'umum',
    label: 'Umum',
    faqs: [
      { q: 'Apa itu HannKey Digital?', a: 'HannKey Digital adalah marketplace akun dan layanan digital premium terpercaya di Indonesia. Kami menyediakan berbagai produk seperti Netflix, Spotify, ChatGPT, Canva, dan lainnya dengan harga terjangkau, aktivasi instan, dan garansi 30 hari.' },
      { q: 'Apakah akun yang dijual resmi dan legal?', a: 'Ya, seluruh akun di HannKey Digital diperoleh melalui jalur resmi dan berlangganan penuh. Kami tidak menjual akun hasil pembajakan, sehingga layanan berjalan normal seperti berlangganan langsung.' },
      { q: 'Bagaimana cara mendaftar?', a: 'Klik tombol "Daftar" di halaman utama, isi data diri kamu, dan akun langsung aktif. Tidak perlu verifikasi yang rumit.' },
      { q: 'Apakah ada program referral?', a: 'Ya! Ajak teman dengan kode referral kamu dan dapatkan komisi hingga 15% dari setiap transaksi yang berhasil mereka lakukan.' },
    ],
  },
  {
    id: 'produk',
    label: 'Produk & Aktivasi',
    faqs: [
      { q: 'Berapa lama proses aktivasi setelah pembayaran?', a: 'Rata-rata kurang dari 1 menit. Setelah pembayaran terkonfirmasi, detail akun otomatis dikirim ke dashboard dan email kamu. Untuk produk tertentu yang butuh verifikasi manual, maksimal 15 menit pada jam kerja.' },
      { q: 'Apakah saya bisa memilih durasi langganan?', a: 'Ya, tersedia pilihan 1 bulan, 3 bulan, 6 bulan, dan 1 tahun untuk setiap produk. Semakin lama durasi, semakin besar penghematan yang kamu dapatkan.' },
      { q: 'Apa saja produk yang tersedia?', a: 'Saat ini tersedia Netflix Premium, ChatGPT Plus, Canva Pro, Spotify Premium, Disney+ Hotstar, CapCut Pro, Zoom Pro, dan Amazon Prime Video. Kami terus menambah produk baru.' },
      { q: 'Bisa digunakan di berapa perangkat?', a: 'Tergantung produk dan tier yang dipilih. Misalnya Netflix Premium bisa di 4 perangkat, Spotify Individual 1 perangkat. Detail tersedia di halaman produk masing-masing.' },
    ],
  },
  {
    id: 'pembayaran',
    label: 'Pembayaran',
    faqs: [
      { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Kami menerima QRIS (scan dari aplikasi apapun), DANA, GoPay, OVO, ShopeePay, transfer bank BCA dan Mandiri, serta Virtual Account. Semua pembayaran diproses melalui payment gateway tersertifikasi.' },
      { q: 'Apakah ada biaya tambahan?', a: 'Untuk e-wallet dan QRIS tidak ada biaya tambahan. Untuk transfer bank, ada biaya admin Rp 4.000 per transaksi. Harga yang tertera sudah final.' },
      { q: 'Apakah ada kode promo?', a: 'Ya! Gunakan kode HANNKEY10 untuk diskon 10%, NEWUSER20 untuk diskon 20% (pengguna baru), atau pantau halaman utama untuk flash sale dan promo spesial.' },
      { q: 'Berapa lama konfirmasi pembayaran?', a: 'Untuk e-wallet dan QRIS, konfirmasi otomatis dalam hitungan detik. Untuk transfer bank, konfirmasi otomatis setelah bank memproses transfer (biasanya 1-5 menit).' },
    ],
  },
  {
    id: 'garansi',
    label: 'Garansi & Refund',
    faqs: [
      { q: 'Bagaimana ketentuan garansi 30 hari?', a: 'Jika akun mengalami kendala dalam 30 hari pertama akibat masalah dari pihak kami, kami mengganti akun baru tanpa biaya tambahan. Cukup hubungi support dengan menyertakan nomor pesanan dan bukti kendala.' },
      { q: 'Apakah bisa refund?', a: 'Refund tersedia jika akun tidak bisa diaktivasi dalam 24 jam setelah pembayaran, atau jika produk tidak sesuai deskripsi. Refund diproses ke saldo dompet HannKey Digital dalam 1x24 jam.' },
      { q: 'Apa yang terjadi jika akun saya diblokir?', a: 'Selama dalam masa garansi, kami akan mengganti dengan akun baru tanpa biaya. Jika di luar masa garansi, hubungi support kami untuk solusi terbaik.' },
      { q: 'Apa yang terjadi jika lupa detail akun?', a: 'Semua pesanan tersimpan permanen di halaman Pesanan pada dashboard kamu. Kamu bisa melihat kembali detail akun kapan saja setelah login.' },
    ],
  },
  {
    id: 'akun',
    label: 'Akun & Dashboard',
    faqs: [
      { q: 'Bagaimana cara melihat riwayat pesanan?', a: 'Login ke akun kamu, buka menu Dashboard → Pesanan. Semua riwayat transaksi tersimpan lengkap beserta detail akun yang dibeli.' },
      { q: 'Apakah ada program loyalitas atau cashback?', a: 'Ya, setiap pembelian memberikan cashback yang masuk ke saldo dompet digital kamu. Saldo ini bisa digunakan untuk pembelian berikutnya.' },
      { q: 'Bagaimana cara mengubah password akun HannKey Digital?', a: 'Buka Dashboard → Pengaturan → Keamanan. Masukkan password lama dan password baru, lalu simpan perubahan.' },
      { q: 'Apakah bisa berlangganan untuk tim atau reseller?', a: 'Bisa! Kami menyediakan harga khusus untuk pembelian dalam jumlah banyak dan program afiliasi dengan komisi berjenjang. Hubungi tim kami untuk mendapatkan penawaran reseller.' },
    ],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function FaqClient() {
  const [activeTab, setActiveTab] = useState('umum')
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [query, setQuery] = useState('')

  const active = categories.find(c => c.id === activeTab)
  const filtered = query
    ? categories.flatMap(c => c.faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())))
    : active?.faqs ?? []

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative py-14 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-brand/12 blur-[130px]" />
        </div>
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal direction="up">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground mb-4">
                <HelpCircle className="size-4 text-brand" />
                Pusat Bantuan
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Pertanyaan yang Sering <span className="text-gradient">Ditanyakan</span>
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Tidak menemukan jawaban yang kamu cari? Hubungi tim support kami — siap membantu 24/7.
              </p>
            </div>
          </Reveal>

          {/* Search */}
          <Reveal direction="up" delay={0.1} className="mt-10 mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setOpenIdx(null) }}
                placeholder="Cari pertanyaan..."
                className="glass w-full rounded-2xl border border-white/10 py-4 pl-12 pr-4 text-sm outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/20 transition-all"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          {/* Category tabs */}
          {!query && (
            <Reveal direction="up">
              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {categories.map(c => (
                  <button key={c.id} onClick={() => { setActiveTab(c.id); setOpenIdx(null) }}
                    className={cn('rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-200',
                      activeTab === c.id ? 'border-brand bg-brand/15 text-foreground' : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground')}>
                    {c.label}
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {query && (
            <p className="text-sm text-muted-foreground text-center mb-8">{filtered.length} hasil untuk "<span className="text-foreground">{query}</span>"</p>
          )}

          {/* FAQs */}
          <div className="mx-auto max-w-3xl space-y-3">
            {filtered.map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 0.04}>
                <div className="gradient-border glass overflow-hidden rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-medium leading-relaxed">{item.q}</span>
                    <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform duration-300 mt-0.5', openIdx === i && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/8 px-6 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Still need help */}
          <Reveal direction="up" delay={0.15} className="mt-14">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-r from-brand/15 via-brand-2/10 to-purple-500/10 p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Masih Butuh Bantuan?</h2>
              <p className="text-muted-foreground text-sm mb-6">Tim support kami siap membantu kamu setiap saat, 24 jam sehari, 7 hari seminggu.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.03]">
                  <MessageCircle className="size-4" /> Chat WhatsApp
                </a>
                <a href="https://t.me/hannkeydigital" target="_blank" rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 text-sm font-medium hover:bg-white/10 transition-colors">
                  <Send className="size-4" /> Telegram
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  )
}
