import { useState } from 'react'
import { ArrowRight, Church, KeyRound, Loader2, Mail } from 'lucide-react'
import { authService } from '../services/auth.service'
import { useAuthStore } from '@/store'

interface Props {
  onClose: () => void
  onSuccess: () => void
}

export function LoginModal({ onClose, onSuccess }: Props) {
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const user = await authService.login({ email, password })
      setUser(user)
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative z-10 flex flex-col items-center mx-auto">
      <div className="text-center mb-12 md:mb-16 space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/20">
          <Church className="w-9 h-9 text-gold" />
        </div>
        <div className="space-y-2">
          <p className="text-[11px] font-bold tracking-[0.5em] uppercase text-gold-muted">
            Iglesia Católica San Antonio Maria Claret
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight font-medium text-charcoal tracking-tight">
            Grupo Juvenil<br />
            <span className="italic font-light">Nueva Generación</span>
          </h1>
        </div>
        <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
      </div>

      <div className="w-full">
        <div className="mb-10 md:mb-12">
          <h2 className="font-serif text-2xl tracking-tight text-charcoal/90 text-center">
            Área Reservada
          </h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal/60 mt-2 text-center font-medium">
            Acceso al Sistema Sacramental
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          <div className="relative group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              className="floating-input w-full bg-transparent border-b border-charcoal/15 py-3 outline-hidden focus:border-gold transition-colors duration-500 text-[15px]"
            />
            <label
              htmlFor="email"
              className="floating-label absolute left-0 top-3 pointer-events-none text-[13px] text-charcoal/70"
            >
              Correo Institucional
            </label>
            <div className="absolute right-0 top-3 opacity-0 group-focus-within:opacity-50 transition-opacity">
              <Mail className="w-4 h-4" />
            </div>
          </div>

          <div className="relative group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              className="floating-input w-full bg-transparent border-b border-charcoal/15 py-3 outline-hidden focus:border-gold transition-colors duration-500 text-[15px]"
            />
            <label
              htmlFor="password"
              className="floating-label absolute left-0 top-3 pointer-events-none text-[13px] text-charcoal/70"
            >
              Contraseña
            </label>
            <div className="absolute right-0 top-3 opacity-0 group-focus-within:opacity-50 transition-opacity">
              <KeyRound className="w-4 h-4" />
            </div>
          </div>

          <div className="pt-4 md:pt-6 space-y-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-charcoal text-alabaster py-5 px-8 rounded-xl flex items-center justify-center gap-4 group relative overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-charcoal/20 active:scale-[0.99] transition-shadow duration-300 disabled:opacity-70"
            >
              <span className="relative z-10 text-[12px] font-bold tracking-[0.2em] uppercase">
                {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
              </span>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              ) : (
                <ArrowRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform relative z-10" />
              )}
            </button>

            <div className="flex items-center gap-3 w-full opacity-15">
              <div className="h-px grow bg-charcoal" />
              <div className="w-1 h-1 rounded-full bg-charcoal" />
              <div className="h-px grow bg-charcoal" />
            </div>
          </div>
        </form>
      </div>

      <p className="mt-12 text-[11px] text-charcoal/40 tracking-tight text-center">
        Copyright &copy; 2024 Sacramental Management.<br />
        All rights reserved.
      </p>
    </div>
  )
}
