'use client'

import { useState } from 'react'
import { Ticket, Plus, MessageSquare, CheckCircle2, Clock, AlertCircle, Send } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type TicketStatus = 'open' | 'pending' | 'solved' | 'closed'

const statusMeta: Record<TicketStatus, { label: string; color: string; icon: typeof Ticket }> = {
  open: { label: 'Open', color: 'text-yellow-400', icon: AlertCircle },
  pending: { label: 'Pending', color: 'text-blue-400', icon: Clock },
  solved: { label: 'Solved', color: 'text-green-400', icon: CheckCircle2 },
  closed: { label: 'Closed', color: 'text-muted-foreground', icon: Ticket },
}

const mockTickets = [
  { id: 'TKT-001', subject: 'Akun Netflix tidak bisa diakses', status: 'open' as TicketStatus, date: '27 Jul 2026', messages: 3 },
  { id: 'TKT-002', subject: 'Konfirmasi pembayaran QRIS', status: 'solved' as TicketStatus, date: '20 Jul 2026', messages: 5 },
  { id: 'TKT-003', subject: 'Request upgrade durasi langganan', status: 'closed' as TicketStatus, date: '10 Jul 2026', messages: 2 },
]

export function TicketsClient() {
  const [showNew, setShowNew] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('akun')
  const [submitted, setSubmitted] = useState(false)

  function submit() {
    if (subject && message) {
      setSubmitted(true)
      setTimeout(() => { setShowNew(false); setSubmitted(false); setSubject(''); setMessage('') }, 2000)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Reveal direction="up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tiket <span className="text-gradient">Bantuan</span></h1>
            <p className="mt-1 text-sm text-muted-foreground">Support kami merespons dalam 15 menit.</p>
          </div>
          <button onClick={() => setShowNew(true)} className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-gradient px-4 text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.02]">
            <Plus className="size-4" /> Tiket Baru
          </button>
        </div>
      </Reveal>

      {/* New ticket form */}
      {showNew && (
        <Reveal direction="up" delay={0.04}>
          <div className="gradient-border glass rounded-3xl p-5">
            <h2 className="font-semibold mb-4">Buat Tiket Baru</h2>
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto size-10 text-green-400 mb-3" />
                <p className="font-semibold">Tiket berhasil dibuat!</p>
                <p className="text-sm text-muted-foreground mt-1">Tim kami akan segera merespons.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  {['akun', 'pembayaran', 'teknis', 'lainnya'].map((c) => (
                    <button key={c} onClick={() => setCategory(c)}
                      className={cn('flex-1 rounded-xl border py-2 text-xs font-medium capitalize transition-all', category === c ? 'border-brand bg-brand/15' : 'border-white/10 bg-white/4 text-muted-foreground hover:border-white/20')}>
                      {c}
                    </button>
                  ))}
                </div>
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Judul tiket..."
                  className="glass w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-brand/40 transition-colors" />
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Deskripsikan masalahmu..." rows={4}
                  className="glass w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-brand/40 transition-colors resize-none" />
                <div className="flex gap-2">
                  <button onClick={() => setShowNew(false)} className="flex-1 h-10 rounded-2xl border border-white/12 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors">Batal</button>
                  <button onClick={submit} className="flex-1 flex h-10 items-center justify-center gap-2 rounded-2xl bg-brand-gradient text-sm font-semibold text-white">
                    <Send className="size-4" /> Kirim
                  </button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      )}

      {/* Ticket List */}
      <div className="space-y-3">
        {mockTickets.map((t, i) => {
          const s = statusMeta[t.status]
          return (
            <Reveal key={t.id} direction="up" delay={i * 0.07}>
              <div className="gradient-border glass flex items-center gap-4 rounded-3xl p-4">
                <div className={cn('grid size-10 shrink-0 place-items-center rounded-xl bg-current/10', s.color)}>
                  <s.icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold">{t.subject}</p>
                    <span className={cn('rounded-full border border-current/20 bg-current/10 px-2 py-0.5 text-[10px] font-bold', s.color)}>{s.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.id} · {t.date}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-muted-foreground">
                  <MessageSquare className="size-3.5" />
                  <span className="text-xs">{t.messages}</span>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Quick Links */}
      <Reveal direction="up" delay={0.2}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-3">Hubungi Langsung</h2>
          <div className="grid grid-cols-2 gap-2">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 px-4 py-3 text-sm font-medium text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
              <MessageSquare className="size-4 shrink-0" /> WhatsApp
            </a>
            <a href="https://t.me/hannkeydigital" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl border border-[#2AABEE]/25 bg-[#2AABEE]/10 px-4 py-3 text-sm font-medium text-[#2AABEE] hover:bg-[#2AABEE]/20 transition-colors">
              <Send className="size-4 shrink-0" /> Telegram
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
