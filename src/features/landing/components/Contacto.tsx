import { config } from '@/lib/config'

export function Contacto() {
  return (
    <section id="contacto" className="py-20 md:py-32 px-6 md:px-24 bg-white/30 border-t border-black/5 scroll-mt-24">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold">
          Contacto
        </span>
        <h2 className="font-serif text-4xl md:text-7xl text-[#3B3C36] mt-6 mb-8 italic leading-tight">
          Conecta con<br />
          <span className="not-italic font-bold">Nueva Generación</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-light max-w-xl mx-auto mb-12 leading-relaxed">
          Estamos aquí para acompañarte. Escríbenos o visítanos.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href={config.contact.gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-5 bg-white rounded-2xl border border-[#F0EAD6] hover:border-[#D4AF37]/30 hover:shadow-lg transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="shrink-0"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#3B3C36] transition-colors">
               Email
            </span>
          </a>

          <a
            href={config.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-5 bg-white rounded-2xl border border-[#F0EAD6] hover:border-[#D4AF37]/30 hover:shadow-lg transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#3B3C36] transition-colors">
              Cómo llegar
            </span>
          </a>

          <a
            href={config.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-5 bg-white rounded-2xl border border-[#F0EAD6] hover:border-[#D4AF37]/30 hover:shadow-lg transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#3B3C36] transition-colors">
              Instagram
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
