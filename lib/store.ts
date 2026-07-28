'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Wishlist Store ──────────────────────────────────────────────────────────
type WishlistStore = {
  items: string[] // product slugs
  add: (slug: string) => void
  remove: (slug: string) => void
  toggle: (slug: string) => void
  has: (slug: string) => boolean
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (slug) => set((s) => ({ items: [...new Set([...s.items, slug])] })),
      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i !== slug) })),
      toggle: (slug) => get().has(slug) ? get().remove(slug) : get().add(slug),
      has: (slug) => get().items.includes(slug),
    }),
    { name: 'hannkey-wishlist' }
  )
)

// ─── Compare Store ───────────────────────────────────────────────────────────
type CompareStore = {
  items: string[] // max 3 slugs
  add: (slug: string) => void
  remove: (slug: string) => void
  clear: () => void
  has: (slug: string) => boolean
}

export const useCompare = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (slug) => set((s) => s.items.length < 3 ? { items: [...new Set([...s.items, slug])] } : s),
      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i !== slug) })),
      clear: () => set({ items: [] }),
      has: (slug) => get().items.includes(slug),
    }),
    { name: 'hannkey-compare' }
  )
)

// ─── Notification Store ───────────────────────────────────────────────────────
export type Notification = {
  id: string
  title: string
  message: string
  type: 'order' | 'promo' | 'system'
  read: boolean
  time: string
}

type NotificationStore = {
  items: Notification[]
  markRead: (id: string) => void
  markAllRead: () => void
  unreadCount: () => number
}

export const useNotifications = create<NotificationStore>()((set, get) => ({
  items: [
    { id: 'n1', title: 'Pesanan Selesai', message: 'Pesanan ChatGPT Plus telah berhasil diaktivasi.', type: 'order', read: false, time: '5 mnt lalu' },
    { id: 'n2', title: 'Flash Sale!', message: 'Flash Sale hingga 44% untuk ChatGPT Plus. Berakhir dalam 24 jam!', type: 'promo', read: false, time: '1 jam lalu' },
    { id: 'n3', title: 'Aktivasi Berhasil', message: 'Netflix Premium 3 Bulan telah aktif di akun Anda.', type: 'order', read: true, time: '2 hari lalu' },
  ],
  markRead: (id) => set((s) => ({ items: s.items.map(n => n.id === id ? { ...n, read: true } : n) })),
  markAllRead: () => set((s) => ({ items: s.items.map(n => ({ ...n, read: true })) })),
  unreadCount: () => get().items.filter(n => !n.read).length,
}))
