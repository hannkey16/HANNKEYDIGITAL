'use client'

import { useState } from 'react'
import { User, Mail, Phone, Lock, Bell, Shield, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { Separator } from '@/components/ui/separator'
import { mockUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function SettingsClient() {
  const [name, setName] = useState(mockUser.name)
  const [email] = useState(mockUser.email)
  const [phone, setPhone] = useState(mockUser.phone)
  const [saved, setSaved] = useState(false)
  const [notif, setNotif] = useState({ order: true, promo: true, system: false })

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Reveal direction="up">
        <h1 className="text-2xl font-bold">Pengaturan <span className="text-gradient">Akun</span></h1>
      </Reveal>

      {/* Profile */}
      <Reveal direction="up" delay={0.06}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-5 flex items-center gap-2"><User className="size-4 text-brand" /> Profil</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-brand-gradient text-2xl font-bold text-white">
              {mockUser.avatar}
            </div>
            <div>
              <p className="font-semibold">{mockUser.name}</p>
              <p className="text-sm text-muted-foreground">{mockUser.email}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Member sejak {mockUser.joinDate}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Nama Lengkap</label>
              <input value={name} onChange={e => setName(e.target.value)} className="glass w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input value={email} disabled className="w-full rounded-2xl border border-white/6 bg-white/3 px-4 py-3 text-sm text-muted-foreground cursor-not-allowed" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">No. Telepon</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="glass w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand/40 transition-colors" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Password */}
      <Reveal direction="up" delay={0.1}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Lock className="size-4 text-brand" /> Keamanan</h2>
          <div className="space-y-3">
            {['Password Lama', 'Password Baru', 'Konfirmasi Password'].map((l) => (
              <div key={l}>
                <label className="text-xs text-muted-foreground mb-1.5 block">{l}</label>
                <input type="password" placeholder="••••••••" className="glass w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand/40 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Notifications */}
      <Reveal direction="up" delay={0.14}>
        <div className="gradient-border glass rounded-3xl p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Bell className="size-4 text-brand" /> Notifikasi</h2>
          <div className="space-y-3">
            {[
              { key: 'order', label: 'Update Pesanan', desc: 'Status pembayaran dan aktivasi akun' },
              { key: 'promo', label: 'Promo & Flash Sale', desc: 'Diskon eksklusif dan penawaran terbatas' },
              { key: 'system', label: 'Notifikasi Sistem', desc: 'Pembaruan keamanan dan kebijakan' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{n.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotif(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                  className={cn('relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 transition-colors', notif[n.key as keyof typeof notif] ? 'border-brand bg-brand' : 'border-white/20 bg-white/10')}
                >
                  <span className={cn('inline-block size-4 rounded-full bg-white shadow transition-transform', notif[n.key as keyof typeof notif] ? 'translate-x-5' : 'translate-x-0')} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.18}>
        <button onClick={save} className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.02]">
          {saved ? <><CheckCircle2 className="size-4" /> Tersimpan!</> : 'Simpan Perubahan'}
        </button>
      </Reveal>
    </div>
  )
}
