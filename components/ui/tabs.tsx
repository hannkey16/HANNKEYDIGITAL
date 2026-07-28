'use client'

import { createContext, useContext, useState } from 'react'
import { cn } from '@/lib/utils'

const TabsCtx = createContext<{ active: string; setActive: (v: string) => void }>({ active: '', setActive: () => {} })

export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) {
  const [active, setActive] = useState(defaultValue)
  return <TabsCtx.Provider value={{ active, setActive }}><div className={className}>{children}</div></TabsCtx.Provider>
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex gap-1 rounded-2xl border border-white/8 bg-white/4 p-1', className)}>{children}</div>
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { active, setActive } = useContext(TabsCtx)
  return (
    <button
      type="button"
      onClick={() => setActive(value)}
      className={cn(
        'flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200',
        active === value ? 'bg-brand-gradient text-white shadow-sm' : 'text-muted-foreground hover:text-foreground',
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { active } = useContext(TabsCtx)
  if (active !== value) return null
  return <div className={className}>{children}</div>
}
