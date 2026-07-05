export function Hero() {
  return (
    <header className="relative min-h-screen flex flex-col justify-end px-6 md:px-24 pb-16 md:pb-24 overflow-hidden">
      <div className="hero-bg-text" aria-hidden="true">NG</div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10 items-end">
        <div className="lg:col-span-9">
          <div className="pb-8 md:pb-12">
            <h1 className="text-5xl md:text-[9rem] font-serif leading-[0.8] text-charcoal">
              <span className="block overflow-hidden">
                <span className="block title-line text-lg md:text-4xl uppercase tracking-[0.6em] mb-6 md:mb-12 font-sans font-bold text-gold">
                  Grupo Juvenil
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block title-line">Nueva</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block title-line italic font-light opacity-80 pl-0 md:pl-24">
                  <span className="title-underline">Generación</span>
                </span>
              </span>
            </h1>
            <div className="overflow-hidden mt-6 md:mt-10">
              <p className="title-line text-[11px] md:text-[12px] uppercase tracking-[0.7em] font-medium text-gray-400 ml-2">
                Caminando juntos en la fe
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 pb-2 md:pb-4">
          <div className="hero-subtext space-y-6 md:space-y-8 max-w-sm">
            <div className="w-12 h-px bg-gold" />
            <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light">
              Renovando la fe a través de la comunidad, el servicio y la alegría de la juventud.
              Un espacio para crecer, compartir y transformar.
            </p>
            <div className="flex items-center gap-8 pt-2 md:pt-4">
              <a
                href="#feed"
                className="btn-sweep inline-block px-6 md:px-8 py-3 md:py-4 border border-charcoal text-[11px] uppercase tracking-[0.3em] font-bold"
              >
                Explorar Crónicas
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute right-24 top-0 w-px h-1/2 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
    </header>
  )
}
