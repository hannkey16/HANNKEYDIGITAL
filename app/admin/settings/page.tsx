import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Pengaturan | Admin HannKey Digital' }
export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-2">Pengaturan <span className="text-gradient">Website</span></h1>
      <p className="text-muted-foreground text-sm mb-8">Konfigurasi umum website HannKey Digital.</p>
      <div className="gradient-border glass rounded-3xl p-6 space-y-4">
        {[
          { label: 'Nama Website', value: 'HannKey Digital' },
          { label: 'Email Support', value: 'support@hannkey.digital' },
          { label: 'WhatsApp', value: '+62 812-3456-7890' },
          { label: 'Telegram', value: '@hannkeydigital' },
        ].map(f => (
          <div key={f.label}>
            <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
            <input defaultValue={f.value} className="glass w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand/40 transition-colors" />
          </div>
        ))}
        <button className="mt-2 flex h-11 w-full items-center justify-center rounded-2xl bg-brand-gradient text-sm font-semibold text-white glow-brand transition-transform hover:scale-[1.02]">
          Simpan Pengaturan
        </button>
      </div>
    </div>
  )
}
