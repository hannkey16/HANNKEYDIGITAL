import { Camera, Heart, MessageCircle, Play, Send } from 'lucide-react'
import Image from 'next/image'

import { BrandLogo } from '@/components/brand-logo'
import { navLinks, paymentMethods } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const supportLinks = [
  { label: 'FAQ', href: '#faq' },
  { label: 'Kebijakan Privasi', href: '#faq' },
  { label: 'Syarat & Ketentuan', href: '#faq' },
  { label: 'Kebijakan Refund', href: '#faq' },
  { label: 'Hubungi Kami', href: '#faq' },
]

const socials = [
  { label: 'WhatsApp', icon: MessageCircle, href: '#' },
  { label: 'Telegram', icon: Send, href: '#' },
  { label: 'Instagram', icon: Camera, href: '#' },
  { label: 'YouTube', icon: Play, href: '#' },
]

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-white/8 bg-[#060a17]/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Marketplace akun &amp; layanan digital premium terpercaya di Indonesia.
              Aktivasi instan, pembayaran aman, garansi 30 hari, dan harga terbaik
              setiap hari.
            </p>
            <ul className="mt-6 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:text-brand-2"
                  >
                    <social.icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="text-sm font-semibold">
              Navigasi
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-support">
            <h2 id="footer-support" className="text-sm font-semibold">
              Bantuan
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold">Pembayaran Aman</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Semua transaksi diproses melalui payment gateway tersertifikasi.
            </p>
            <ul className="mt-5 grid grid-cols-4 gap-2">
              {paymentMethods.map((method) => (
                <li
                  key={method.label}
                  className="grid h-9 place-items-center rounded-lg border border-white/10 bg-white/6 px-1.5"
                  title={method.label}
                >
                  {method.kind === 'svg' ? (
                    <Image
                      src={method.src}
                      alt={method.label}
                      width={40}
                      height={20}
                      loading="lazy"
                      className={cn(
                        'h-4 w-auto object-contain',
                        method.white && 'logo-white',
                      )}
                    />
                  ) : (
                    <span className="text-[10px] font-bold tracking-wide text-foreground/80">
                      {method.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}{' '}
            <span className="text-gradient font-medium">HannKey Digital</span>. Seluruh
            hak cipta dilindungi.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Dibuat dengan
            <Heart className="size-3.5 fill-[#FF5470] text-[#FF5470]" />
            untuk pelanggan kami
          </p>
        </div>
      </div>
    </footer>
  )
}
