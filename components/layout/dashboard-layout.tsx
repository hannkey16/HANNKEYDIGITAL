'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { LayoutDashboard, ShoppingBag, Wallet, Users, Ticket, Settings, LogOut, Menu, X, Bell, Star, Heart } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { LiveChat } from '@/components/floating/live-chat'
import { mockUser } from '@/lib/mock-data'
import { useNotifications } from '@/lib/store'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/orders', label: 'Pesanan', icon: ShoppingBag },
  { href: '/dashboard/wallet', label: 'Dompet', icon: Wallet },
  { href: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/dashboard/referral', label: 'Referral', icon: Users },
  { href: '/dashboard/tickets', label: 'Bantuan', icon: Ticket },
  { href: '/dashboard/settings', label: 'Pengaturan', icon: Settings },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { items, unreadCount } = useNotifications()
  const unread = unreadCount()

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  const Sidebar = () => (
    <nav className="flex h-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" aria-label="HannKey Digital"><BrandLogo /></Link>
        <button onClick={() => setSidebarOpen(false)} className="grid size-8 place-items-center rounded-xl lg:hidden text-muted-foreground hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>

      {/* User */}
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
          {mockUser.avatar}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{mockUser.name}</p>
          <p className="truncate text-xs text-muted-foreground">{mockUser.email}</p>
        </div>
      </div>

      <ul className="flex flex-col gap-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive(item)
                  ? 'bg-brand/15 text-foreground border border-brand/25'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              )}
            >
              <item.icon className={cn('size-4', isActive(item) ? 'text-brand' : '')} />
              {item.label}
              {item.label === 'Bantuan' && <span className="ml-auto rounded-full bg-red-500/20 px-1.5 py-0.5 text-[10px] font-bold text-red-400">1</span>}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-white/8 pt-4">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="size-4" />
          Kembali ke Toko
        </Link>
      </div>
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/8 lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <button onClick={() => setSidebarOpen(true)} className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden">
            <Menu className="size-4" />
          </button>
          <p className="text-sm font-semibold lg:hidden">Dashboard</p>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/products" className="hidden h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium hover:bg-white/10 transition-colors sm:inline-flex">
              Belanja
            </Link>
            <Link href="/dashboard" className="relative grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5">
              <Bell className="size-4 text-muted-foreground" />
              {unread > 0 && <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-brand text-[9px] font-bold text-white">{unread}</span>}
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
      <LiveChat />
    </div>
  )
}
