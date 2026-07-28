import { motion } from 'framer-motion'
import { ArrowRight, Headphones, Lock, ShoppingBag, Sparkles, Zap } from 'lucide-react'

import { DashboardMockup } from '@/components/sections/dashboard-mockup'

const features = [
  { icon: Zap, title: 'Aktivasi Otomatis', caption: 'Proses cepat & instan' },
  { icon: Lock, title: 'Pembayaran Aman', caption: 'Metode lengkap & aman' },
  { icon: Headphones, title: 'Support 24/7', caption: 'Siap membantu Anda' },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-pulse-glow absolute -top-32 -left-24 size-[520px] rounded-full bg-brand/22 blur-[130px]" />
        <div className="animate-pulse-glow absolute -top-20 right-0 size-[460px] rounded-full bg-brand-2/16 blur-[140px] [animation-delay:1.4s]" />
        <div className="absolute inset-0 bg-[linear-gradient(oklch(1_0_0/3%)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/3%)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 lg:px-10">
        {/* Left column */}
        <div className="relative">
          {/* Floating 3D art */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="pointer-events-none absolute top-[40%] -left-56 -z-10 hidden w-[320px] opacity-80 xl:block 2xl:-left-64 2xl:w-[380px]"
          >
            <div className="animate-float-slow">
              <img
                src="/hero-bag.png"
                alt=""
                width={680}
                height={680}
                className="h-auto w-full opacity-90 mix-blend-screen [mask-image:radial-gradient(circle_at_55%_50%,#000_45%,transparent_72%)]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2"
          >
            <span className="grid size-5 place-items-center rounded-full bg-brand-gradient">
              <Sparkles className="size-3 text-white" />
            </span>
            <span className="text-[13px] font-medium text-foreground/90">
              #1 Marketplace Akun &amp; Layanan Digital
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            HannKey <span className="text-gradient">Digital</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease }}
            className="mt-2 text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            Digital Premium
            <br />
            <span className="text-gradient">Access For Everyone</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="mt-5 max-w-xl leading-relaxed text-muted-foreground sm:text-[17px]"
          >
            Nikmati akses layanan digital premium dengan aktivasi instan,
            pembayaran aman, akun resmi, dan harga terbaik.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#produk"
              className="group glow-brand inline-flex h-12 items-center gap-2 rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Mulai Belanja
              <ShoppingBag className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#produk"
              className="group inline-flex h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/10"
            >
              Lihat Produk
              <ArrowRight className="size-4 text-brand-2 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42 + index * 0.09, ease }}
                whileHover={{ y: -4 }}
                className="gradient-border glass flex items-center gap-3 rounded-2xl px-3.5 py-3"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                  <feature.icon className="size-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] leading-tight font-semibold">{feature.title}</span>
                  <span className="mt-0.5 block text-[11px] leading-tight text-muted-foreground">{feature.caption}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column — dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--brand)_28%,transparent),transparent_70%)] blur-2xl"
          />
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}
