import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-3 font-bold tracking-[0.2em] uppercase text-xs cursor-pointer transition-all duration-300',
          variant === 'default' && 'bg-[#3B3C36] text-[#FAFAF7] hover:bg-black hover:shadow-2xl',
          variant === 'outline' && 'border border-[#3B3C36] text-[#3B3C36] hover:bg-[#3B3C36] hover:text-[#FAFAF7]',
          variant === 'ghost' && 'text-[#3B3C36]/70 hover:text-[#3B3C36]',
          size === 'sm' && 'px-4 py-2 text-[9px]',
          size === 'md' && 'px-8 py-4 text-[11px]',
          size === 'lg' && 'px-12 py-6 text-[12px]',
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
