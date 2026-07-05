import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, label, icon, id, placeholder = ' ', ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          ref={ref}
          id={id}
          placeholder={placeholder}
          className={cn(
            'floating-input w-full bg-transparent border-b border-[#3B3C36]/15 py-3 outline-hidden text-[15px] transition-colors duration-500',
            'focus:border-[#D4AF37]',
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className="floating-label absolute left-0 top-3 pointer-events-none text-[13px] text-[#3B3C36]/70"
          >
            {label}
          </label>
        )}
        {icon && (
          <div className="absolute right-0 top-3 opacity-0 group-focus-within:opacity-50 transition-opacity">
            {icon}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
