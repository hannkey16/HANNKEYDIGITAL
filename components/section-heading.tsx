import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-brand-gradient" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal direction="up" delay={0.06}>
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title} {highlight ? <span className="text-gradient">{highlight}</span> : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal direction="up" delay={0.12}>
          <p
            className={cn(
              'max-w-2xl leading-relaxed text-muted-foreground',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
