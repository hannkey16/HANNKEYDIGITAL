'use client'

import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Mail, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Reveal } from '@/components/motion/reveal'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section aria-labelledby="newsletter-title" className="relative py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal direction="scale">
          <div className="gradient-border glass relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 lg:py-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-28 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-brand/22 blur-[110px]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(oklch(1_0_0/3%)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/3%)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent)]"
            />

            <div className="relative mx-auto max-w-2xl">
              <span className="glow-brand mx-auto grid size-12 place-items-center rounded-2xl bg-brand-gradient">
                <Mail className="size-5 text-white" />
              </span>

              <h2
                id="newsletter-title"
                className="mt-6 text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl"
              >
                Dapatkan <span className="text-gradient">promo</span>{' '}
                &amp; update terbaru
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Berlangganan newsletter kami untuk menerima penawaran spesial, produk
                baru, dan tips memaksimalkan layanan digital premium.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Alamat email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Masukkan email kamu"
                  className="h-12 flex-1 rounded-xl border border-white/12 bg-white/5 px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-brand/60 focus:ring-2 focus:ring-brand/25 focus:outline-none"
                />
                <button
                  type="submit"
                  className="group glow-brand inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  Berlangganan
                  <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>

              <div className="mt-4 min-h-6" aria-live="polite">
                <AnimatePresence>
                  {submitted ? (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2 text-sm text-brand-2"
                    >
                      <CheckCircle2 className="size-4" />
                      Terima kasih! Cek inbox kamu untuk konfirmasi.
                    </motion.p>
                  ) : (
                    <p className="text-xs text-muted-foreground/70">
                      Tanpa spam. Berhenti berlangganan kapan saja.
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
