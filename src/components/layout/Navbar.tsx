import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { cn } from '@/lib/utils'

interface Props {
  onLoginClick: () => void
  className?: string
}

export function Navbar({ onLoginClick, className }: Props) {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [pressProgress, setPressProgress] = useState(0)
  const pressTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const pressAnimRef = useRef<number | undefined>(undefined)

  function closeMenu() {
    setMenuOpen(false)
  }

  function startLongPress() {
    setPressProgress(0)
    let p = 0
    const step = () => {
      p += 2
      setPressProgress(Math.min(p, 100))
      if (p < 100) {
        pressAnimRef.current = requestAnimationFrame(step)
      }
    }
    pressAnimRef.current = requestAnimationFrame(step)
    pressTimer.current = setTimeout(() => {
      if (pressAnimRef.current !== undefined) cancelAnimationFrame(pressAnimRef.current)
      setPressProgress(0)
      onLoginClick()
    }, 1500)
  }

  function cancelLongPress() {
    if (pressTimer.current !== undefined) clearTimeout(pressTimer.current)
    if (pressAnimRef.current !== undefined) cancelAnimationFrame(pressAnimRef.current)
    setPressProgress(0)
  }

  function handleAdminClick() {
    closeMenu()
    navigate('/admin')
  }

  async function handleLogout() {
    closeMenu()
    await logout()
    navigate('/')
  }

  return (
    <nav
      id="navbar"
      className={cn(
        'sticky top-0 left-0 w-full z-50 px-6 md:px-12 py-6 md:py-8',
        'bg-alabaster border-b border-black/5',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative select-none">
            <svg
              className="absolute -inset-3 w-20 h-20 md:w-24 md:h-24 -rotate-90 pointer-events-none transition-opacity duration-300"
              style={{ opacity: pressProgress > 0 ? 1 : 0 }}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                strokeWidth="2"
                strokeDasharray="283"
                strokeDashoffset={283 - (pressProgress / 100 * 283)}
                className="stroke-gold transition-[stroke-dashoffset] duration-75 ease-linear"
              />
            </svg>
            <button
              onMouseDown={startLongPress}
              onMouseUp={cancelLongPress}
              onMouseLeave={cancelLongPress}
              onTouchStart={startLongPress}
              onTouchEnd={cancelLongPress}
              className="relative cursor-pointer group select-none"
              aria-label="Logo"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 md:h-16 w-auto relative z-10 transition-transform duration-300 group-active:scale-95"
              />
            </button>
          </div>
          <div className="flex flex-col border-l border-black/10 pl-4 md:pl-6">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-bold text-gold leading-tight">
              Grupo Juvenil
            </span>
            <span className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] font-bold text-charcoal leading-tight">
              Nueva Generación
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12">
          <a href="#" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal">Inicio</a>
          <a href="#mision" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal">Misión</a>
          <a href="#feed" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal">Crónicas</a>
          <a href="#eventos" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal">Eventos</a>
          <a href="#contacto" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal">Contacto</a>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <button onClick={handleAdminClick} className="hidden lg:inline-flex btn-sweep px-4 md:px-6 py-2 md:py-3 border border-charcoal text-[11px] uppercase tracking-[0.3em] font-bold cursor-pointer">
                <span className="relative z-10">+ Crear Post</span>
              </button>
              <button onClick={handleLogout} className="hidden lg:inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal/50 hover:text-charcoal transition-colors cursor-pointer">
                Salir
              </button>
            </>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl text-charcoal cursor-pointer p-1"
            aria-label="Menú"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-6 pt-6 border-t border-black/5 flex flex-col gap-4 animate-in">
          <a href="#" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal py-2">Inicio</a>
          <a href="#mision" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal py-2">Misión</a>
          <a href="#feed" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal py-2">Crónicas</a>
          <a href="#eventos" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal py-2">Eventos</a>
          <a href="#contacto" onClick={closeMenu} className="nav-link text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal py-2">Contacto</a>
          {isAuthenticated && (
            <div className="flex gap-4 pt-4 border-t border-black/5">
              <button onClick={handleAdminClick} className="btn-sweep px-6 py-3 border border-charcoal text-[11px] uppercase tracking-[0.3em] font-bold cursor-pointer flex-1 text-center">
                <span className="relative z-10">+ Crear Post</span>
              </button>
              <button onClick={handleLogout} className="text-[11px] uppercase tracking-[0.3em] font-bold text-charcoal/50 hover:text-charcoal transition-colors cursor-pointer flex-1">
                Salir
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
