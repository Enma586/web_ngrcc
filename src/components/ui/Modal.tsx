import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  fullScreen?: boolean
}

export function Modal({ isOpen, onClose, children, className, fullScreen }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#FAFAF7] overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className={cn('w-full max-w-[420px]', className)}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className={cn(
          'w-full max-w-[420px] relative animate-in fade-in zoom-in-95 duration-500',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
