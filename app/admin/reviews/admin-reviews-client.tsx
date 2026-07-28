'use client'

import { Star, CheckCircle2, Trash2 } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { reviews, productDetails } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function AdminReviewsClient() {
  const [items, setItems] = useState(reviews)
  const remove = (id: string) => setItems(prev => prev.filter(r => r.id !== id))

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Reveal direction="up"><h1 className="text-2xl font-bold">Kelola <span className="text-gradient">Review</span></h1></Reveal>
      <div className="space-y-3">
        {items.map((r, i) => {
          const product = productDetails.find(p => p.slug === r.productSlug)
          return (
            <Reveal key={r.id} direction="up" delay={i * 0.05}>
              <div className="gradient-border glass flex items-start gap-4 rounded-3xl p-5">
                <span className={cn('grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white', r.accent)}>{r.initial}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{r.user}</p>
                    {r.verified && <span className="rounded-full bg-green-500/12 px-2 py-0.5 text-[10px] font-medium text-green-400 flex items-center gap-1"><CheckCircle2 className="size-2.5" /> Terverifikasi</span>}
                    <span className="ml-auto text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{product?.name} {product?.tier}</p>
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[...Array(5)].map((_, j) => <Star key={j} className={cn('size-3', j < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20')} />)}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">"{r.comment}"</p>
                </div>
                <button onClick={() => remove(r.id)} className="grid size-8 shrink-0 place-items-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
