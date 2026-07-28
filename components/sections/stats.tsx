import { ShoppingCart, Star, Users } from 'lucide-react'

import { Counter } from '@/components/motion/counter'
import { Reveal, RevealChild, RevealGroup } from '@/components/motion/reveal'
import { stats } from '@/lib/site-data'

const icons = {
  users: Users,
  cart: ShoppingCart,
  star: Star,
}

export function Stats() {
  return (
    <section aria-label="Statistik HannKey Digital" className="relative py-6 lg:py-10">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal direction="scale">
          <div className="gradient-border glass rounded-3xl p-2">
            <RevealGroup
              className="grid divide-y divide-white/8 rounded-[calc(var(--radius)*1.15)] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
              stagger={0.12}
            >
              {stats.map((stat) => {
                const Icon = icons[stat.icon]
                return (
                  <RevealChild
                    key={stat.label}
                    className="group flex items-center gap-4 px-5 py-6 sm:px-7 lg:px-9 lg:py-8"
                  >
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand/14 text-brand transition-all duration-500 group-hover:scale-105 group-hover:bg-brand/22 lg:size-16">
                      <Icon className="size-6 lg:size-7" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-2xl font-bold tracking-tight text-gradient sm:text-3xl lg:text-[2rem]">
                        <Counter
                          value={stat.value}
                          decimals={stat.decimals ?? 0}
                          suffix={stat.suffix}
                        />
                      </span>
                      <span className="block text-sm font-semibold">{stat.label}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {stat.caption}
                      </span>
                    </span>
                  </RevealChild>
                )
              })}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
