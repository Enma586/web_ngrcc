import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { config } from '@/lib/config'

export function Footer() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <footer className="bg-[#FAFAF7] py-20 md:py-40 px-6 md:px-24 border-t border-black/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 lg:gap-32">
            <div className="lg:col-span-7 space-y-12 md:space-y-20">
              <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                <img src="/logo.png" alt="Logo" className="h-20 md:h-32 w-auto" loading="lazy" />
                <div className="space-y-4 md:space-y-6 pt-0 md:pt-4">
                  <h4 className="text-3xl md:text-6xl font-serif italic leading-tight text-[#3B3C36]">
                    &ldquo;Donde hay amor y caridad, allí está Dios.&rdquo;
                  </h4>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[#D4AF37] font-bold">
                    Dios siempre nos espera.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end">
              <div className="space-y-8 md:space-y-12 text-left lg:text-right w-full">
                <div className="flex flex-col space-y-3 md:space-y-4">
                  <a href="#mision" className="text-left lg:text-right text-xl md:text-2xl font-serif italic hover:text-[#D4AF37] transition-colors">
                    Nuestra Misión
                  </a>
                  <a href="#eventos" className="text-left lg:text-right text-xl md:text-2xl font-serif italic hover:text-[#D4AF37] transition-colors">
                    Próximos Eventos
                  </a>
                </div>

                <a href="#contacto" className="btn-sweep inline-flex items-center gap-4 md:gap-6 px-8 md:px-12 py-5 md:py-8 border border-[#3B3C36] transition-transform hover:scale-105 active:scale-95 group">
                  <span className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-bold">Solicitar Ayuda</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>

              <div className="mt-16 md:mt-24 w-full text-left lg:text-right">
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#D4AF37] mb-2">Grupo Juvenil Nueva Generación</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">RCC SAMC &bull; Renovación Carismática Católica</p>
              </div>
            </div>
          </div>

          <div className="pt-12 md:pt-24 border-t border-black/5 w-full flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-400 uppercase tracking-[0.4em] font-bold gap-6 md:gap-0">
            <p>&copy; 2024 Grupo Juvenil Nueva Generación. Caminando en la Fe.</p>
            <div className="flex gap-8 md:gap-12">
              <button onClick={() => setShowInfo(true)} className="hover:text-[#D4AF37] transition-colors cursor-pointer">Aviso Legal</button>
              <button onClick={() => setShowInfo(true)} className="hover:text-[#D4AF37] transition-colors cursor-pointer">Privacidad</button>
              <button onClick={() => setShowInfo(true)} className="hover:text-[#D4AF37] transition-colors cursor-pointer">Comunidad</button>
            </div>
          </div>
        </div>
      </footer>

      <Modal isOpen={showInfo} onClose={() => setShowInfo(false)}>
        <div className="bg-[#FAFAF7] rounded-3xl p-10 border border-white/80 shadow-2xl text-center">
          <div className="w-16 h-px bg-[#D4AF37]/40 mx-auto mb-8" />
          <h3 className="font-serif text-3xl md:text-4xl text-[#3B3C36] mb-6">Información Legal</h3>
          <div className="text-gray-600 text-base leading-relaxed font-light space-y-4">
            <span className="block">Grupo Juvenil Nueva Generación es una comunidad eclesial perteneciente a la Iglesia Católica San Antonio Maria Claret, dentro de la Renovación Carismática Católica.</span>
            <span className="block">Todos los contenidos publicados en este sitio son de carácter informativo y formativo. Para cualquier consulta, escríbenos a <a href={`mailto:${config.contact.email}`} className="text-[#D4AF37] hover:underline">{config.contact.email}</a>.</span>
            <span className="block italic text-gray-500">Protegemos tu privacidad. No compartimos datos personales con terceros.</span>
          </div>
          <div className="w-16 h-px bg-[#D4AF37]/40 mx-auto mt-8" />
        </div>
      </Modal>
    </>
  )
}
