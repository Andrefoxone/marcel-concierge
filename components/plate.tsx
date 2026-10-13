type PlateProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-14 text-2xl',
}

export function Plate({ children, size = 'md', className = '' }: PlateProps) {
  return (
    <span
      className={`inline-flex items-stretch overflow-hidden rounded-md border-2 border-foreground bg-background font-display font-bold uppercase leading-none text-foreground ${sizes[size]} ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex w-5 items-end justify-center bg-primary pb-1 text-[10px] font-semibold text-primary-foreground"
      >
        I
      </span>
      <span className="flex items-center px-3 tracking-[0.16em]">{children}</span>
      <span aria-hidden="true" className="w-5 bg-primary" />
    </span>
  )
}
