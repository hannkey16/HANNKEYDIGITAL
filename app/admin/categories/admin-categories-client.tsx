'use client'

import { Tag, Plus, Edit, Trash2 } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { categoryMeta, productDetails, type Category } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const cats = Object.entries(categoryMeta) as [Category, typeof categoryMeta[Category]][]

export function AdminCategoriesClient() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Reveal direction="up">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kelola <span className="text-gradient">Kategori</span></h1>
          <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-gradient px-4 text-sm font-semibold text-white glow-brand">
            <Plus className="size-4" /> Tambah Kategori
          </button>
        </div>
      </Reveal>
      <div className="space-y-3">
        {cats.map(([key, cat], i) => {
          const count = productDetails.filter(p => p.category === key).length
          return (
            <Reveal key={key} direction="up" delay={i * 0.07}>
              <div className="gradient-border glass flex items-center gap-4 rounded-3xl p-5">
                <div className={cn('grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br', cat.color)}>
                  <Tag className="size-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{cat.label}</p>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">{count} produk</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button className="grid size-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                    <Edit className="size-3.5" />
                  </button>
                  <button className="grid size-8 place-items-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
