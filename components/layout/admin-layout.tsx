'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { LayoutDashboard, Package, ShoppingBag, Users, CreditCard, Star, Tag, Settings, LogOut, Menu, X, Shield } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Produk', icon: Package },
  { href: '/admin/orders', label: 'Pesanan', icon: ShoppingBag },
  { href: '/admin/customers', label: 'Pelanggan', icon: Users },
  { href: '/admin/payments', label: 'Pembayaran', icon: CreditCard },
  { href: '/admin/reviews', label: 'Review', icon: Star },
  { href: '/admin/categories', label: 'Kategori', icon: Tag },
  { href: '/admin/settings', label: 'Pengaturan', icon: Settings },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  const Sidebar = () => (
    <nav className="flex h-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/"><BrandLogo /></Link>
        <button onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-xl lg:hidden text-muted-foreground">
          <X className="size-4" />
        </button>
      </div>
      <div className="mb-5 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2">
        <Shield className="size-4 text-red-400 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-red-400">Admin Panel</p>
          <p className="text-[10px] text-muted-foreground">Super Admin</p>
        </div>
      </div>
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} onClick={() => setOpen(false)}
              className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive(item) ? 'bg-brand/15 text-foreground border border-brand/25' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground')}>
              <item.icon className={cn('size-4', isActive(item) ? 'text-brand' : '')} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto border-t border-white/8 pt-4">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="size-4" /> Ke Toko
        </Link>
      </div>
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 border-r border-white/8 lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto"><Sidebar /></div>
      </aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="glass-strong fixed inset-y-0 left-0 z-50 w-60 lg:hidden">
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/8 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <button onClick={() => setOpen(true)} className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden">
            <Menu className="size-4" />
          </button>
          <p className="text-sm font-semibold text-muted-foreground hidden sm:block">HannKey Digital — Admin</p>
          <div className="ml-auto">
            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">Super Admin</span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
