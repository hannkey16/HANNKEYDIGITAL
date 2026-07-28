import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden rounded-[30%] bg-brand-gradient',
        'size-10 shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--brand)_80%,transparent)]',
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/35%),transparent_60%)]" />
      <svg
        viewBox="0 0 24 24"
        className="relative size-[58%] text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M6 4v16" />
        <path d="M18 4v16" />
        <path d="M6 12h12" />
      </svg>
    </span>
  )
}

export function BrandLogo({
  className,
  markClassName,
  compact = false,
}: {
  className?: string
  markClassName?: string
  compact?: boolean
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <BrandMark className={markClassName} />
      <span
        className={cn(
          'font-semibold tracking-tight',
          compact
            ? 'text-base leading-none'
            : 'flex flex-col text-[17px] leading-[1.05]',
        )}
      >
        {compact ? (
          <>
            HannKey <span className="text-gradient">Digital</span>
          </>
        ) : (
          <>
            <span className="text-foreground">HannKey</span>
            <span className="text-gradient">Digital</span>
          </>
        )}
      </span>
    </span>
  )
}
