import { Calendar, Clock } from 'lucide-react'
import type { Post } from '@/types'

interface Props {
  eventos: Post[]
  onEventoClick: (post: Post) => void
}

export function Eventos({ eventos, onEventoClick }: Props) {
  return (
    <section id="eventos" className="py-20 md:py-32 px-6 md:px-24 border-t border-black/5 bg-eggshell/20 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20 reveal-up">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
            Comunidad
          </span>
          <h2 className="font-serif text-4xl md:text-7xl text-charcoal mt-6 mb-6 italic leading-tight">
            Próximos <span className="not-italic font-bold">Eventos</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
            Momentos especiales para compartir, crecer y celebrar nuestra fe en comunidad.
          </p>
        </div>

        {eventos.length === 0 ? (
          <div className="text-center py-20 reveal-up">
            <Calendar className="w-16 h-16 text-gold/30 mx-auto mb-6" />
            <p className="font-serif text-3xl md:text-4xl italic text-gray-400">No hay eventos programados</p>
            <p className="text-gray-400 text-sm mt-4 font-light">
              Pronto estaremos anunciando nuevas actividades. ¡Mantente atento!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {eventos.map((evento) => (
              <article
                key={evento.id}
                onClick={() => onEventoClick(evento)}
                className="group bg-white rounded-3xl overflow-hidden border border-eggshell hover:border-gold/30 hover:shadow-xl transition-all duration-500 cursor-pointer reveal-up"
              >
                <div className="aspect-[16/10] overflow-hidden bg-eggshell relative">
                  <img src={evento.imageUrl} alt={evento.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  {evento.date && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(evento.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {evento.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(evento.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    )}
                    {evento.date && new Date(evento.date).getHours() + new Date(evento.date).getMinutes() > 0 && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(evento.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal leading-tight mb-3 group-hover:text-gold transition-colors duration-300">
                    {evento.title}
                  </h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed line-clamp-3">
                    {evento.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
