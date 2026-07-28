'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Dialog({ open, onClose, children, className }: { open: boolean; onClose: () => void; children: React.ReactNode; className?: string }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('glass-strong relative w-full max-w-lg rounded-3xl border border-white/10 p-6 shadow-2xl', className)}>
        <button onClick={onClose} className="absolute right-4 top-4 grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground">
          <X className="size-4" />
        </button>
        {children}
      </div>
    </div>
  )
}
